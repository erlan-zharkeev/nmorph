<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphIcon, NmorphIconFolderOpened } from '@/components';
import { NmorphShadowType } from '@/types';
import { createCssSizeVariables, toCssSize, useModifiers } from '@/utils';
import type { INmorphEmptyProps } from './types';

const props = withDefaults(defineProps<INmorphEmptyProps>(), {
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
const hasIcon = computed(() => !props.hideIcon || Boolean(slots.icon));
const hasDescription = computed(() => Boolean(props.description || slots.description));
const label = computed(() => props.ariaLabel || props.title);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [props.design === 'nmorph' ? NmorphShadowType[props.shadowType] : ''],
    'nmorph-empty': [props.design],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-empty-icon-size': props.iconSize,
    '--nmorph-private-empty-min-height': props.minHeight,
    '--nmorph-private-empty-padding': props.padding,
  })
);
</script>

<template>
  <div :class="modifiers" :style="styles" :role="props.role" :aria-label="label">
    <div v-if="hasIcon" class="nmorph-empty__icon" aria-hidden="true">
      <slot name="icon">
        <NmorphIcon :width="toCssSize(props.iconSize)" :height="toCssSize(props.iconSize)">
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
  min-height: var(--nmorph-private-empty-min-height);
  padding: var(--nmorph-private-empty-padding);
  color: var(--nmorph-text-color);
  text-align: center;
  border-radius: var(--default-border-radius);

  .nmorph-empty__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-private-empty-icon-size);
    height: var(--nmorph-private-empty-icon-size);
    color: var(--nmorph-semi-contrast-text-color);

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-semi-contrast-text-color);
    }
  }

  .nmorph-empty__title {
    max-width: 100%;
    font-weight: var(--nmorph-typography-title-font-weight);
    font-size: var(--nmorph-typography-title-font-size);
    line-height: var(--nmorph-typography-title-line-height);
    overflow-wrap: anywhere;
  }

  .nmorph-empty__description {
    max-width: min(420px, 100%);
    color: var(--nmorph-semi-contrast-text-color);
    font-weight: var(--nmorph-typography-body-font-weight);
    font-size: var(--nmorph-typography-body-font-size);
    line-height: var(--nmorph-typography-body-line-height);
    overflow-wrap: anywhere;
  }

  .nmorph-empty__action {
    display: flex;
    justify-content: center;
    max-width: 100%;
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

  &.nmorph-empty--plain {
    background: color-mix(in srgb, var(--nmorph-light-shade-color) 72%, transparent);
  }
}
</style>
