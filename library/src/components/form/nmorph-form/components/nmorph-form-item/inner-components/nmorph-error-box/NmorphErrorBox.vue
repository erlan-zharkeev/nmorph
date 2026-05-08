<script setup lang="ts">
import { NmorphComponentHeight } from '@/types';
import { useModifiers } from '@/utils';
import { Ref, computed } from 'vue';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  height?: keyof typeof NmorphComponentHeight;
  errors?: string[] | Ref<string[]>;
  staticHeight?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'basic',
  errors: () => [],
  staticHeight: false,
});

const currentError = computed(() => {
  const arr = Array.isArray(props.errors) ? props.errors : props.errors.value;
  return arr.length ? [arr[arr.length - 1]] : [];
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-error-box': [`${props.staticHeight && 'static-height'}`, `${currentError.value.length === 0 && 'empty'}`],
  })
);

const commonCSS = css`
  display: flex;
  align-items: center;
  overflow: hidden;

  .nmorph-error-box__error {
    margin: var(--indentation-00);
    margin-left: var(--default-indentation-input);
    color: var(--nmorph-error-text-color);
    text-align: left;
  }

  &.nmorph-error-box--empty {
    &:not(.nmorph-error-box--static-height) {
      display: none;
    }
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <transition-group name="list" tag="div">
      <p v-for="error in currentError" :key="error" class="nmorph-error-box__error">{{ error }}</p>
    </transition-group>
  </StyledComponent>
</template>
