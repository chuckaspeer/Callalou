import { Section } from "@/components/layout/Section";

export function WhyHomeMattersFull() {
  return (
    <Section background="contrast" className="rounded-3xl shadow-lg">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          Why Home Matters
        </p>
        <h2 className="text-3xl font-semibold">
            Home is more than a roof. It&apos;s safety. It&apos;s freedom. It&apos;s possibility.
        </h2>
        <div className="max-w-3xl space-y-4 text-white/80">
          <p>
            When a person has a stable home, everything changes — their health, their work, their confidence, their future.
          </p>
          <p>
            At Callaloo Ventures, we invest in properties and communities that deserve dignity. We create homes that are clean, safe, and welcoming — for new renters, long-term tenants, and even those navigating Section 8 apartments.
          </p>
          <div className="rounded-2xl bg-white/10 p-6">
            <h3 className="mb-3 text-xl font-semibold">Inclusive Housing Approach</h3>
            <p className="text-sm">
              Our commitment to dignity extends to all tenants, including those using Section 8 housing vouchers. We believe that everyone deserves a safe, clean, and welcoming home regardless of their income source. By creating quality housing that serves Section 8 tenants with respect, we&apos;re not just providing shelter — we&apos;re providing stability, dignity, and the foundation for families to thrive.
            </p>
          </div>
            <p>
              When you invest with us, you&apos;re not just building your portfolio.
            </p>
            <p className="text-lg font-medium">
              You&apos;re helping someone else build their life because a roof over your head is more than shelter. It&apos;s a place to dream.
            </p>
            <p>
              That&apos;s the power of home.
            </p>
            <p className="text-lg font-medium">
              And that&apos;s the heart of Callaloo Ventures.
          </p>
        </div>
      </div>
    </Section>
  );
}

