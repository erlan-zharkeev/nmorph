<script setup lang="ts">
import { Ref, computed, ref, useSlots } from 'vue';
import { useModifiers } from '@/utils';
import NmorphIcon from './../nmorph-icon/NmorphIcon.vue';
import { NmorphIconName } from '../nmorph-icon/types';
import { NmorphAlertType } from './types';

interface IProps {
  color?: keyof typeof NmorphAlertType;
  closable?: boolean;
  title?: string;
  content?: string;
  fill: boolean;
  maxWidth?: number;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'info',
  closable: true,
  title: '',
  content: '',
  fill: true,
  maxWidth: 300,
  showIcon: true,
});

interface IEmit {
  (e: 'close'): void;
}
const emit = defineEmits<IEmit>();

const hide = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-alert': [props.color, `${hide.value && 'hide'}`],
  })
);

const closeHandler = () => {
  hide.value = true;
  emit('close');
};

const iconName = computed(() => props.color) as Ref<NmorphIconName>;

const slots = useSlots();
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-alert__wrapper">
      <div v-if="props.showIcon" class="nmorph-alert__icon">
        <slot name="icon">
          <NmorphIcon :name="iconName" size="medium" />
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
      <div v-if="props.closable" class="nmorph-alert__close" @click="closeHandler">
        <NmorphIcon name="cross" width="14px" height="14px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-alert {
  display: inline-block;
  padding: var(--indentation-03);
  border-radius: var(--default-border-radius);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    white-space: pre-line;
  }

  .nmorph-alert__content-title {
    font-weight: 600;
    @include title-3;
    line-height: 1;
  }

  .nmorph-alert__wrapper {
    display: flex;
  }
  .nmorph-alert__wrapper {
    display: flex;
    align-items: center;
  }
  .nmorph-alert__icon {
    margin-right: var(--indentation-03);
  }
  .nmorph-alert__close {
    margin-left: var(--indentation-02);
    align-self: flex-start;
  }
}

.nmorph-alert--hide {
  display: none;
}

.nmorph-alert--success {
  background: var(--success-color-00);
  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--success-color-01);
  }
  .nmorph-icon {
    --color: var(--success-color-01);
  }
}

.nmorph-alert--error {
  background: var(--error-color-00);
  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--error-color-01);
  }
  .nmorph-icon {
    --color: var(--error-color-01);
  }
}

.nmorph-alert--warning {
  background: var(--warning-color-00);
  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--warning-color-01);
  }
  .nmorph-icon {
    --color: var(--warning-color-01);
  }
}

.nmorph-alert--info {
  background: var(--info-color-00);
  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--info-color-01);
  }
  .nmorph-icon {
    --color: color: var(--info-color-01);
  }
}
</style>
