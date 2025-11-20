type SectionProps = {
  id?: string;
  background?: "default" | "muted" | "contrast";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const backgroundClassMap: Record<
  NonNullable<SectionProps["background"]>,
  string
> = {
  default: "bg-transparent",
  muted: "bg-white/70 backdrop-blur",
  contrast: "bg-slate-900 text-white",
};

const paddingClassMap: Record<NonNullable<SectionProps["padding"]>, string> = {
  none: "",
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
};

export function Section({
  id,
  background = "default",
  padding = "md",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate w-full ${backgroundClassMap[background]} ${paddingClassMap[padding]} ${className}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:px-8">
        {children}
      </div>
    </section>
  );
}

