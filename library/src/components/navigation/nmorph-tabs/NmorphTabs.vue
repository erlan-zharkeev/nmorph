<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { disabled, generateUUID, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { provide } from 'vue';
import {
  INmorphTabPaneProps,
  NmorphTableModelType,
  INmorphTabsDataProvider,
  getTabLabelId,
  getTabContentId,
} from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  modelValue?: NmorphTableModelType;
  stretch?: boolean;
  panes?: Array<INmorphTabPaneProps>;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: 0,
  stretch: false,
  panes: () => [],
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

const updatedPanes = computed(() => {
  return props.panes.length > 0 ? props.panes : tabsData.value;
});

const slots = useSlots();


const commonCSS = css`
  border-radius: var(--default-border-radius);

  .nmorph-tabs__label-list {
    display: flex;
    padding: var(--indentation-02);
    border-top-left-radius: var(--default-border-radius);
    border-top-right-radius: var(--default-border-radius);
    ${nmorphOutset()}
  }

  .nmorph-tabs__label {
    margin-right: var(--indentation-02);
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);
    cursor: pointer;
    ${nmorphOutset()}

    &.nmorph-tabs__label--disabled {
      ${disabled()}
    }

    &.nmorph-tabs__label--selected {
      ${nmorphInset()}
    }
  }

  .nmorph-tabs__content__wrapper {
    padding: var(--indentation-02);
    border-bottom-right-radius: var(--default-border-radius);
    border-bottom-left-radius: var(--default-border-radius);
    ${nmorphOutset()}
  }

  .nmorph-tabs__content {
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);
    ${nmorphInset()}
  }

  &.nmorph-tabs--stretch {
    .nmorph-tabs__label {
      width: 100%;
    }
  }

`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <slot />
    <div class="nmorph-tabs__label-list">
      <div v-for="tabData in updatedPanes" :id="getTabLabelId(tabsIdentifier, tabData.name)" :key="tabData.name"
        class="nmorph-tabs__label" :class="[
          { 'nmorph-tabs__label--selected': tabData.name === props.modelValue },
          { 'nmorph-tabs__label--disabled': tabData.disabled },
        ]" @click="changeTab(tabData)" :custom="tabData.disabled">
        <div v-if="!slots.default">{{ tabData.label }}</div>
      </div>
    </div>
    <div class="nmorph-tabs__content__wrapper">
      <div class="nmorph-tabs__content">
        <div v-for="tabData in updatedPanes" v-show="tabData.name === props.modelValue"
          :id="getTabContentId(tabsIdentifier, tabData.name)" :key="tabData.name">
          <div v-if="!slots.default">{{ tabData.content }}</div>
        </div>
      </div>
    </div>
  </StyledComponent>
</template>
