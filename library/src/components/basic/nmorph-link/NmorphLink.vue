<script setup lang="ts">
import { createCssVariables, useModifiers } from '@/utils';
import { computed, useSlots } from 'vue';
import type { Component, CSSProperties } from 'vue';
import { NmorphIcon } from '@/components';
import * as NmorphIcons from '@/components/basic/nmorph-icon/NmorphIcons';

import { NmorphColor } from '@/types';
import { NmorphLinkTarget, type INmorphLinkProps } from './types';

const props = withDefaults(defineProps<INmorphLinkProps>(), {
  type: NmorphColor.accent,
  href: '',
  underline: false,
  text: '',
  target: 'self',
  rel: undefined,
  referrerpolicy: undefined,
  referrerPolicy: undefined,
  download: undefined,
  ariaLabel: undefined,
  title: undefined,
  disabled: false,
  color: undefined,
  iconName: undefined,
});

const slots = useSlots();
const iconMap = NmorphIcons as Record<string, Component>;

const toPascalCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');

const resolvedIcon = computed(() => {
  if (!props.iconName) return undefined;
  if (props.iconName in iconMap) return iconMap[props.iconName];
  return iconMap[`NmorphIcon${toPascalCase(props.iconName)}`];
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-link': [props.type, props.underline && 'underline', props.disabled && 'disabled'],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssVariables({
    '--nmorph-private-link-color': props.color,
  })
);

const resolvedTarget = computed(() => NmorphLinkTarget[props.target] ?? props.target);

const anchorAttrs = computed(() => ({
  href: props.href,
  target: resolvedTarget.value,
  rel: props.rel,
  referrerpolicy: props.referrerpolicy ?? props.referrerPolicy,
  download: props.download === true ? '' : props.download === false ? undefined : props.download,
  'aria-label': props.ariaLabel,
  title: props.title,
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
    <a v-bind="anchorAttrs">
      <slot name="prepend" />

      <NmorphIcon v-if="resolvedIcon" class="nmorph-link__icon" width="10px" height="10px">
        <component :is="resolvedIcon" />
      </NmorphIcon>
      {{ text }}
      <NmorphIcon v-if="slots['icon']" class="nmorph-link__icon" width="10px" height="10px">
        <slot name="icon" />
      </NmorphIcon>
      <slot />
    </a>
  </div>
</template>

<style lang="scss">
.nmorph-link {
  --nmorph-private-link-color: var(--nmorph-accent-color);

  display: inline-block;

  a {
    display: flex;
    align-items: center;
    color: var(--nmorph-private-link-color);
    text-decoration: none;
  }

  .nmorph-link__icon {
    margin: 0 var(--indentation-02);
    --nmorph-private-icon-color: var(--nmorph-private-link-color);
  }

  &:hover {
    filter: brightness(85%);
  }

  &.nmorph-link--underline {
    position: relative;

    &:not(.nmorph-link--disabled):hover::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 0;
      border-bottom: 1px solid var(--nmorph-private-link-color);
      content: '';
    }
  }

  &.nmorph-link--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    a {
      pointer-events: none;
    }
  }

  &.nmorph-link--success {
    --nmorph-private-link-color: var(--nmorph-success-color);
  }

  &.nmorph-link--warning {
    --nmorph-private-link-color: var(--nmorph-warn-color);
  }

  &.nmorph-link--error {
    --nmorph-private-link-color: var(--nmorph-error-color);
  }
}
</style>
