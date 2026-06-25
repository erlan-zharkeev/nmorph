<script setup lang="ts">
import { computed, type Component, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssVariables, useModifiers } from '@/utils';
import {
  NmorphIcon,
  NmorphAlertType,
  NmorphIconSuccessFilled,
  NmorphIconWarnTriangleFilled,
  NmorphIconInfoFilled,
  NmorphIconCircleCloseFilled,
  NmorphIconCross,
} from '@/components';
import type { INmorphAlertComponentProps, INmorphAlertEmit } from './types';

const props = withDefaults(defineProps<INmorphAlertComponentProps>(), {
  id: undefined,
  type: 'info',
  closable: false,
  title: '',
  content: '',
  fill: false,
  showIcon: true,
  bordered: true,
  html: '',
  closeIconPosition: 'center',
  backgroundColor: undefined,
});

const emit = defineEmits<INmorphAlertEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-alert': [props.type, props.bordered && 'bordered', props.fill && 'fill'],
  })
);

const styles = computed<CSSProperties>(() => ({
  '--nmorph-private-alert-close-align': props.closeIconPosition,
  ...createCssVariables({
    '--nmorph-private-alert-background-color': props.backgroundColor,
  }),
}));

const closeHandler = () => {
  emit('close');
};

const iconNameMap: Record<NmorphAlertType, Component> = {
  [NmorphAlertType.success]: NmorphIconSuccessFilled,
  [NmorphAlertType.warning]: NmorphIconWarnTriangleFilled,
  [NmorphAlertType.info]: NmorphIconInfoFilled,
  [NmorphAlertType.error]: NmorphIconCircleCloseFilled,
};

const slots = useSlots();
</script>

<template>
  <div v-if="slots.default || props.title || props.content || props.html" :class="modifiers" :style="styles">
    <div v-if="props.html" class="nmorph-alert__html-wrapper" v-html="props.html" />
    <div v-else class="nmorph-alert__wrapper">
      <div class="nmorph-alert__left-side">
        <div v-if="props.showIcon" class="nmorph-alert__icon">
          <slot name="icon">
            <NmorphIcon size="medium">
              <component :is="iconNameMap[props.type]" />
            </NmorphIcon>
          </slot>
        </div>
        <div class="nmorph-alert__content-wrapper">
          <div class="nmorph-alert__content-title">
            <slot v-if="props.title || slots.title" name="title">{{ props.title }}</slot>
          </div>
          <div class="nmorph-alert__content">
            <slot>{{ props.content }}</slot>
          </div>
        </div>
      </div>
      <div v-if="props.closable" class="nmorph-alert__close" @click="closeHandler">
        <NmorphIcon width="14px" height="14px">
          <NmorphIconCross />
        </NmorphIcon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-alert {
  --nmorph-private-alert-background-color: var(--nmorph-info-color);

  display: inline-block;
  padding: var(--indentation-03) var(--indentation-04);
  background: var(--nmorph-private-alert-background-color);
  border-radius: var(--default-border-radius);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-contrast-text-color);
    white-space: pre-line;
  }

  .nmorph-alert__content-title {
    font-weight: var(--nmorph-typography-title-small-font-weight);
    font-size: var(--nmorph-typography-title-small-font-size);
    line-height: 1;
    line-height: var(--line-height-loose);
  }

  .nmorph-alert__html-wrapper {
    display: block;
  }

  .nmorph-alert__wrapper {
    justify-content: space-between;
  }

  .nmorph-alert__wrapper,
  .nmorph-alert__left-side {
    display: flex;
    align-items: center;
  }

  .nmorph-alert__icon {
    margin-right: var(--indentation-03);
  }

  .nmorph-alert__close {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    align-self: var(--nmorph-private-alert-close-align);
    width: 28px;
    height: 28px;
    margin-right: -7px;
    margin-left: var(--indentation-03);
    cursor: pointer;

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-contrast-text-color);
    }
  }

  &.nmorph-alert--success {
    --nmorph-private-alert-background-color: var(--nmorph-success-color);

    .nmorph-alert__icon {
      .nmorph-icon {
        --nmorph-private-icon-color: var(--nmorph-success-text-color);
      }
    }
  }

  &.nmorph-alert--error {
    --nmorph-private-alert-background-color: var(--nmorph-error-color);

    .nmorph-alert__icon {
      .nmorph-icon {
        --nmorph-private-icon-color: var(--nmorph-error-text-color);
      }
    }
  }

  &.nmorph-alert--warning {
    --nmorph-private-alert-background-color: var(--nmorph-warn-color);

    .nmorph-alert__icon {
      .nmorph-icon {
        --nmorph-private-icon-color: var(--nmorph-warn-text-color);
      }
    }
  }

  &.nmorph-alert--info {
    --nmorph-private-alert-background-color: var(--nmorph-info-color);

    .nmorph-alert__icon {
      .nmorph-icon {
        --nmorph-private-icon-color: var(--nmorph-info-text-color);
      }
    }
  }

  &.nmorph-alert--bordered {
    border: 1px solid var(--nmorph-gray-color);
  }

  &.nmorph-alert--fill {
    width: 100%;
  }
}
</style>
