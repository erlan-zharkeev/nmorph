/// <reference types="vite/client" />

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent;
  export default component;
}

declare module "*.vue?raw" {
  const source: string;
  export default source;
}

interface ImportMeta {
  glob<T = unknown>(
    pattern: string | string[],
    options?: {
      eager?: boolean;
      import?: string;
      query?: string | Record<string, string | number | boolean>;
    }
  ): Record<string, T>;
}
