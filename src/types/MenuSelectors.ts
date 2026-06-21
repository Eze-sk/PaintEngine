import type { JSX } from "react/jsx-dev-runtime";

export type TypesOfMenus = "hierarchy" | "assetsBrowser";

export type TypeComponentRegistry = Record<
  TypesOfMenus,
  {
    Header?: React.LazyExoticComponent<() => JSX.Element>;
    Body: React.LazyExoticComponent<() => JSX.Element>;
  }
>;
