<script setup lang="ts">
import { computed, ref } from 'vue';
import { nmorphOutset, useModifiers } from '@/utils';
import { usePlacement } from '@/hooks';
import { NmorphDomElementType } from '@/types';
import { NmorphOverlay } from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  open: boolean;
  relativeElement: NmorphDomElementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  width: 160,
  xOffset: 0,
  yOffset: 0,
  fillWidth: true,
});

interface INmorphEmit {
  (e: 'on-outside-click'): void;
}
const emit = defineEmits<INmorphEmit>();

const dropdownDOMRef = ref<NmorphDomElementType>(null);

const { placementCoords } = usePlacement({
  initialPlacement: 'bottom',
  contentDOMElement: dropdownDOMRef,
  relativeElement: props.relativeElement,
  yOffset: props.yOffset,
  xOffset: props.xOffset,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dropdown': [`${!props.open && 'closed'}`],
  })
);

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

const width = computed(() => (props.fillWidth ? `${props.relativeElement?.clientWidth}px` : getCssSize(props.width)));

const outsideClickHandler = () => {
  emit('on-outside-click');
};

const commonCSS = css`
  .nmorph-dropdown {
    position: fixed;
    border-radius: var(--default-border-radius);
    ${nmorphOutset()}
  }

  .nmorph-dropdown--closed {
    z-index: -1000;
    opacity: 0;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  .nmorph-dropdown {
    width: ${props => props.width};
    min-width: ${props => props.minWidth};
    max-width: ${props => props.maxWidth};
  }
`
</script>

<template>
  <StyledComponent
    :props="{
      width,
      minWidth: getCssSize(props.minWidth) || 'auto',
      maxWidth: getCssSize(props.maxWidth) || 'none',
    }"
  >
    <NmorphOverlay :show="props.open" transparent @on-outside-click="outsideClickHandler">
      <div ref="dropdownDOMRef" :class="modifiers"
        :style="{ left: `${placementCoords.x}`, top: `${placementCoords.y}` }">
        <slot />
      </div>
    </NmorphOverlay>
  </StyledComponent>

</template>
