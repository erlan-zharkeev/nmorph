<script setup lang="ts">
import { CommonInputProps, ControlComponentHeight } from './../../../common-component.enums';
import { createModifiers } from './../../../../utils';
import { computed, ref } from 'vue';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import NmorphErrorBox from './../../nmorph-error-box/NmorphErrorBox.vue';
import { INumberValidationRule, useValidation } from './../../../../hooks/useValidation';
import NmorphValidationIcon from './../common/NmorphValidationIcon.vue';

interface IProps extends CommonInputProps {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  actionBtnPositionRight?: boolean;
  rules?: INumberValidationRule[];
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: ControlComponentHeight['thick'],
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  actionBtnPositionRight: false,
  label: '',
  rules: () => [],
  showValidationIcon: true,
  staticErrorBoxSpace: false,
  interceptWrongValue: false,
  fill: true,
});

const modifiers = computed(() =>
  createModifiers('nmorph-number-input', [
    props.height,
    props.disabled ? 'disabled' : '',
    props.actionBtnPositionRight ? 'action-btn-position-right' : '',
    props.label ? 'labeled' : '',
    showValidation.value ? (valid.value ? 'valid' : 'invalid') : '',
    props.fill ? 'fill' : '',
  ])
);

const inputValue = ref(props.modelValue);

const increaseHandler = () => {
  inputValue.value += props.step;
};

const decreaseHandler = () => {
  inputValue.value -= props.step;
};
const minBtnDisabled = computed(() => inputValue.value <= props.min);
const maxBtnDisabled = computed(() => inputValue.value >= props.max);

const rightActionBtnHeight = computed(() => (props.height === 'thick' ? '16px' : '12px'));
const iconSizeMap = {
  thick: {
    default: '10px',
    right: '6px',
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

const { showValidation, valid, errors } = useValidation({ rules: props.rules, inputValue });

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const emit = defineEmits<IEmit>();

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let result = Number(target.value);

  if (props.interceptWrongValue) {
    if (result > props.max) result = props.max;
    if (result < props.min) result = props.min;
  }
  inputValue.value = result;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div :class="modifiers">
    <label v-if="props.label">{{ props.label }}</label>
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
        <input :value="inputValue" type="number" :min="props.min" :max="props.max" @input="inputHandler" />
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
      <NmorphValidationIcon :valid="valid" :show="showValidation" />
    </div>
    <NmorphErrorBox v-if="props.staticErrorBoxSpace || showValidation" :errors="errors" :height="props.height" />
  </div>
</template>

<style lang="scss">
$input-transition: ease-in-out var(--transition-01) background;

.nmorph-number-input {
  --height: #{$thick-input-height};

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    @include body-1-strong(var(--text-01));
  }

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
    transition: $input-transition;
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
    transition: $input-transition;
    color: var(--text-00);
    @include nmorph-outset;
    background: var(--accent-color-00);
  }

  .nmorph-number-input__action-btns {
    display: flex;
    flex-direction: column;
  }

  .nmorph-error-box__error {
    margin-left: 0;
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
  --height: #{$thin-input-height};
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
