<script setup lang="ts">
import { Ref, computed, ref, useSlots } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphAlertType } from '@/components';

interface INmorphProps {
  color?: keyof typeof NmorphAlertType;
  closable?: boolean;
  title?: string;
  content?: string;
  fill?: boolean;
  maxWidth?: number;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  color: 'info',
  closable: true,
  title: '',
  content: '',
  fill: true,
  maxWidth: 300,
  showIcon: true,
});

interface INmorphEmit {
  (e: 'close'): void;
}
const emit = defineEmits<INmorphEmit>();

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

const iconName = computed(() => props.color) as Ref<NmorphAlertType>;

const slots = useSlots();
</script>

<template>
  <div v-if="slots.default || props.title || props.content" :class="modifiers">
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
    align-items: center;
  }

  .nmorph-alert__icon {
    margin-right: var(--indentation-03);
  }

  .nmorph-alert__close {
    align-self: flex-start;
    margin-left: var(--indentation-03);
    cursor: pointer;
  }
}

.nmorph-alert--hide {
  display: none;
}

.nmorph-alert--success {
  background: var(--nmorph-success-color);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-black-color);
  }

  .nmorph-icon {
    --color: var(--nmorph-success-text-color);
  }
}

.nmorph-alert--error {
  background: var(--nmorph-error-color);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-black-color);
  }

  .nmorph-icon {
    --color: var(--nmorph-error-text-color);
  }
}

.nmorph-alert--warning {
  background: var(--nmorph-warn-color);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-black-color);
  }

  .nmorph-icon {
    --color: var(--nmorph-warn-text-color);
  }
}

.nmorph-alert--info {
  background: var(--nmorph-info-color);

  .nmorph-alert__content,
  .nmorph-alert__content-title {
    color: var(--nmorph-black-color);
  }

  .nmorph-icon {
    --color: var(--nmorph-info-text-color);
  }
}
</style>
