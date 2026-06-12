<script setup lang="ts">
import {
  NmorphButton,
  NmorphCard,
  NmorphDivider,
  NmorphIconCopyDocument,
} from "@nmorph/nmorph-ui-kit";
import { notificationProvider } from "~/providers";
import {
  guidePageMap,
  guidePages,
  textByLocale,
  type GuideCodeBlock,
  type GuidePageSlug,
  type GuideSection,
} from "~/data/guide";

const props = defineProps<{
  slug: GuidePageSlug;
}>();

const { locale } = useI18n();
const localePath = useLocalePath();
const page = computed(() => guidePageMap[props.slug]);
const currentIndex = computed(() => guidePages.findIndex((guidePage) => guidePage.slug === props.slug));
const previousPage = computed(() => guidePages[currentIndex.value - 1]);
const nextPage = computed(() => guidePages[currentIndex.value + 1]);

const getSectionCodes = (section: GuideSection): GuideCodeBlock[] => {
  if (section.codes?.length) return section.codes;
  if (section.code) return [section.code];
  return [];
};

const getCodeLineLength = (code: GuideCodeBlock) =>
  code.content.split("\n").reduce((maxLength, line) => Math.max(maxLength, line.length), 0);

const getCodeListStyle = (section: GuideSection) => {
  const maxLineLength = getSectionCodes(section).reduce(
    (maxLength, code) => Math.max(maxLength, getCodeLineLength(code)),
    0,
  );

  return {
    "--docs-guide-code-width": `${Math.min(Math.max(maxLineLength + 4, 24), 84)}ch`,
  };
};

const fallbackCopy = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const copyCode = async (text: string) => {
  try {
    if (navigator.clipboard?.writeText)
      await navigator.clipboard.writeText(text);
    else fallbackCopy(text);
  } catch {
    fallbackCopy(text);
  }

  notificationProvider.notify({
    content: "Copied",
    duration: 2000,
    type: "success",
    width: "fit-content",
    closable: false,
    bordered: false,
  });
};
</script>

<template>
  <article v-if="page" class="docs-guide-article">
    <NmorphCard tag="header" class="docs-guide-article__header" :paper="3">
      <p class="docs-guide-article__eyebrow">{{ $t("guide") }}</p>
      <h1>{{ textByLocale(page.title, locale) }}</h1>
      <p>{{ textByLocale(page.description, locale) }}</p>
    </NmorphCard>

    <section
      v-for="section in page.sections"
      :id="section.title.en.toLowerCase().replaceAll(' ', '-')"
      :key="section.title.en"
      class="docs-guide-article__section"
    >
      <h2>{{ textByLocale(section.title, locale) }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph.en">
        {{ textByLocale(paragraph, locale) }}
      </p>
      <ul v-if="section.points?.length" class="docs-guide-article__points">
        <li v-for="point in section.points" :key="point.en">{{ textByLocale(point, locale) }}</li>
      </ul>
      <div
        v-if="getSectionCodes(section).length"
        class="docs-guide-article__code-list"
        :style="getCodeListStyle(section)"
      >
        <div
          v-for="codeBlock in getSectionCodes(section)"
          :key="codeBlock.content"
          class="docs-guide-article__code-row"
        >
          <NmorphButton
            class="docs-guide-article__code-copy"
            aria-label="Copy code"
            title="Copy code"
            @click="copyCode(codeBlock.content)"
          >
            <template #icon-only>
              <NmorphIconCopyDocument />
            </template>
          </NmorphButton>
          <div class="docs-guide-article__code">
            <code-example :lang="codeBlock.language">{{ codeBlock.content }}</code-example>
          </div>
        </div>
      </div>
    </section>

    <NmorphDivider />

    <nav class="docs-guide-article__pager">
      <NuxtLink v-if="previousPage" :to="localePath(`/guide/${previousPage.slug}`)">
        {{ textByLocale(previousPage.title, locale) }}
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="nextPage" :to="localePath(`/guide/${nextPage.slug}`)">
        {{ textByLocale(nextPage.title, locale) }}
      </NuxtLink>
    </nav>
  </article>
</template>

<style scoped lang="scss">
.docs-guide-article {
  width: 100%;
}

.docs-guide-article__header {
  padding: 32px;
  margin-bottom: 24px;
  border-radius: 4px;

  h1 {
    margin: 0;
    font-size: 42px;
    line-height: 1.1;
  }

  p:last-child {
    max-width: 860px;
    margin: 16px 0 0;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }
}

.docs-guide-article__eyebrow {
  margin: 0 0 8px;
  color: var(--nmorph-accent-color);
  font-weight: 700;
}

.docs-guide-article__section {
  max-width: 940px;
  margin: 32px 0;

  h2 {
    margin: 0 0 12px;
    font-size: var(--font-size-extra-large);
  }

  p,
  li {
    font-size: var(--font-size-base);
    line-height: var(--line-height-loose);
  }

  p {
    margin: 0 0 12px;
  }
}

.docs-guide-article__points {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  padding-left: 20px;
}

.docs-guide-article__code-list {
  max-width: 100%;
  display: grid;
  gap: 10px;
  justify-items: start;
  margin-top: 16px;
}

.docs-guide-article__code-row {
  max-width: 100%;
  display: inline-grid;
  width: min(100%, calc(var(--docs-guide-code-width, 64ch) + var(--basic-component) + 10px));
  grid-template-columns: var(--basic-component) minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.docs-guide-article__code {
  min-width: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-height: var(--basic-component);
  padding: 6px 12px;
  overflow: auto;
  border-radius: 4px;
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.docs-guide-article__code :deep(.hljs) {
  width: max-content;
  min-width: 100%;
  overflow-x: visible;
}

.docs-guide-article__pager {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;

  a {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    color: var(--nmorph-accent-color);
    font-weight: 700;
    text-decoration: none;
  }
}

@media (max-width: 720px) {
  .docs-guide-article__header {
    padding: 24px;

    h1 {
      font-size: 32px;
    }
  }
}
</style>
