import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  eyebrow?: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  note?: string;
  image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header1 = (props: Header1Props) => {
  const { eyebrow, heading, description, buttons, note, image } = {
    ...Header1Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            {eyebrow && (
              <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.14em] text-amber">
                {eyebrow}
              </p>
            )}
            <h1 className="mb-5 text-h1 font-bold md:mb-6">{heading}</h1>
            <p className="text-medium text-neutral-darker">{description}</p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
            {note && <p className="mt-5 font-mono text-sm text-neutral">{note}</p>}
          </div>
          <div className="rounded-image border border-neutral-lighter shadow-xxlarge">
            <img
              src={image.src}
              className="w-full rounded-image object-cover"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header1Defaults: Props = {
  heading: "Medium length hero heading goes here",
  description: "",
  buttons: [{ title: "Button" }],
  image: { src: "", alt: "" },
};
