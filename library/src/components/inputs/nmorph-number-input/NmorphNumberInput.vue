<script setup lang="ts">
import { NmorphCommonInputProps, NmorphComponentHeight, NmorphDomElement } from '@/types/common';
import { useModifiers } from '@/utils';
import { Ref, computed, onMounted, ref, watch } from 'vue';
import { NmorphButton, NmorphIcon } from '@/components';

interface IProps extends NmorphCommonInputProps {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  actionBtnPositionRight?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: 'default',
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  actionBtnPositionRight: false,
  fill: true,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-number-input': [
      `${props.disabled && 'disabled'}`,
      `${props.actionBtnPositionRight && 'action-btn-position-right'}`,
    ],
  })
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
  (e: 'inputDOMRef', val: Ref<NmorphDomElement>): void;
  (e: 'update:modelValue', val: number): void;
}

const emit = defineEmits<IEmit>();

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

  emit('update:modelValue', updatedValue);
});

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

const inputDOMRef = ref<NmorphDomElement>(null);
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
        <input
          ref="inputDOMRef"
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
    width: 100%;
    padding: var(--indentation-00) var(--default-indentation-input);
    text-align: center;
    border: none;
    border-top: 1px solid var(--main-bg);
    border-bottom: 1px solid var(--main-bg);
    transition: ease-in-out var(--transition-01) background;

    @include nmorph-inset;
  }

  input:focus {
    background: var(--accent-color-00);
    outline: none;

    @include nmorph-outset;
  }

  .nmorph-number-input__action-btns {
    display: flex;
    flex-direction: column;
  }
}

.nmorph-number-input--disabled {
  @include disabled;

  .nmorph-number-input__input-content {
    pointer-events: none;
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
@/types/common
