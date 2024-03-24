<script setup lang="ts">
import { CommonInputProps } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import { NmorphButton, NmorphIcon } from '@/components';

interface IProps extends CommonInputProps {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  interceptWrongValue?: boolean;
  actionBtnPositionRight?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: 'thick',
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  actionBtnPositionRight: false,
  interceptWrongValue: false,
  fill: true,
});

const modifiers = computed(() =>
  createModifiers('nmorph-number-input', [
    props.height,
    props.disabled ? 'disabled' : '',
    props.actionBtnPositionRight ? 'action-btn-position-right' : '',
    props.fill ? 'fill' : '',
  ])
);

const initialValue = ref(props.modelValue);

const increaseHandler = () => {
  initialValue.value += props.step;
};

const decreaseHandler = () => {
  initialValue.value -= props.step;
};
const minBtnDisabled = computed(() => initialValue.value <= props.min);
const maxBtnDisabled = computed(() => initialValue.value >= props.max);

const rightActionBtnHeight = computed(() => (props.height === 'thick' ? '16px' : '12px'));
const iconSizeMap = {
  thick: {
    default: '12px',
    right: '8px',
  },
  default: {
    default: '10px',
    right: '7px',
  },
  thin: {
    default: '8px',
    right: '5px',
  },
};
const actionBtnIconSize = computed(() => {
  const positionKey = props.actionBtnPositionRight ? 'right' : 'default';
  return iconSizeMap[props.height][positionKey];
});

interface IEmit {
  (e: 'update:modelValue', val: number): void;
}

const emit = defineEmits<IEmit>();

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let result = Number(target.value);

  if (props.interceptWrongValue) {
    if (result > props.max) result = props.max;
    if (result < props.min) result = props.min;
  }
  initialValue.value = result;
};

watch(initialValue, (updatedValue) => {
  emit('update:modelValue', updatedValue);
});
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-number-input__content">
      <div class="nmorph-number-input__input-content">
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__decrease">
          <NmorphButton
            style-type="transparent"
            :disabled="minBtnDisabled"
            :height="props.height"
            @click="decreaseHandler"
          >
            <NmorphIcon name="minus" :width="actionBtnIconSize" :height="actionBtnIconSize" />
          </NmorphButton>
        </div>
        <input :value="initialValue" type="number" :min="props.min" :max="props.max" @input="inputHandler" />
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__increase">
          <NmorphButton
            style-type="transparent"
            :disabled="maxBtnDisabled"
            :height="props.height"
            @click="increaseHandler"
          >
            <NmorphIcon name="plus" :width="actionBtnIconSize" :height="actionBtnIconSize" />
          </NmorphButton>
        </div>
        <div v-else class="nmorph-number-input__action-btns">
          <div class="nmorph-number-input__decrease">
            <NmorphButton style-type="transparent" :disabled="minBtnDisabled" @click="decreaseHandler">
              <NmorphIcon name="minus" :width="actionBtnIconSize" :height="actionBtnIconSize" />
            </NmorphButton>
          </div>
          <div class="nmorph-number-input__increase">
            <NmorphButton style-type="transparent" :disabled="maxBtnDisabled" @click="increaseHandler">
              <NmorphIcon name="plus" :width="actionBtnIconSize" :height="actionBtnIconSize" />
            </NmorphButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-number-input {
  --height: var(--thick-component);

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  .nmorph-number-input__content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .nmorph-number-input__input-content {
    height: var(--height);
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: var(--default-border-radius);
    @include nmorph-outset;
  }

  .nmorph-number-input__decrease {
    .nmorph-button__content {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .nmorph-number-input__increase {
    .nmorph-button__content {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  input {
    width: auto;
    border: none;
    transition: ease-in-out var(--transition-01) background;
    border-top: 1px solid var(--main-bg);
    border-bottom: 1px solid var(--main-bg);
    text-align: center;
    padding: 0 8px;
    width: 100%;
    @include nmorph-inset;
    @include body-1(var(--text-01));
  }

  input:focus {
    outline: none;
    color: var(--text-00);
    @include nmorph-outset;
    background: var(--accent-color-00);
  }

  .nmorph-number-input__action-btns {
    display: flex;
    flex-direction: column;
  }
}

.nmorph-number-input--fill {
  width: 100%;
}

.nmorph-number-input--valid {
  input:focus {
    background: var(--success-color-00);
  }
}

.nmorph-number-input--invalid {
  input:focus {
    background: var(--error-color-00);
  }
}

.nmorph-number-input--labeled {
  .nmorph-number-input__input-content {
    margin-top: 4px;
  }
  .nmorph-validation-icon {
    margin-top: 4px;
  }
}

.nmorph-number-input--disabled {
  @include disabled;
  .nmorph-number-input__input-content {
    pointer-events: none;
  }
}

.nmorph-number-input--thin {
  --height: var(--default-thickness-component);
  input {
    @include caption-1(var(--text-01));
  }
}

.nmorph-number-input--action-btn-position-right {
  input {
    border-top-left-radius: var(--default-border-radius);
    border-bottom-left-radius: var(--default-border-radius);
  }
  .nmorph-number-input__decrease,
  .nmorph-number-input__increase {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .nmorph-number-input__decrease {
    .nmorph-button__content {
      border-radius: 0;
      border-top-right-radius: var(--default-border-radius);
    }
  }
  .nmorph-number-input__increase {
    .nmorph-button__content {
      border-radius: 0;
      border-bottom-right-radius: var(--default-border-radius);
    }
  }

  .nmorph-button {
    width: 100%;
    --height: v-bind(rightActionBtnHeight);
  }
}
</style>
