<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateUUID, useModifiers } from '@/utils';
import { provide } from 'vue';
import {
  INmorphTabPaneProps,
  NmorphTableModelType,
  INmorphTabsDataProvider,
  getTabLabelId,
  getTabContentId,
} from '@/components';

interface INmorphProps {
  modelValue?: NmorphTableModelType;
  stretch?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: 0,
  stretch: false,
});

interface INmorphEmit {
  (e: 'update:model-value', value: NmorphTableModelType): void;
  (e: 'tab-change', value: NmorphTableModelType): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tabs': [`${props.stretch && 'stretch'}`],
  })
);

const changeTab = (data: INmorphTabPaneProps) => {
  if (data.disabled) return;
  const { name } = data;
  emit('update:model-value', name);
  emit('tab-change', name);
};

const tabsData = ref<INmorphTabPaneProps[]>([]);
const tabsIdentifier = generateUUID();

provide<INmorphTabsDataProvider, string>('nmorph-tabs-data', {
  tabsData,
  tabsIdentifier,
});
</script>

<template>
  <div :class="modifiers">
    <slot />
    <div class="nmorph-tabs__label-list">
      <div
        v-for="tabData in tabsData"
        :id="getTabLabelId(tabsIdentifier, tabData.name)"
        :key="tabData.name"
        class="nmorph-tabs__label"
        :class="[
          { 'nmorph-tabs__label--selected': tabData.name === props.modelValue },
          { 'nmorph-tabs__label--disabled': tabData.disabled },
        ]"
        @click="changeTab(tabData)"
      >
        {{ tabData.label }}
      </div>
    </div>
    <div class="nmorph-tabs__content__wrapper">
      <div class="nmorph-tabs__content">
        <div
          v-for="tabData in tabsData"
          v-show="tabData.name === props.modelValue"
          :id="getTabContentId(tabsIdentifier, tabData.name)"
          :key="tabData.name"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tabs {
  border-radius: var(--default-border-radius);
}

.nmorph-tabs--stretch {
  .nmorph-tabs__label {
    width: 100%;
  }
}

.nmorph-tabs__label-list {
  display: flex;
  padding: var(--indentation-02);
  border-top-left-radius: var(--default-border-radius);
  border-top-right-radius: var(--default-border-radius);
  @include nmorph-outset;
}

.nmorph-tabs__label {
  padding: var(--indentation-03);
  border-radius: var(--default-border-radius);
  cursor: pointer;
  margin-right: var(--indentation-02);
  @include nmorph-outset;
}

.nmorph-tabs__label--disabled {
  @include disabled;
}

.nmorph-tabs__label--selected {
  @include nmorph-inset;
}
.nmorph-tabs__content__wrapper {
  padding: var(--indentation-02);
  border-bottom-left-radius: var(--default-border-radius);
  border-bottom-right-radius: var(--default-border-radius);
  @include nmorph-outset;
}
.nmorph-tabs__content {
  border-radius: var(--default-border-radius);
  padding: var(--indentation-03);
  @include nmorph-inset;
}
</style>
