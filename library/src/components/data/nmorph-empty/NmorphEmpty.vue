<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphIcon, NmorphIconFolderOpened } from '@/components';
import { NmorphShadowType, type INmorphA11yProps, type NmorphElementDesignType } from '@/types';
import { useModifiers } from '@/utils';

interface INmorphProps extends INmorphA11yProps {
  title?: string;
  description?: string;
  iconSize?: number | string;
  minHeight?: number | string;
  padding?: number | string;
  design?: NmorphElementDesignType;
  shadowType?: keyof typeof NmorphShadowType;
  hideIcon?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  title: 'No data',
  description: '',
  iconSize: 56,
  minHeight: 160,
  padding: 'var(--indentation-05)',
  design: 'nmorph',
  shadowType: 'inset',
  hideIcon: false,
  role: 'status',
  ariaLabel: undefined,
  ariaOrientation: undefined,
});

const slots = useSlots();
const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);
const hasIcon = computed(() => !props.hideIcon || Boolean(slots.icon));
const hasDescription = computed(() => Boolean(props.description || slots.description));
const label = computed(() => props.ariaLabel || props.title);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [props.design === 'nmorph' ? NmorphShadowType[props.shadowType] : ''],
    'nmorph-empty': [props.design],
  })
);

const styles = computed<CSSProperties>(() => ({
  '--nmorph-empty-icon-size': getCssSize(props.iconSize),
  '--nmorph-empty-min-height': getCssSize(props.minHeight),
  '--nmorph-empty-padding': getCssSize(props.padding),
}));
</script>

<template>
  <div :class="modifiers" :style="styles" :role="props.role" :aria-label="label">
    <div v-if="hasIcon" class="nmorph-empty__icon" aria-hidden="true">
      <slot name="icon">
        <NmorphIcon :width="getCssSize(props.iconSize)" :height="getCssSize(props.iconSize)">
          <NmorphIconFolderOpened />
        </NmorphIcon>
      </slot>
    </div>
    <div class="nmorph-empty__title">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div v-if="hasDescription" class="nmorph-empty__description">
      <slot name="description">{{ props.description }}</slot>
    </div>
    <div v-if="slots.action" class="nmorph-empty__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-empty {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--nmorph-empty-min-height);
  padding: var(--nmorph-empty-padding);
  color: var(--nmorph-text-color);
  text-align: center;
  border-radius: var(--default-border-radius);

  .nmorph-empty__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-empty-icon-size);
    height: var(--nmorph-empty-icon-size);
    color: var(--nmorph-semi-contrast-text-color);

    .nmorph-icon {
      --color: var(--nmorph-semi-contrast-text-color);
    }
  }

  .nmorph-empty__title {
    font-weight: 600;
    font-size: var(--font-size-large);
    line-height: var(--line-height-regular);
  }

  .nmorph-empty__description {
    max-width: 420px;
    color: var(--nmorph-semi-contrast-text-color);
    font-weight: 400;
    font-size: var(--font-size-small);
    line-height: var(--line-height-loose);
  }

  .nmorph-empty__action {
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }

  &.nmorph-empty--nmorph {
    background: var(--nmorph-main-color);

    &.nmorph--shadow-inset {
      box-shadow: var(--nmorph-shadow-inset);
    }

    &.nmorph--shadow-outset {
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  &.nmorph-empty--common {
    border: 1px solid var(--nmorph-gray-color);
  }
}
</style>
