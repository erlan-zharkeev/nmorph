# Neumorphic UI Library for Vue 3 and Nuxt

## Overview

This is a UI component library for Vue 3 and Nuxt, designed using the neumorphism/skeuomorphism style. It offers a set of simple components for creating unique user interfaces with a modern, 3D-like appearance.

### What is Neumorphism/Skeuomorphism?

Neumorphism is a design trend that blends elements of flat design and skeuomorphism. It creates an illusion of soft, tactile interfaces with raised or inset effects, subtle gradients, and delicate shadows. This style aims to make UI components feel tangible and visually engaging.

## Status: Testing

The library is currently in its **testing phase**. As the sole developer behind this project, I am working on improving its stability, fixing bugs, and ensuring high-quality components.

If you encounter any issues, please don't hesitate to report them. Your feedback is highly appreciated and will help enhance the library.

**Documentation:** For detailed instructions and examples, visit the [official documentation site](https://nmorph.dev).

---

## Features

- **Neumorphic Design:** 3D-like components with soft shadows and smooth gradients.
- **Customizable Themes:** Easily modify the base color, text color, and accent color to match your application's design.
- **Vue and Nuxt Support:** Use the library in Vue 3 apps or through the Nuxt module.
- **Nuxt SSR Support:** The Nuxt module installs a universal plugin so component markup can render during SSR while browser-only theme and measurement effects run on the client.
- **Lightweight and Intuitive:** Simple integration with modern tools like Vite, Nuxt, and Composition API.

---

## Requirements

- **Node.js:** Version 18.13.0 or higher is required to use this library.
- **pnpm:** The repository uses pnpm workspaces and Turborepo for local development, checks, and builds.
- **Vue 3 or Nuxt:** Ensure your project is set up with Vue 3 or Nuxt 3 for best compatibility.

---

## Monorepo

```sh
pnpm install
pnpm dev
pnpm build
pnpm check
```

The workspace includes the published library, the Nuxt documentation app, the Vue sandbox, and the Nuxt SSR sandbox. Turborepo keeps package build order explicit and caches repeated lint, typecheck, test, and build tasks.

---

## Keywords

- Neumorphism
- Skeuomorphism
- Vue 3
- Nuxt
- Nuxt Module
- UI Components
- Neumorphic Design
- Customizable Themes
- Modern UI
- Lightweight Library
- Vite
- Composition API
