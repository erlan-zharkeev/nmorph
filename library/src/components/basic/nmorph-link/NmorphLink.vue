<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, useSlots } from 'vue';
import { NmorphIcon, NmorphLinkTarget } from '@/components';
import { NmorphColor } from '@/types';

interface INmorphProps {
  type?: keyof typeof NmorphColor;
  underline?: boolean;
  href?: string;
  text?: string;
  target?: keyof typeof NmorphLinkTarget;
  disabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: NmorphColor.accent,
  href: '',
  underline: false,
  text: '',
  target: 'self',
  disabled: false,
});

const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-link': [props.type, `${props.underline && 'underline'}`, `${props.disabled && 'disabled'}`],
  })
);
</script>

<template>
  <div :class="modifiers">
    <a :href="props.href" :target="props.target">
      <slot name="prepend" />

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
  --link-color: var(--nmorph-accent-color);

  display: inline-block;

  a {
    display: flex;
    align-items: center;
    color: var(--link-color);
    text-decoration: none;
  }

  .nmorph-link__icon {
    margin: 0 var(--indentation-02);
    --color: var(--link-color);
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
      border-bottom: 1px solid var(--link-color);
      content: '';
    }
  }

  &.nmorph-link--disabled {
    a {
      pointer-events: none;
    }
  }

  &.nmorph-link--success {
    --link-color: var(--nmorph-success-color);
  }

  &.nmorph-link--warning {
    --link-color: var(--nmorph-warn-color);
  }

  &.nmorph-link--error {
    --link-color: var(--nmorph-error-color);
  }

  &.nmorph-link--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
