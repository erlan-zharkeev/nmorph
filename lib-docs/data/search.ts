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

const textBySearchLocale = (
  locale: string,
  text: { en: string; ru: string; zh: string },
) => text[locale as keyof typeof text] || text.en;

const createApiItems = (locale: string) =>
  Object.entries(apiSources).flatMap(([path, source]) => {
    const slug = path.match(/lib-overview\/([^/]+)\/Api\.vue/)?.[1];
    if (!slug) return [];

    const componentTitle = `Nmorph${pascalFromSlug(slug)}`;
    const names = Array.from(
      source.matchAll(/name:\s*["'`]([^"'`]+)["'`]/g),
    ).map((match) => match[1]);

    return Array.from(new Set(names)).map((name) => ({
      group: "api",
      title: `${componentTitle}: ${name}`,
      description: textBySearchLocale(locale, {
        en: `API attribute, event, slot, expose, or variable for ${componentTitle}.`,
        ru: `API атрибут, событие, slot, expose или переменная для ${componentTitle}.`,
        zh: `${componentTitle} 的 API 属性、事件、slot、expose 或变量。`,
      }),
      path: `/elements/${slug}#content-api`,
      keywords: [
        componentTitle,
        slug,
        name,
        "api",
        "props",
        "attributes",
        "events",
        "slots",
        "variables",
        "expose",
      ],
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
      description: section.paragraphs
        .map((paragraph) => textByLocale(paragraph, locale))
        .join(" "),
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
        description: textBySearchLocale(locale, {
          en: `${componentName} component in ${group.name}.`,
          ru: `${componentName}: компонент из раздела ${group.name}.`,
          zh: `${componentName}：${group.name} 分组中的组件。`,
        }),
        path: componentPathByName(componentName),
        keywords: [
          componentName,
          componentTitle,
          group.name,
          "component",
          "example",
        ],
      };
    }),
  );

  return [
    ...guideItems,
    ...componentItems,
    ...createApiItems(locale),
    {
      group: "changelog",
      title: textBySearchLocale(locale, {
        en: "Changelog",
        ru: "Журнал изменений",
        zh: "变更日志",
      }),
      description: textBySearchLocale(locale, {
        en: "Library changes, fixed bugs, known issues, and release notes.",
        ru: "Изменения библиотеки, исправленные ошибки, известные проблемы и release notes.",
        zh: "库变更、已修复问题、已知问题和发布说明。",
      }),
      path: "/changelog",
      keywords: ["changelog", "release", "version", "migration", "bugs"],
    },
    {
      group: "project",
      title: textBySearchLocale(locale, {
        en: "About",
        ru: "О проекте",
        zh: "关于项目",
      }),
      description: textBySearchLocale(locale, {
        en: "Project overview, design approach, support status, and repository links.",
        ru: "Обзор проекта, дизайн-подход, статус поддержки и ссылки на репозиторий.",
        zh: "项目概览、设计方式、支持状态和仓库链接。",
      }),
      path: "/about",
      keywords: ["about", "project", "repository", "issues", "license"],
    },
  ];
};
