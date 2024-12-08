<script setup lang="ts">
import { body3, nmorphInset, useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon, NmorphIconError } from '@/components';
import { NmorphComponentHeight } from '@/types';
import { INmorphTagItemProps } from './../../types';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps extends INmorphTagItemProps { }

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  removable: true,
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-tag-item': [`${props.design === 'nmorph' ? 'nmorph-design' : ''}`],
  })
);

interface INmorphEmit {
  (e: 'close', val: string): void;
}

const emit = defineEmits<INmorphEmit>();

const closeHandler = () => {
  emit('close', props.value);
};

const commonCSS = css`
  display: inline-flex;
  margin-right: var(--indentation-02);
  padding: var(--indentation-00) var(--indentation-03);
  border: solid 2px var(--nmorph-text-color);
  border-radius: var(--default-border-radius);
  cursor: default;

  .nmorph-tag-item__content {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nmorph-tag-item__close-icon {
    margin-left: 4px;
  }

  &.nmorph-tag-item--nmorph-design {
    border: none;
    ${nmorphInset()}
  }

  &.nmorph-tag-item--thin {
    --height: var(--thin-component);
    span {
      ${body3()}
    }
  }

  &.nmorph-tag-item--thick {
    --height: var(--thick-component);
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <div class="nmorph-tag-item__content">
      <span>{{ text }}</span>
      <NmorphIcon v-if="props.removable" class="nmorph-tag-item__close-icon" @click.stop="closeHandler">
        <NmorphIconError />
      </NmorphIcon>
    </div>
  </StyledComponent>
</template>
