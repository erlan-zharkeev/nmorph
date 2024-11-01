<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphRadioOption,
  NmorphDomElementType,
  NmorphRadioChangeRadioButtonValueHandlerInjectionType,
  NmorphRadioGroupSelectedValueInjectionType,
  NmorphRadioStyleType,
} from '@/types';

const groupSelectedValue = inject<NmorphRadioGroupSelectedValueInjectionType>('radio-group-selected-value', undefined);
const changeValue = inject<NmorphRadioChangeRadioButtonValueHandlerInjectionType>(
  'change-radio-button-value-handler',
  undefined
);

interface INmorphProps extends INmorphRadioOption {
  styleType?: keyof typeof NmorphRadioStyleType;
  checked?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  disabled: false,
  label: '',
  styleType: 'button',
  checked: false,
});

const changeHandler = () => {
  if (changeValue && !props.disabled) changeValue(props.value);
};

const checked = computed(() => groupSelectedValue?.value === props.value || props.checked);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-radio': [`${props.disabled && 'disabled'}`, `${checked.value && 'checked'}`, props.styleType],
  })
);

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });
</script>

<template>
  <label :class="modifiers" @click.prevent="changeHandler">
    <div v-if="props.styleType === 'radio-style'" class="nmorph-radio__content">
      <div class="nmorph-radio__input-wrapper">
        <input
          ref="inputDOMRef"
          type="radio"
          :name="props.label"
          :value="props.value"
          :checked="checked"
          class="nmorph-native-input"
        />
        <div class="nmorph-radio__fake" />
        <div v-if="checked" class="nmorph-radio__fake-checked" />
      </div>
      <span v-if="props.label" class="nmorph-radio__label">
        {{ props.label }}
      </span>
      <slot v-else name="label" />
    </div>
    <div v-if="props.styleType === 'button'" class="nmorph-radio__content">
      <input
        ref="inputDOMRef"
        type="radio"
        :disabled="props.disabled"
        :name="props.label"
        :value="props.value"
        :checked="checked"
        class="nmorph-native-input"
      />
      <div v-if="props.label" class="nmorph-radio__fake">
        <span> {{ props.label }} </span>
      </div>
      <div v-else class="nmorph-radio__fake">
        <slot name="label" />
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.nmorph-radio {
  --size: var(--extra-thin-component);

  cursor: pointer;

  .nmorph-radio__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    margin-top: 2px;
  }

  .nmorph-radio__input-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  input {
    opacity: 0;

    @include absolute-zero;
    @include wh100;
  }

  .nmorph-radio__fake {
    border-radius: var(--border-radius-circular);

    @include wh100;
    @include absolute-zero;
    @include nmorph-inset;
  }

  .nmorph-radio__fake-checked {
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-circular);

    @include absolute-center;
  }

  .nmorph-radio__label {
    margin-left: var(--indentation-02);
  }
}

.nmorph-radio--button {
  --size: var(--default-thickness-component);

  .nmorph-radio__fake {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--size);
    padding: var(--indentation-03);
    white-space: nowrap;
    border-radius: var(--default-border-radius);

    @include nmorph-outset;
  }
}

.nmorph-radio--checked {
  .nmorph-radio__fake {
    @include nmorph-inset;
  }
}

.nmorph-radio--disabled {
  @include disabled;
}
</style>
