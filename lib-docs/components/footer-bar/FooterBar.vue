<script lang="ts" setup>
import { NmorphCard, NmorphLink } from '@nmorph/nmorph-ui-kit';

const { t } = useI18n();
</script>
<template>
  <NmorphCard
    tag="footer"
    shadow-type="not-defined"
    :paper="3"
    :fill="false"
    padding="0"
    content-class="docs-footer-bar__content"
    class="docs-footer-bar"
  >
    <span>© {{ new Date().getFullYear() }} nmorph.</span>
    <span class="docs-footer-bar__mit">{{ t("footer-bar.license") }}
      <NmorphLink href="https://opensource.org/license/MIT" target="blank">MIT</NmorphLink>.
    </span>
  </NmorphCard>
</template>

<style lang="scss" scoped>
.docs-footer-bar {
  height: var(--footer-height);
  margin: 0 var(--docs-shell-surface-margin);
  display: flex;
  flex-shrink: 0;
  width: auto;
  border-radius: 4px;
  background: var(--nmorph-main-color);
  box-shadow:
    var(--docs-layout-shadow-width) var(--docs-layout-shadow-width) var(--docs-layout-shadow-blur)
      var(--nmorph-dark-shade-color),
    calc(-1 * var(--docs-layout-shadow-width)) calc(-1 * var(--docs-layout-shadow-width))
      var(--docs-layout-shadow-blur) var(--nmorph-light-shade-color);
  margin-bottom: var(--margin);
}

.docs-footer-bar :deep(.docs-footer-bar__content) {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.docs-footer-bar__mit {
  margin-left: 4px;
}

span {
  font-size: 14px;
}
</style>
