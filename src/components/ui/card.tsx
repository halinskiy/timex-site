import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-hidden rounded-card", {
  variants: {
    variant: {
      default: "border border-scheme-border bg-scheme-foreground text-scheme-text",
      transparent: "border border-white bg-transparent text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Card };
