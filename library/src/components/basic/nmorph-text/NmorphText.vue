<script setup lang="ts">
import { computed } from 'vue';
import { createCssVariables, useMergedAttrs, useModifiers } from '@/utils';
import type { INmorphTextProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<INmorphTextProps>(), {
  as: 'span',
  text: undefined,
  variant: 'body',
  weight: undefined,
  color: 'text',
  align: 'inherit',
  selectable: true,
  italic: false,
  noLineHeight: false,
  truncate: false,
  nowrap: false,
  lineClamp: undefined,
});

const colorMap: Record<string, string> = {
  text: 'var(--nmorph-text-color)',
  contrast: 'var(--nmorph-contrast-text-color)',
  'semi-contrast': 'var(--nmorph-semi-contrast-text-color)',
  placeholder: 'var(--nmorph-placeholder-text-color)',
  focus: 'var(--nmorph-focus-text-color)',
  accent: 'var(--nmorph-accent-color)',
  success: 'var(--nmorph-success-text-color)',
  warning: 'var(--nmorph-warn-text-color)',
  error: 'var(--nmorph-error-text-color)',
  white: 'var(--nmorph-white-color)',
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-typography': [
      props.variant,
      props.weight,
      !props.selectable && 'not-selectable',
      props.italic && 'italic',
      props.noLineHeight && 'no-line-height',
      props.truncate && 'truncate',
      props.nowrap && 'nowrap',
      props.lineClamp && 'line-clamp',
    ],
  })
);

const styles = computed(() =>
  createCssVariables({
    '--nmorph-private-text-color': colorMap[props.color] || props.color,
    '--nmorph-private-text-align': props.align === 'inherit' ? undefined : props.align,
    '--nmorph-private-text-line-clamp': props.lineClamp,
  })
);
const rootAttrs = useMergedAttrs(modifiers, styles);
</script>

<template>
  <component :is="props.as" v-bind="rootAttrs">
    <slot>{{ props.text }}</slot>
  </component>
</template>
