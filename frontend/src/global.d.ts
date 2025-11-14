// Global module declarations for CSS / SCSS modules
// Allows importing '*.module.scss' (and plain .scss) without per-file .d.ts

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
  // Support CommonJS/namespace imports
  export = classes;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
