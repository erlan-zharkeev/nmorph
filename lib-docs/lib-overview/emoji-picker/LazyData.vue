<script setup lang="ts">
const lazyLocaleScriptExample = `import { loadNmorphEmojiLocale } from "@nmorph/nmorph-ui-kit/emoji"

const locale = await loadNmorphEmojiLocale(language)`;

const lazyLocaleTemplateExample = `<NmorphEmojiPicker
  :language="language"
  :data-source="locale.data"
  :i18n="locale.i18n"
  :quick-list="locale.quickList"
/>`;
</script>

<template>
  <div id="content-lazy-locale-data" class="emoji-picker-lazy-data">
    <h2 class="nmorph-title-2">Lazy Locale Data</h2>
    <p>
      NmorphEmojiPicker stays a renderer: pass data-source, i18n, quick-list, and language from the host wrapper. The
      package also ships optional locale files for en, ru, and zh that can be loaded separately.
    </p>
    <div class="emoji-picker-lazy-data__code">
      <code-example lang="javascript">{{ lazyLocaleScriptExample }}</code-example>
      <code-example lang="html">{{ lazyLocaleTemplateExample }}</code-example>
    </div>
  </div>
</template>

<style scoped>
.emoji-picker-lazy-data {
  display: grid;
  gap: 12px;
  margin: 24px 0;
}

.emoji-picker-lazy-data p {
  margin: 0;
  color: var(--nmorph-semi-contrast-text-color);
}

.emoji-picker-lazy-data__code {
  margin: 0;
  padding: 14px;
  overflow: auto;
  border-radius: var(--default-border-radius);
  background: color-mix(in srgb, var(--nmorph-text-color) 7%, transparent);
  box-shadow: var(--nmorph-shadow-inset);
}

.emoji-picker-lazy-data__code :deep(.hljs) {
  width: max-content;
  min-width: 100%;
  overflow-x: visible;
  font-size: 13px;
  line-height: 1.5;
}

.emoji-picker-lazy-data__code :deep(.hljs + .hljs) {
  margin-top: 16px;
}
</style>
