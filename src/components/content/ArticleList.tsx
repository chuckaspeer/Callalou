import { Section } from "@/components/layout/Section";

const defaultArticles = [
  {
    id: "article-journey",
    title: "From Antigua to Cincinnati: Building Wealth with Purpose",
    summary:
      "Emil's personal journey from a small Caribbean island to real estate investing in the Midwest, and how cultural roots shape investment philosophy.",
  },
  {
    id: "article-philosophy",
    title: "Burn the Boats: A Philosophy of Radical Commitment",
    summary:
      "Why removing the option of retreat leads to bold action, decisive leadership, and full belief in the path ahead — not reckless risk, but preparation, discipline, and purpose.",
  },
  {
    id: "article-housing",
    title: "Why Home Matters: Creating Dignity Through Housing",
    summary:
      "How stable housing transforms lives, and why Callaloo Ventures invests in properties that serve all tenants — including Section 8 — with respect and dignity.",
  },
];

interface ArticleListProps {
  items?: Array<{ id: string; title: string; summary: string }>;
}

export function ArticleList({ items }: ArticleListProps) {
  const articles = items ?? defaultArticles;

  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Articles &amp; Essays
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Articles and insights on purpose-driven real estate investing.
        </h2>
      </div>
      <div className="space-y-4 pt-6">
        {articles.map((article) => (
          <article
            key={article.id}
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

