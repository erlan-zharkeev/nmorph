<script setup lang="ts">
import { NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import { NmorphButton, NmorphIcon, NmorphIconMinusThin, NmorphIconPlusThin } from '@/components';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphNumberInputEmit, INmorphNumberInputProps } from './types';

const props = withDefaults(defineProps<INmorphNumberInputProps>(), {
  height: 'basic',
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  actionBtnPositionRight: false,
});

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-number-input': [props.disabled && 'disabled', props.actionBtnPositionRight && 'action-btn-position-right'],
  })
);

const iconSizeMap = {
  thick: {
    default: '12px',
    right: '8px',
  },
  basic: {
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

const emit = defineEmits<INmorphNumberInputEmit>();
const { modelValue, updateModelValue } = useFormItemModel<number>(
  props,
  (value) => emit('update:model-value', value),
  0
);
const initialValue = ref(modelValue.value);

const increaseHandler = () => {
  initialValue.value += props.step;
};

const decreaseHandler = () => {
  initialValue.value -= props.step;
};
const minBtnDisabled = computed(() => initialValue.value <= props.min);
const maxBtnDisabled = computed(() => initialValue.value >= props.max);

const rightActionBtnHeight = computed(() => (props.height === 'thick' ? '16px' : '12px'));

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let result = Number(target.value);

  initialValue.value = result;
};

watch(initialValue, (updatedValue) => {
  if (updatedValue > props.max) {
    initialValue.value = props.max;
    inputDOMRef.value?.blur();
  }

  if (initialValue.value < props.min) {
    initialValue.value = props.min;
    inputDOMRef.value?.blur();
  }

  updateModelValue(updatedValue);
});

watch(modelValue, (updatedValue) => {
  initialValue.value = updatedValue;
});

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });
</script>

<template>
  <div :class="modifiers" :style="{ '--nmorph-number-input-right-action-height': rightActionBtnHeight }">
    <div class="nmorph-number-input__content">
      <div class="nmorph-number-input__input-content">
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__decrease">
          <NmorphButton
            style-type="transparent"
            :disabled="minBtnDisabled"
            :height="props.height"
            @click="decreaseHandler"
          >
            <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
              <NmorphIconMinusThin />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <input
          :id="id"
          ref="inputDOMRef"
          :name="name"
          :autocomplete="autocomplete"
          :tabindex="tabindex"
          class="nmorph-native-input"
          :value="initialValue"
          type="number"
          :min="props.min"
          :max="props.max"
          @input="inputHandler"
        />
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__increase">
          <NmorphButton
            style-type="transparent"
            :disabled="maxBtnDisabled"
            :height="props.height"
            @click="increaseHandler"
          >
            <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
              <NmorphIconPlusThin />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-else class="nmorph-number-input__action-btns">
          <div class="nmorph-number-input__increase">
            <NmorphButton style-type="transparent" :disabled="maxBtnDisabled" @click="increaseHandler">
              <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
                <NmorphIconPlusThin />
              </NmorphIcon>
            </NmorphButton>
          </div>
          <div class="nmorph-number-input__decrease">
            <NmorphButton style-type="transparent" :disabled="minBtnDisabled" @click="decreaseHandler">
              <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
                <NmorphIconMinusThin />
              </NmorphIcon>
            </NmorphButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-number-input {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  .nmorph-number-input__content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .nmorph-number-input__input-content {
    display: flex;
    width: 100%;
    height: var(--height);
    height: 100%;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
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
    width: 100%;
    padding: var(--indentation-00) var(--default-indentation-input);
    text-align: center;
    background: var(--nmorph-main-color);
    border: none;
    border-top: 1px solid var(--nmorph-main-color);
    border-bottom: 1px solid var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    transition: ease-in-out var(--transition-01) background;
    transition: background 0s;
    appearance: textfield;
  }

  input:focus {
    background: var(--nmorph-accent-color);
    outline: none;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  .nmorph-number-input__action-btns {
    display: flex;
    flex-direction: column;
  }

  &.nmorph-number-input--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-number-input__input-content {
      pointer-events: none;
    }
  }

  &.nmorph-number-input--action-btn-position-right {
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

    .nmorph-number-input__increase {
      .nmorph-button__content {
        border-radius: 0;
        border-top-right-radius: var(--default-border-radius);
      }
    }

    .nmorph-number-input__decrease {
      .nmorph-button__content {
        border-radius: 0;
        border-bottom-right-radius: var(--default-border-radius);
      }
    }

    .nmorph-button {
      --height: var(--nmorph-number-input-right-action-height);

      width: 100%;
    }
  }
}
</style>
