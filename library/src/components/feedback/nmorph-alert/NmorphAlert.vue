<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphAlertType, INmorphAlertProps } from '@/components';
import { NmorphIconList } from '@/types';

interface INmorphProps extends INmorphAlertProps {}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: 'info',
  closable: false,
  title: '',
  content: '',
  fill: false,
  showIcon: true,
  bordered: true,
  html: '',
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

const iconNameMap: Record<NmorphAlertType, keyof typeof NmorphIconList> = {
  [NmorphAlertType.success]: 'success-filled',
  [NmorphAlertType.warning]: 'warn-triangle-filled',
  [NmorphAlertType.info]: 'info-filled',
  [NmorphAlertType.error]: 'circle-close-filled',
};

const slots = useSlots();
</script>

<template>
  <div v-if="slots.default || props.title || props.content" :class="modifiers">
    <div v-if="props.html" class="nmorph-alert__wrapper" v-html="props.html" />
    <div v-else class="nmorph-alert__wrapper">
      <div class="nmorph-alert__left-side">
        <div v-if="props.showIcon" class="nmorph-alert__icon">
          <slot name="icon">
            <NmorphIcon :name="iconNameMap[props.type]" size="medium" />
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
        <NmorphIcon name="cross" width="14px" height="14px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nmorph-alert {
  display: inline-block;
  padding: var(--indentation-03) var(--indentation-04);
  background: var(--nmorph-overlay-color);
  border-radius: var(--default-border-radius);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-gray-color);
    white-space: pre-line;
  }

  .nmorph-alert__content-title {
    font-weight: 600;
    line-height: 1;

    @include title-3;
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
    align-self: flex-start;
    margin-left: var(--indentation-03);
    cursor: pointer;

    .nmorph-icon {
      --color: var(--nmorph-gray-color);
    }
  }
}

.nmorph-alert--success {
  .nmorph-alert__icon {
    .nmorph-icon {
      --color: var(--nmorph-success-color);
    }
  }
}

.nmorph-alert--error {
  .nmorph-alert__icon {
    .nmorph-icon {
      --color: var(--nmorph-error-color);
    }
  }
}

.nmorph-alert--warning {
  .nmorph-alert__icon {
    .nmorph-icon {
      --color: var(--nmorph-warn-color);
    }
  }
}

.nmorph-alert--info {
  .nmorph-alert__icon {
    .nmorph-icon {
      --color: var(--nmorph-info-color);
    }
  }
}

.nmorph-alert--bordered {
  border: 1px solid var(--nmorph-gray-color);
}

.nmorph-alert--fill {
  width: 100%;
}
</style>
