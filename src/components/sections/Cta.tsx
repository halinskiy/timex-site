import { Button, type ButtonProps } from "@/components/ui/button";

type Props = {
  heading: string;
  description?: string;
  buttons: ButtonProps[];
  note?: string;
};

export type CtaProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta = (props: CtaProps) => {
  const { heading, description, buttons, note } = { ...CtaDefaults, ...props };
  return (
    <section className="bg-neutral-darkest px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto w-full max-w-lg text-center">
          <h2 className="text-h2 font-bold">{heading}</h2>
          {description && <p className="mt-5 text-medium text-neutral-lighter md:mt-6">{description}</p>}
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
          {note && <p className="mt-5 font-mono text-sm text-neutral">{note}</p>}
        </div>
      </div>
    </section>
  );
};

export const CtaDefaults: Props = { heading: "", buttons: [] };
