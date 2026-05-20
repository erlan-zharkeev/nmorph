<script setup lang="ts">
import {
  NmorphButton,
  NmorphCheckbox,
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphCallout,
  NmorphIcon,
  NmorphIconCode,
  NmorphIconCopy,
  type NmorphCalloutType,
} from "@nmorph/nmorph-ui-kit";
import { ref, computed } from "vue";
import { notificationProvider } from "~/providers";

interface IProps {
  header: string;
  infoName?: string;
  infoType?: NmorphCalloutType;
  subtitle?: string;
  codeToCopy: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const codeOpen = ref(false);
const accordionOpen = ref("");

watch(codeOpen, (newValue) => {
  accordionOpen.value = newValue ? "1" : "";
});

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

const copyHandler = async () => {
  const text = props.codeToCopy.filter(Boolean).join("\n\n");

  try {
    if (navigator.clipboard?.writeText)
      await navigator.clipboard.writeText(text);
    else fallbackCopy(text);
  } catch {
    fallbackCopy(text);
  }

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
    `<span class="docs-attribute__props">$1</span>`,
  );
}

const highlightedSubtitle = computed(() =>
  props.subtitle ? highlightText(props.subtitle) : "",
);

const infoData = `overview.${props.infoName}.info`;
</script>

<template>
  <div class="docs-attribute">
    <h2 class="docs-attribute__header nmorph-title-3">{{ props.header }}</h2>
    <NmorphCallout
      v-if="props.infoName"
      :title="$t(`${infoData}.title`)"
      :content="$t(`${infoData}.content`)"
      :type="props.infoType"
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
        <NmorphButton @click.stop="copyHandler">
          <template #icon-only>
            <NmorphIconCopy />
          </template>
        </NmorphButton>
        <NmorphCheckbox
          v-model="codeOpen"
          design="button"
          height="basic"
          class="docs-attribute__code-btn"
        >
          <template #label>
            <NmorphIcon>
              <NmorphIconCode />
            </NmorphIcon>
          </template>
        </NmorphCheckbox>
      </div>
      <NmorphCollapse :model-value="accordionOpen" class="docs-attribute__code-collapse">
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

:deep(.docs-attribute__code-collapse > .nmorph-collapse-item > .nmorph-collapse-item__title) {
  display: none;
}

:deep(.docs-attribute__code-collapse .nmorph-collapse-item__inner-wrapper) {
  margin-top: 0;
  padding: 16px 8px 14px;
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
  align-items: center;
  padding: 12px 8px;
}
</style>
