<script setup lang="ts">
import { computed, DefineComponent, useSlots } from 'vue';
import { title3, useModifiers } from '@/utils';
import {
  NmorphIcon,
  NmorphAlertType,
  INmorphAlertProps,
  NmorphIconSuccessFilled,
  NmorphIconWarnTriangleFilled,
  NmorphIconInfoFilled,
  NmorphIconCircleCloseFilled,
  NmorphIconCross,
} from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps extends INmorphAlertProps { }

const props = withDefaults(defineProps<INmorphProps>(), {
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
});

interface INmorphEmit {
  (e: 'close'): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-alert': [props.type, `${props.bordered && 'bordered'}`, `${props.fill && 'fill'}`],
  })
);

const closeHandler = () => {
  emit('close');
};

const iconNameMap: Record<NmorphAlertType, DefineComponent<{}, {}, unknown>> = {
  [NmorphAlertType.success]: NmorphIconSuccessFilled,
  [NmorphAlertType.warning]: NmorphIconWarnTriangleFilled,
  [NmorphAlertType.info]: NmorphIconInfoFilled,
  [NmorphAlertType.error]: NmorphIconCircleCloseFilled,
};

const slots = useSlots();

const closeButtonPosition = computed(() => props.closeIconPosition);

const commonCSS = css`
  --background-color: var(--nmorph-overlay-color);

  display: inline-block;
  padding: var(--indentation-03) var(--indentation-04);
  background: var(--background-color);
  border-radius: var(--default-border-radius);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-white-color);
    white-space: pre-line;
  }

  .nmorph-alert__content-title {
    font-weight: 600;
    line-height: 1;
    ${title3()}
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
    align-self: v-bind(closeButtonPosition);

    margin-left: var(--indentation-03);
    cursor: pointer;

    .nmorph-icon {
      --color: var(--nmorph-white-color);
    }
  }

  .nmorph-alert--success {
    .nmorph-alert__icon {
      .nmorph-icon {
        --color: var(--nmorph-success-color);
      }
    }
  }

  &.nmorph-alert--error {
    .nmorph-alert__icon {
      .nmorph-icon {
        --color: var(--nmorph-error-color);
      }
    }
  }

  &.nmorph-alert--warning {
    .nmorph-alert__icon {
      .nmorph-icon {
        --color: var(--nmorph-warn-color);
      }
    }
  }

  &.nmorph-alert--info {
    .nmorph-alert__icon {
      .nmorph-icon {
        --color: var(--nmorph-info-color);
      }
    }
  }

  &.nmorph-alert--bordered {
    border: 1px solid var(--nmorph-gray-color);
  }

  &.nmorph-alert--fill {
    width: 100%;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}

`
</script>

<template>
  <StyledComponent v-if="slots.default || props.title || props.content || props.html" :class="modifiers">
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
  </StyledComponent>
</template>
