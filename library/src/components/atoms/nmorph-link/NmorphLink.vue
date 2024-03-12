<script setup lang="ts">
import { computed } from 'vue';
import { createModifiers } from './../../../utils';
import { Color } from './../../common-component.enums';
import { IconName } from '../nmorph-icon/NmorphIconList.enums';
import NmorphIcon from './../nmorph-icon/NmorphIcon.vue';

enum LinkTarget {
  self = '_self',
  blank = '_blank',
  parent = '_parent',
  top = '_top',
}

interface IProps {
  color?: keyof typeof Color;
  underline?: boolean;
  href?: string;
  text?: string;
  iconName?: IconName;
  target?: keyof typeof LinkTarget;
  disabled: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  color: Color.accent,
  href: '',
  underline: false,
  iconName: '',
  text: '',
  target: 'self',
  disabled: false,
});

const modifiers = computed(() =>
  createModifiers('nmorph-link', [props.color, props.underline ? 'underline' : '', props.disabled ? 'disabled' : ''])
);
</script>

<template>
  <div :class="modifiers">
    <a :href="props.href" :target="props.target">
      <slot name="prepend" />

      {{ text }}
      <NmorphIcon v-if="iconName" class="nmorph-link__icon" :name="props.iconName" width="10px" height="10px" />
      <slot name="default" />
    </a>
  </div>
</template>

<style lang="scss">
.nmorph-link {
  --link-color: var(--info-color-00);
  --hover-color: var(--info-color-01);

  display: inline-block;

  a {
    @include body-1(var(--link-color));
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .nmorph-link__icon {
    margin-left: 4px;
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
  --hover-color: var(--success-color-01);
}

.nmorph-link--warning {
  --link-color: var(--warning-color-00);
  --hover-color: var(--warning-color-01);
}

.nmorph-link--error {
  --link-color: var(--error-color-00);
  --hover-color: var(--error-color-00);
}
</style>
