import { Section } from "@/components/layout/Section";

const articles = [
  {
    title: "Capital as Cultural Infrastructure",
    summary:
      "How diaspora-led funds are redefining community wealth with hospitality and housing plays.",
  },
  {
    title: "The Callalou Operating System",
    summary:
      "A framework for pairing narrative strategy with early-stage investing.",
  },
  {
    title: "Investor Letter: Burn the Boats",
    summary:
      "Why conviction capital requires care, courage, and clear accountability.",
  },
];

export function ArticleList() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Articles &amp; Essays
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Read the latest thinking from the Callalou desk.
        </h2>
      </div>
      <div className="space-y-4 pt-6">
        {articles.map((article) => (
          <article
            key={article.title}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
            <button className="mt-4 text-sm font-semibold text-slate-900">
              Read summary →
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

