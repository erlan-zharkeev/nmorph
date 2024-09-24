<script setup lang="ts">
import {
  NmorphButton,
  NmorphCollapse,
  NmorphCollapseItem,
} from "@nmorph/nmorph-ui-kit";
import { ref, computed } from "vue";
import { notificationProvider } from "~/providers";

interface IProps {
  header: string;
  infoName?: string;
  subtitle?: string;
  codeToCopy: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const codeOpen = ref("");

const openHandler = () => {
  const value = codeOpen.value === "1" ? "" : "1";
  codeOpen.value = value;
};

const copyHandler = () => {
  navigator.clipboard.writeText(props.codeToCopy.join(" "));
  notificationProvider.notify({
    content: `Copied`,
    duration: 2000,
    type: "success",
    width: "fit-content",
    closable: false,
    bordered: false,
  });
};

function highlightText(str: string) {
  return str.replace(
    /\*([a-zA-Z0-9\s]+)\*/g,
    `<span class="docs-attribute__props">$1</span>`
  );
}

const highlightedSubtitle = computed(() =>
  props.subtitle ? highlightText(props.subtitle) : ""
);

const infoData = `overview.${props.infoName}.info`;
</script>

<template>
  <div class="docs-attribute">
    <h2 class="docs-attribute__header nmorph-title-3">{{ props.header }}</h2>
    <info
      v-if="props.infoName"
      :title="$t(`${infoData}.title`)"
      :content="$t(`${infoData}.content`)"
    />
    <p
      class="docs-attribute__subtitle nmorph-body-2"
      v-if="props.subtitle"
      v-html="highlightedSubtitle"
    />
    <div class="docs-components__tips"></div>
    <div class="docs-attribute__wrapper nmorph--shadow-outset">
      <div class="docs-component__overview">
        <slot name="overview" />
      </div>
      <div class="docs-component__overview-component-actions">
        <ClientOnly>
          <NmorphButton @click="copyHandler" icon="copy-document" />
          <NmorphButton @click="openHandler" icon="code" />
        </ClientOnly>
      </div>
      <NmorphCollapse :modelValue="codeOpen">
        <NmorphCollapseItem id="1" name="1">
          <slot name="code" />
        </NmorphCollapseItem>
      </NmorphCollapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docs-component__overview-component-actions {
  .nmorph-button {
    margin: 0 8px;
  }
}

:deep(.nmorph-collapse-item__inner-wrapper) {
  padding-top: 0;
}

:deep(.nmorph-collapse-item .nmorph-collapse-item__title) {
  display: none;
}

:deep(.nmorph-collapse-item__inner-wrapper) {
  margin-top: -10px;
}

.docs-attribute {
  width: 100%;
  margin-bottom: 24px;
}
.docs-component__overview {
  padding: 16px 8px 0px 8px;
  display: flex;
  align-items: baseline;
}
.docs-attribute__header {
  margin-bottom: 4px;
}
.docs-attribute__subtitle {
  margin-bottom: 8px;
}
.docs-attribute__wrapper {
  border-radius: 8px;
}
.docs-component__overview-component-actions {
  display: flex;
  justify-content: flex-end;
  padding: 12px 4px;
}
</style>
