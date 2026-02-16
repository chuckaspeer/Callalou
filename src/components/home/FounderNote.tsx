import { Section } from "@/components/layout/Section";

export function FounderNote() {
  return (
    <Section>
      <div className="max-w-2xl space-y-6 text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-900">
          A Letter from the Founder
        </h2>
        <div className="space-y-4">
          <p>
            I founded Callaloo Ventures with a simple belief: capital should be
            treated with care, not urgency.
          </p>
          <p>
            My early exposure to real estate investing came not from operating
            assets, but from observing how capital decisions compound over time
            — both when they are made thoughtfully, and when they are rushed.
            That experience shaped how I approach opportunities today.
          </p>
          <p>
            As a limited partner, I have invested alongside experienced
            operating sponsors across U.S. multifamily transactions, gaining
            firsthand exposure to how assets perform beyond underwriting models
            and how partnerships function across market cycles. That experience
            reinforced an important lesson: the quality of decisions matters
            more than the quantity of deals.
          </p>
          <p>
            At Callaloo Ventures, our focus is not transaction volume or public
            visibility. It is on building aligned relationships, understanding
            risk clearly, and participating in opportunities where long-term
            fundamentals support patient capital.
          </p>
          <p>
            As the platform evolves, so too will our role — but the underlying
            philosophy remains constant: capital preservation first, discipline
            always, and alignment above all else.
          </p>
          <p>
            If this approach aligns with how you think about long-term real asset
            investing, I welcome a conversation.
          </p>
        </div>
        <p className="pt-2 text-slate-700">
          — Emil Brown, Founder, Callaloo Ventures
        </p>
      </div>
    </Section>
  );
}
