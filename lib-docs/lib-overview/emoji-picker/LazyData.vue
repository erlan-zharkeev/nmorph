<template>
  <div id="content-lazy-locale-data" class="emoji-picker-lazy-data">
    <h2 class="nmorph-title-2">Lazy Locale Data</h2>
    <p>
      NmorphEmojiPicker stays a renderer: pass data-source, i18n, quick-list, and language from the host wrapper. The
      package also ships optional locale files for en, ru, and zh that can be loaded separately.
    </p>
    <pre><code>import { loadNmorphEmojiLocale } from "@nmorph/nmorph-ui-kit/emoji"

const locale = await loadNmorphEmojiLocale(language)

&lt;NmorphEmojiPicker
  :language="language"
  :data-source="locale.data"
  :i18n="locale.i18n"
  :quick-list="locale.quickList"
/&gt;</code></pre>
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

.emoji-picker-lazy-data pre {
  margin: 0;
  padding: 14px;
  overflow: auto;
  border-radius: var(--default-border-radius);
  background: color-mix(in srgb, var(--nmorph-text-color) 7%, transparent);
  box-shadow: var(--nmorph-shadow-inset);
}

.emoji-picker-lazy-data code {
  font-size: 13px;
  line-height: 1.5;
}
</style>
