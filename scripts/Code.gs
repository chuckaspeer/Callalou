/**
 * Google Apps Script Web App — Insights (Media) + Introductions (investor intake)
 *
 * Constraints:
 * - Do NOT use request headers (Origin, x-api-secret). Route ONLY via e.parameter.path.
 * - All calls are server-to-server (Next.js proxy). No CORS logic.
 * - Secret allowed via e.parameter.secret OR JSON body.secret; required only for admin and GET introductions.
 *
 * Deploy as Web App: Execute as me, Who has access: Anyone.
 * Single URL; path is query param: ?path=media | path=featured | path=introductions
 */

var SHEET_MEDIA = 'Media';
var SHEET_INTRODUCTIONS = 'Introductions';

var DEFAULT_ORDER = 9999;
var VALID_PLATFORMS = ['YouTube', 'LinkedIn', 'Instagram', 'Facebook', 'Site'];
var VALID_TYPES = ['video', 'article', 'post'];
var VALID_CATEGORIES = ['Transparency', 'Risk', 'Allocation', 'Patience', 'Platform Build'];
var VALID_READING_PATHS = ['Start Here', 'Underwriting', 'Stewardship'];
var VALID_FEATURED_SLOTS = ['start-here', 'underwriting', 'stewardship', 'wildcard'];
var VALID_STATUSES = ['draft', 'published', 'archived'];

/**
 * GET: e.parameter.path = media | featured | introductions (introductions requires secret)
 * POST: e.parameter.path = introductions | admin_media (admin_media requires secret)
 */
function doGet(e) {
  var path = (e && e.parameter && e.parameter.path) ? String(e.parameter.path).toLowerCase() : '';
  var secret = (e && e.parameter && e.parameter.secret) ? e.parameter.secret : null;

  if (path === 'media') return jsonResponse(getMedia(null));
  if (path === 'featured') return jsonResponse(getFeatured());
  if (path === 'introductions') {
    if (!secret || secret !== getSecret()) {
      return jsonResponse({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Secret required to read introductions' } });
    }
    return jsonResponse(getIntroductions());
  }

  return jsonResponse({ ok: false, error: { code: 'NOT_FOUND', message: 'Unknown path: ' + path } });
}

function doPost(e) {
  var path = (e && e.parameter && e.parameter.path) ? String(e.parameter.path).toLowerCase() : '';
  var secret = (e && e.parameter && e.parameter.secret) ? e.parameter.secret : null;
  var body = null;
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
      if (body && body.secret) secret = secret || body.secret;
    }
  } catch (err) {
    return jsonResponse({ ok: false, error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } });
  }

  if (path === 'introductions') return jsonResponse(appendIntroduction(body));
  if (path === 'admin_media') {
    if (!secret || secret !== getSecret()) {
      return jsonResponse({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or missing secret' } });
    }
    return jsonResponse(adminMediaWrite(body));
  }

  return jsonResponse({ ok: false, error: { code: 'NOT_FOUND', message: 'Unknown path: ' + path } });
}

function getSecret() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_SECRET') || '';
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// ——— Insights (Media) ——— unchanged

/**
 * Resolve url, youtubeId, thumbnailUrl per contract:
 * 1) url exists → use it; 2) else youtubeId → build url; 3) else youtube_url → use and derive id; 4) else url "".
 * Thumbnail: if missing and youtubeId → mqdefault.jpg
 */
function resolveVideoFields(row) {
  var url = row.url != null ? String(row.url).trim() : '';
  var youtubeId = row.youtubeId != null ? String(row.youtubeId).trim() : '';
  var youtubeUrl = row.youtube_url != null ? String(row.youtube_url).trim() : '';
  var thumbnailUrl = row.thumbnailUrl != null ? String(row.thumbnailUrl).trim() : '';

  if (url) {
    var id = youtubeId || (youtubeUrl ? extractYouTubeId(youtubeUrl) : '');
    var thumb = thumbnailUrl || (id ? 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg' : '');
    return { url: url, youtubeId: id || undefined, thumbnailUrl: thumb || undefined };
  }
  if (youtubeId) {
    var u = 'https://www.youtube.com/watch?v=' + youtubeId;
    var t = thumbnailUrl || 'https://img.youtube.com/vi/' + youtubeId + '/mqdefault.jpg';
    return { url: u, youtubeId: youtubeId, thumbnailUrl: t };
  }
  if (youtubeUrl) {
    var id2 = extractYouTubeId(youtubeUrl);
    var t2 = thumbnailUrl || (id2 ? 'https://img.youtube.com/vi/' + id2 + '/mqdefault.jpg' : '');
    return { url: youtubeUrl, youtubeId: id2 || undefined, thumbnailUrl: t2 || undefined };
  }
  return { url: '', youtubeId: undefined, thumbnailUrl: undefined };
}

function extractYouTubeId(url) {
  var m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
  return m ? m[1] : null;
}

/**
 * Sheet defaults: blank featured → false, order → 9999, status → draft, published_at → null.
 * Public: drop invalid categories/readingPaths; exclude status !== "published".
 * Sort: featured first, order asc (undefined 9999), published_at desc (Date compare, null oldest), then id.
 */
function getMedia(sheet) {
  sheet = sheet || getSpreadsheet().getSheetByName(SHEET_MEDIA);
  if (!sheet) return { ok: true, items: [] };

  var data = sheet.getDataRange().getValues();
  if (!data || data.length < 2) return { ok: true, items: [] };

  var headers = data[0];
  var col = function (name) {
    var i = headers.indexOf(name);
    return i >= 0 ? i : -1;
  };
  var items = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var statusRaw = (row[col('status')] || '').toString().trim().toLowerCase();
    var status = statusRaw === 'published' || statusRaw === 'archived' || statusRaw === 'draft' ? statusRaw : 'draft';
    if (status !== 'published') continue; // exclude draft and archived from public

    var categories = filterValidCategories(parseList(row[col('categories')]));
    var readingPaths = filterValidReadingPaths(parseList(row[col('reading_paths')]));
    var publishedAt = row[col('published_at')];
    if (publishedAt && publishedAt instanceof Date) publishedAt = publishedAt.toISOString();
    else if (publishedAt) {
      var paStr = String(publishedAt).trim();
      if (paStr) {
        var paDate = new Date(paStr);
        publishedAt = isNaN(paDate.getTime()) ? null : paDate.toISOString();
      } else publishedAt = null;
    } else publishedAt = null;

    var orderVal = row[col('order')];
    var order = (orderVal !== '' && orderVal !== null && orderVal !== undefined && !isNaN(Number(orderVal)))
      ? parseInt(Number(orderVal), 10) : DEFAULT_ORDER;
    var featured = row[col('featured')] === true || String(row[col('featured')]).toLowerCase() === 'true';

    var videoRow = {
      url: row[col('url')],
      youtubeId: row[col('youtube_id')],
      youtube_url: row[col('youtube_url')],
      thumbnailUrl: row[col('thumbnail_url')]
    };
    var video = resolveVideoFields(videoRow);

    items.push({
      id: String(row[col('id')] || '').trim() || 'row-' + (r + 1),
      title: String(row[col('title')] || '').trim(),
      type: normalizeType(row[col('type')]),
      url: video.url,
      platform: normalizePlatform(row[col('platform')]),
      categories: categories,
      readingPaths: readingPaths,
      featuredSlot: normalizeFeaturedSlot(row[col('featured_slot')]),
      summary: String(row[col('description')] || row[col('summary')] || '').trim() || undefined,
      length: String(row[col('length')] || '').trim() || undefined,
      featured: featured,
      order: order,
      published_at: publishedAt,
      status: 'published',
      youtubeId: video.youtubeId,
      thumbnailUrl: video.thumbnailUrl
    });
  }

  items = sortInsights(items);
  return { ok: true, items: items };
}

function parseList(val) {
  if (val == null) return [];
  var s = String(val).trim();
  if (!s) return [];
  return s.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
}

function filterValidCategories(arr) {
  return arr.map(function (c) { return String(c).trim(); }).filter(function (c) {
    return VALID_CATEGORIES.some(function (v) { return v.toLowerCase() === c.toLowerCase(); });
  }).map(function (c) {
    return VALID_CATEGORIES.find(function (v) { return v.toLowerCase() === c.toLowerCase(); });
  });
}

function filterValidReadingPaths(arr) {
  return arr.map(function (p) { return String(p).trim(); }).filter(function (p) {
    return VALID_READING_PATHS.indexOf(p) >= 0;
  });
}

/** Sort: featured first, order asc (undefined 9999), published_at desc (Date compare, null oldest), then id. */
function publishedAtTime(item) {
  var s = item.published_at;
  if (s === undefined || s === null || String(s).trim() === '') return 0;
  var t = new Date(s).getTime();
  return isNaN(t) ? 0 : t;
}
function sortInsights(list) {
  var withIndex = list.map(function (item, idx) { return { item: item, index: idx }; });
  withIndex.sort(function (a, b) {
    var ai = a.item, bi = b.item;
    var aF = ai.featured === true, bF = bi.featured === true;
    if (aF !== bF) return aF ? -1 : 1;
    var aO = ai.order != null && !isNaN(Number(ai.order)) ? Number(ai.order) : DEFAULT_ORDER;
    var bO = bi.order != null && !isNaN(Number(bi.order)) ? Number(bi.order) : DEFAULT_ORDER;
    if (aO !== bO) return aO - bO;
    var aTime = publishedAtTime(ai), bTime = publishedAtTime(bi);
    if (aTime !== bTime) return bTime - aTime;
    var idCmp = String(ai.id || '').localeCompare(String(bi.id || ''));
    if (idCmp !== 0) return idCmp;
    return a.index - b.index;
  });
  return withIndex.map(function (x) { return x.item; });
}

function normalizeType(val) {
  var t = String(val || '').trim().toLowerCase();
  if (VALID_TYPES.indexOf(t) >= 0) return t;
  return 'video';
}

function normalizePlatform(val) {
  var v = String(val || '').trim();
  for (var i = 0; i < VALID_PLATFORMS.length; i++) {
    if (VALID_PLATFORMS[i].toLowerCase() === v.toLowerCase()) return VALID_PLATFORMS[i];
  }
  return 'Site';
}

function normalizeFeaturedSlot(val) {
  var v = String(val || '').toLowerCase().replace(/\s+/g, '-');
  if (VALID_FEATURED_SLOTS.indexOf(v) >= 0) return v;
  return undefined;
}

function getFeatured() {
  var result = getMedia(null);
  if (!result.ok || !result.items) return result;
  var featured = result.items.filter(function (i) { return i.featured === true; });
  return { ok: true, items: featured.slice(0, 20) };
}

function getSpreadsheet() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

// ——— Introductions (Request Introduction / private-dialogue) ———
// Sheet columns order: id, full_name, email, investor_profile, accredited_status, experience, commitment_range, interests, referral_source, created_at, source, utm_source, utm_medium, utm_campaign

/**
 * Append one introduction (investor intake). Validation: full_name and email required; email must contain @.
 * Columns: id, full_name, email, investor_profile, accredited_status, experience, commitment_range, interests, referral_source, created_at, source, utm_source, utm_medium, utm_campaign.
 */
function appendIntroduction(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: { code: 'BAD_REQUEST', message: 'Body required' } };
  }
  var fullName = body.full_name != null ? String(body.full_name).trim() : '';
  var email = body.email != null ? String(body.email).trim() : '';
  if (!fullName || !email) {
    return { ok: false, error: { code: 'VALIDATION', message: 'full_name and email required' } };
  }
  if (email.indexOf('@') === -1) {
    return { ok: false, error: { code: 'VALIDATION', message: 'full_name and email required' } };
  }

  var sheet = getSpreadsheet().getSheetByName(SHEET_INTRODUCTIONS);
  if (!sheet) return { ok: false, error: { code: 'CONFIG', message: 'Introductions sheet not found' } };

  var id = 'I' + new Date().getTime();
  var createdAt = new Date().toISOString();
  var row = [
    id,
    fullName,
    email,
    body.investor_profile != null ? String(body.investor_profile).trim() : '',
    body.accredited_status != null ? String(body.accredited_status).trim() : '',
    body.experience != null ? String(body.experience).trim() : '',
    body.commitment_range != null ? String(body.commitment_range).trim() : '',
    body.interests != null ? String(body.interests).trim() : '',
    body.referral_source != null ? String(body.referral_source).trim() : '',
    createdAt,
    body.source != null ? String(body.source).trim() : 'private-dialogue',
    body.utm_source != null ? String(body.utm_source).trim() : '',
    body.utm_medium != null ? String(body.utm_medium).trim() : '',
    body.utm_campaign != null ? String(body.utm_campaign).trim() : ''
  ];
  sheet.appendRow(row);
  return { ok: true, items: [{ id: id }] };
}

/**
 * GET introductions: requires secret. Returns rows from Introductions sheet with header mapping.
 */
function getIntroductions() {
  var sheet = getSpreadsheet().getSheetByName(SHEET_INTRODUCTIONS);
  if (!sheet) return { ok: false, error: { code: 'CONFIG', message: 'Introductions sheet not found' } };
  var data = sheet.getDataRange().getValues();
  if (!data || data.length < 2) return { ok: true, items: [] };
  var headers = data[0];
  var items = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var key = String(headers[c] || '').trim();
      if (key) obj[key] = row[c] != null ? String(row[c]).trim() : '';
    }
    items.push(obj);
  }
  return { ok: true, items: items };
}

/**
 * Admin write: reject invalid platform, type, featuredSlot, status; filter invalid categories/reading_paths; trim strings.
 */
function adminMediaWrite(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: { code: 'BAD_REQUEST', message: 'Body required' } };
  }
  var platform = body.platform != null ? String(body.platform).trim() : '';
  if (platform && !VALID_PLATFORMS.some(function (p) { return p.toLowerCase() === platform.toLowerCase(); })) {
    return { ok: false, error: { code: 'VALIDATION', message: 'Invalid platform' } };
  }
  var typeVal = body.type != null ? String(body.type).trim().toLowerCase() : '';
  if (typeVal && VALID_TYPES.indexOf(typeVal) < 0) {
    return { ok: false, error: { code: 'VALIDATION', message: 'Invalid type' } };
  }
  var slot = body.featured_slot != null ? String(body.featured_slot).trim().toLowerCase().replace(/\s+/g, '-') : '';
  if (slot && VALID_FEATURED_SLOTS.indexOf(slot) < 0) {
    return { ok: false, error: { code: 'VALIDATION', message: 'Invalid featured_slot' } };
  }
  var st = body.status != null ? String(body.status).trim().toLowerCase() : '';
  if (st && VALID_STATUSES.indexOf(st) < 0) {
    return { ok: false, error: { code: 'VALIDATION', message: 'Invalid status' } };
  }
  var categories = Array.isArray(body.categories) ? filterValidCategories(body.categories) : [];
  var readingPaths = Array.isArray(body.reading_paths) ? filterValidReadingPaths(body.reading_paths) : [];
  // Placeholder: append or update row with validated body; trim all string inputs when writing
  return { ok: true, items: [] };
}
