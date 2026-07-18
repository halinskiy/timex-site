import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type SubHeadingProps = {
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  subHeadings: SubHeadingProps[];
  buttons: ButtonProps[];
  image: ImageProps;
  imageLeft?: boolean;
};

export type Layout4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout4 = (props: Layout4Props) => {
  const { tagline, heading, description, buttons, image, subHeadings, imageLeft } = {
    ...Layout4Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className={imageLeft ? "md:order-2" : ""}>
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-[0.14em] text-amber md:mb-4">
              {tagline}
            </p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
            <p className="mb-6 text-medium text-neutral-darker md:mb-8">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <h6 className="mb-2 text-h6 font-bold">{subHeading.title}</h6>
                  <p className="text-neutral-darker">{subHeading.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className={`rounded-image border border-neutral-lighter shadow-large ${imageLeft ? "md:order-1" : ""}`}>
            <img src={image.src} className="w-full rounded-image object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout4Defaults: Props = {
  tagline: "Tagline",
  heading: "",
  description: "",
  subHeadings: [],
  buttons: [],
  image: { src: "", alt: "" },
};
