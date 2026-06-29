import React from "react";

type AllowedTags =
  | "section"
  | "div"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "li"
  | "ul"
  | "nav"
  | "button";

type TypeVariant = "blue" | "cream" | "green" | "glass";
type ShadingStyle = "linear" | "square" | "active";

type TypesProps<T extends AllowedTags> = {
  className?: string;
  shadingStyle?: ShadingStyle;
  shadingSize?: "small" | "normal";
  variant?: TypeVariant;
  style?: React.CSSProperties;
  tag?: T;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithRef<T>, "className" | "tag" | "children">;

const COLORS: Record<TypeVariant, Record<string, string>> = {
  blue: {
    upperShading: "#4792e6",
    bg: "#015DEB",
  },
  cream: {
    upperShading: "#ffffff",
    bg: "#F0F0F0",
  },
  green: {
    upperShading: "#8ec985",
    bg: "#54b851",
  },
  glass: {
    upperShading: "#6ba7f8FF",
    bg: "#3980f4FF",
  },
};

const CardWrapperInner = <T extends AllowedTags = "div">(
  {
    className,
    shadingStyle,
    shadingSize,
    variant,
    style,
    tag,
    children,
    ...props
  }: TypesProps<T>,
  ref: React.ForwardedRef<unknown>,
) => {
  const Component = tag || ("div" as React.ElementType);

  const palette = COLORS[variant ?? "blue"];

  const SHDSize = shadingSize === "small" ? 1 : 4;

  const variantStyles: Record<ShadingStyle, React.CSSProperties> = {
    linear: {
      boxShadow: `
        inset 0px -${SHDSize}px ${SHDSize}px 0px #00000045,
        inset 0px ${SHDSize}px ${SHDSize}px 0px ${palette.upperShading}
      `,
      backgroundColor: palette.bg,
    },
    square: {
      boxShadow: `
        inset -${SHDSize}px -${SHDSize}px ${SHDSize}px 0px #00000045,
        inset ${SHDSize}px ${SHDSize}px ${SHDSize}px 0px ${palette.upperShading}
      `,
      backgroundColor: palette.bg,
    },
    active: {
      boxShadow: `inset -2px -2px 5px 0px #00000066, inset 1px 1px 5px 0px #00000066`,
      backgroundColor: palette.bg,
    },
  };

  const selectedVariant = variantStyles[shadingStyle ?? "linear"];

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
  props: TypesProps<T> & { ref?: React.Ref<React.ComponentRef<T>> },
) => React.ReactElement | null;
