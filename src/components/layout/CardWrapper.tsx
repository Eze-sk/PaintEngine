import React from "react";

type TypeVariant = "blue" | "red" | "cream";

type AllowedTags =
  | "section"
  | "div"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "li"
  | "ul"
  | "nav";

type GradientStyle = "linear" | "circular" | "square";

type TypesProps<T extends AllowedTags> = {
  className?: string;
  gradientStyle?: GradientStyle;
  variant?: TypeVariant;
  style?: React.CSSProperties;
  tag?: T;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithRef<T>, "className" | "tag" | "children">;

const COLORS: Record<TypeVariant, Record<string, string>> = {
  blue: {
    c1: "rgba(7, 70, 178, 1)",
    c2: "rgba(1, 86, 242, 1)",
    c3: "rgba(49, 146, 255, 1)",
    c4: "rgba(10, 88, 211, 1)",
    bg: "#0D42C8",
  },
  red: {
    c1: "#e76c48",
    c2: "#b83010",
  },
  cream: {
    c1: "rgba(130, 128, 125, 1)",
    c2: "rgba(254, 254, 242, 1)",
    c3: "rgba(236, 234, 220, 1)",
    c4: "rgba(255, 253, 243, 1)",
    bg: "#82807D",
  },
};

const CardWrapperInner = <T extends AllowedTags = "div">(
  {
    className,
    gradientStyle,
    variant,
    style,
    tag,
    children,
    ...props
  }: TypesProps<T>,
  ref: React.ForwardedRef<any>,
) => {
  const Component = tag || ("div" as React.ElementType);

  const palette = COLORS[variant ?? "blue"];

  const variantStyles: Record<GradientStyle, React.CSSProperties> = {
    circular: {
      border: "1px solid white",
      background: `linear-gradient(to bottom, ${palette.c1} 0%, ${palette.c2} 100%)`,
      boxShadow: `
        inset 1px 1px 1px rgba(255, 255, 255, 0.4),
        inset -1px -1px 1px rgba(0, 0, 0, 0.2)`,
    },
    linear: {
      background: `linear-gradient(0, ${palette.c1} 0%, ${palette.c2} 8%, ${palette.c3} 90%, ${palette.c4} 100%)`,
    },
    square: {
      backgroundImage: `linear-gradient(to bottom,
        rgba(254, 254, 242, 1) 0%,
        rgba(236, 234, 220, 1) 100%
      )`,
      boxShadow: `
        inset 1px 1px 0px 0px rgba(255, 255, 255, 0.9),
        inset -1px -1px 0px 0px rgba(130, 128, 125, 0.6),
        inset -2px -2px 0px 0px rgba(100, 98, 95, 0.3)`,
      border: "1px solid #82807d",
    },
  };

  const selectedVariant = variantStyles[gradientStyle ?? "linear"];

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...selectedVariant,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardWrapper = React.forwardRef(CardWrapperInner) as <
  T extends AllowedTags = "div",
>(
  props: TypesProps<T> & { ref?: React.ForwardedRef<React.ElementRef<T>> },
) => React.ReactElement | null;
