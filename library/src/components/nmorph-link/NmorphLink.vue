<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIconName } from '../nmorph-icon/types';
import { NmorphColor } from '@/types/common';
import { NmorphIcon } from '@/components';
import { NmorphLinkTarget } from './types';

interface INmorphProps {
  color?: keyof typeof NmorphColor;
  underline?: boolean;
  href?: string;
  text?: string;
  iconName?: NmorphIconName;
  target?: keyof typeof NmorphLinkTarget;
  disabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  color: NmorphColor.accent,
  href: '',
  underline: false,
  iconName: '',
  text: '',
  target: 'self',
  disabled: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-link': [props.color, `${props.underline && 'underline'}`, `${props.disabled && 'disabled'}`],
  })
);
</script>

<template>
  <div :class="modifiers">
    <a :href="props.href" :target="props.target">
      <slot name="prepend" />

      {{ text }}
      <NmorphIcon v-if="iconName" class="nmorph-link__icon" :name="props.iconName" width="10px" height="10px" />
      <slot />
    </a>
  </div>
</template>

<style lang="scss">
.nmorph-link {
  --link-color: var(--info-color-00);
  --hover-color: var(--info-color-01);

  display: inline-block;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .nmorph-link__icon {
    margin-left: var(--indentation-02);
    --color: var(--link-color);
  }

  :hover {
    color: var(--hover-color);

    .nmorph-link__icon {
      --color: var(--hover-color);
    }
  }
}

.nmorph-link--underline {
  :hover {
    border-bottom: 1px solid var(--link-color);
  }
}

.nmorph-link--disabled {
  @include disabled;

  a {
    pointer-events: none;
  }
}

.nmorph-link--success {
  --link-color: var(--success-color-00);
  --hover-color: var(--success-color-00);
}

.nmorph-link--warning {
  --link-color: var(--warning-color-00);
  --hover-color: var(--warning-color-00);
}

.nmorph-link--error {
  --link-color: var(--error-text-color-00);
  --hover-color: var(--error-text-color-00);
}
</style>
