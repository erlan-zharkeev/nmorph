<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon, NmorphLinkTarget } from '@/components';
import { NmorphColor, NmorphIconList } from '@/types';

interface INmorphProps {
  color?: keyof typeof NmorphColor;
  underline?: boolean;
  href?: string;
  text?: string;
  iconName?: keyof typeof NmorphIconList;
  target?: keyof typeof NmorphLinkTarget;
  disabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  color: NmorphColor.accent,
  href: '',
  underline: false,
  iconName: undefined,
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
  --link-color: var(--nmorph-info-color);
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
  --link-color: var(--nmorph-success-color);
  --hover-color: var(--nmorph-success-color);
}

.nmorph-link--warning {
  --link-color: var(--nmorph-warn-color);
  --hover-color: var(--nmorph-warn-color);
}

.nmorph-link--error {
  --link-color: var(--nmorph-error-text-color);
  --hover-color: var(--nmorph-error-text-color);
}
</style>
