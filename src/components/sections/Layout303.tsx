import type { ReactNode } from "react";

type SectionProps = {
  icon: ReactNode;
  heading: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  heading: string;
  sections: SectionProps[];
};

export type Layout303Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout303 = (props: Layout303Props) => {
  const { eyebrow, heading, sections } = {
    ...Layout303Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          {eyebrow && (
            <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.14em] text-amber">
              {eyebrow}
            </p>
          )}
          <h2 className="text-h3 font-bold">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {sections.map((section, index) => (
            <div key={index}>
              <div className="mb-5 flex size-12 items-center justify-center rounded-card bg-amber/10 text-amber md:mb-6">
                {section.icon}
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">{section.heading}</h3>
              <p className="text-neutral-darker">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout303Defaults: Props = {
  heading: "",
  sections: [],
};
