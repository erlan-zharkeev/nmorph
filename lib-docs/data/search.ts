import { componentGroups } from "~/data/components";
import { guidePages, textByLocale } from "~/data/guide";
import { componentPathByName, pascalToSpace } from "~/utils";

const apiSources = import.meta.glob<string>("../lib-overview/**/Api.vue", {
  eager: true,
  import: "default",
  query: "?raw",
});

const pascalFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const apiItems = Object.entries(apiSources).flatMap(([path, source]) => {
  const slug = path.match(/lib-overview\/([^/]+)\/Api\.vue/)?.[1];
  if (!slug) return [];

  const componentTitle = `Nmorph${pascalFromSlug(slug)}`;
  const names = Array.from(source.matchAll(/name:\s*["'`]([^"'`]+)["'`]/g)).map((match) => match[1]);

  return Array.from(new Set(names)).map((name) => ({
    group: "api",
    title: `${componentTitle}: ${name}`,
    description: `API attribute, event, slot, expose, or variable for ${componentTitle}.`,
    path: `/elements/${slug}#content-api`,
    keywords: [componentTitle, slug, name, "api", "props", "attributes", "events", "slots", "variables", "expose"],
  }));
});

export const createSearchItems = (locale: string) => {
  const guideItems = guidePages.flatMap((page) => [
    {
      group: "guide",
      title: textByLocale(page.title, locale),
      description: textByLocale(page.description, locale),
      path: `/guide/${page.slug}`,
      keywords: [page.slug, "guide", "documentation"],
    },
    ...page.sections.map((section) => ({
      group: "guide",
      title: `${textByLocale(page.title, locale)}: ${textByLocale(section.title, locale)}`,
      description: section.paragraphs.map((paragraph) => textByLocale(paragraph, locale)).join(" "),
      path: `/guide/${page.slug}#${section.title.en.toLowerCase().replaceAll(" ", "-")}`,
      keywords: [page.slug, section.title.en, "guide", "documentation"],
    })),
  ]);

  const componentItems = componentGroups.flatMap((group) =>
    group.components.map((componentName) => {
      const componentTitle = pascalToSpace(componentName.substring(6));
      return {
        group: "component",
        title: componentTitle,
        description: `${componentName} component in ${group.name}.`,
        path: componentPathByName(componentName),
        keywords: [componentName, componentTitle, group.name, "component", "example"],
      };
    })
  );

  return [
    ...guideItems,
    ...componentItems,
    ...apiItems,
    {
      group: "changelog",
      title: "Changelog",
      description: "Library changes, fixed bugs, known issues, and release notes.",
      path: "/changelog",
      keywords: ["changelog", "release", "version", "migration", "bugs"],
    },
    {
      group: "project",
      title: "About",
      description: "Project overview, design approach, support status, and repository links.",
      path: "/about",
      keywords: ["about", "project", "repository", "issues", "license"],
    },
  ];
};
