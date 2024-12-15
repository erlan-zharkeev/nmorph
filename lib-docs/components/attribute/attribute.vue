<script setup lang="ts">
import {
  NmorphButton,
  NmorphCheckbox,
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphIcon,
  NmorphIconCode,
  NmorphIconCopy,
} from "@nmorph/nmorph-ui-kit";
import { ref, computed } from "vue";
import { notificationProvider } from "~/providers";
import type { DocsInfo } from "~/types";

interface IProps {
  header: string;
  infoName?: string;
  infoType?: keyof typeof DocsInfo;
  subtitle?: string;
  codeToCopy: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const codeOpen = ref(false);
const accordionOpen = ref("");

watch(codeOpen, (newValue) => {
  accordionOpen.value = newValue ? "1" : "";
});

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
    <info v-if="props.infoName" :title="$t(`${infoData}.title`)" :content="$t(`${infoData}.content`)"
      :type="props.infoType" />
    <p class="docs-attribute__subtitle nmorph-body-2" v-if="props.subtitle" v-html="highlightedSubtitle" />
    <div class="docs-components__tips"></div>
    <div class="docs-attribute__wrapper nmorph--shadow-outset">
      <div class="docs-component__overview">
        <slot name="overview" />
      </div>
      <div class="docs-component__overview-component-actions">
        <ClientOnly>
          <NmorphButton @click="copyHandler">
            <template #icon>
              <NmorphIconCopy />
            </template>
          </NmorphButton>
          <NmorphCheckbox v-model="codeOpen" design="button" class="docs-attribute__code-btn">
            <template #label>
              <NmorphIcon>
                <NmorphIconCode />
              </NmorphIcon>
            </template>
          </NmorphCheckbox>
        </ClientOnly>
      </div>
      <NmorphCollapse :model-value="accordionOpen">
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
  padding: 12px 8px;
}

.nmorph-checkbox--button.docs-attribute__code-btn {
  --size: 30px;
}
</style>
