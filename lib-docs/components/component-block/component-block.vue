<script setup lang="ts">
import {
  NmorphIcon,
  NmorphButton,
  NmorphCollapse,
  NmorphCollapseItem,
} from "@nmorph/nmorph-ui-kit";
interface IProps {
  header: string;
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
};
</script>

<template>
  <div class="docs-component-block">
    <h2 class="docs-component-block__header nmorph-title-1">
      {{ props.header }}
    </h2>
    <h3
      class="docs-component-block__subtitle nmorph-body-2"
      v-if="props.subtitle"
    >
      {{ props.subtitle }}
    </h3>
    <div class="docs-components__tips"></div>
    <div class="docs-component-block__wrapper nmorph-outset">
      <div class="docs-component__overview">
        <slot name="overview" />
      </div>
      <div class="docs-component__overview-component-actions">
        <NmorphButton style-type="transparent" @click="copyHandler">
          <NmorphIcon name="copy" />
        </NmorphButton>
        <NmorphButton style-type="transparent" @click="openHandler">
          <NmorphIcon name="code" />
        </NmorphButton>
      </div>
      <NmorphCollapse :modelValue="codeOpen">
        <NmorphCollapseItem id="1" name="1">
          <slot name="code" />
        </NmorphCollapseItem>
      </NmorphCollapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nmorph-collapse-item__inner-wrapper {
  padding-top: 0;
}
.nmorph-collapse-item .nmorph-collapse-item__title {
  display: none;
}
.nmorph-collapse-item .nmorph-collapse-item__content {
  border-radius: 0;
}
.nmorph-collapse-item__inner-wrapper {
  margin-top: -10px;
}
.docs-component-block {
  width: 100%;
}
.docs-component__overview {
  padding: 16px 8px 0px 8px;
}
.docs-component-block__header {
  margin-bottom: 4px;
}
.docs-component-block__subtitle {
  margin-bottom: 8px;
}
.docs-component-block__wrapper {
  border-radius: 8px;
}
.docs-component__overview-component-actions {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}
</style>
