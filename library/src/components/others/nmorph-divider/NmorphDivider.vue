<script setup lang="ts">
import { computed } from 'vue';
import { nmorphOutset, useModifiers } from '@/utils';
import { NmorphDirectionType } from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  direction?: NmorphDirectionType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  direction: 'horizontal',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-divider': [props.direction],
  })
);


const commonCSS = css`
  ${nmorphOutset()}


  &.nmorph-divider--horizontal {
    width: 100%;
    height: 2px;
  }

  &.nmorph-divider--vertical {
    width: 2px;
    height: auto;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers" />
</template>
