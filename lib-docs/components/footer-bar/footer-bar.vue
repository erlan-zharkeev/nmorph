<script lang="ts" setup>
import { NmorphLink } from '@nmorph/nmorph-ui-kit';

const { t } = useI18n();
</script>
<template>
  <footer class="docs-footer-bar nmorph--shadow-outset">
    <div class="docs-footer-bar__content">
      <span>© {{ new Date().getFullYear() }} nmorph.</span>
      <span class="docs-footer-bar__mit">{{ t("footer-bar.license") }}
        <NmorphLink href="https://opensource.org/license/MIT" target="blank">MIT</NmorphLink>.
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.docs-footer-bar {
  height: var(--footer-height);
  margin: 0 var(--margin);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: var(--margin);
  z-index: 1;
}

.docs-footer-bar__content {
  width: 100%;
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
