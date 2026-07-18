type FooterLink = { title: string; url: string };

type Props = {
  logo: React.ReactNode;
  tagline: string;
  links: FooterLink[];
  legal: string;
};

export type FooterProps = React.ComponentPropsWithoutRef<"footer"> & Partial<Props>;

export const Footer = (props: FooterProps) => {
  const { logo, tagline, links, legal } = { ...FooterDefaults, ...props };
  return (
    <footer className="border-t border-neutral-lighter px-[5%] py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 pb-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            {logo}
            <p className="max-w-sm text-small text-neutral-darker">{tagline}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-small">
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.url} className="text-neutral-darker transition-colors hover:text-neutral-darkest">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-px w-full bg-neutral-lighter" />
        <p className="pt-6 font-mono text-tiny text-neutral">{legal}</p>
      </div>
    </footer>
  );
};

export const FooterDefaults: Props = { logo: null, tagline: "", links: [], legal: "" };
