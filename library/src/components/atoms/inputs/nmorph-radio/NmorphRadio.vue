<script setup lang="ts">
import { createModifiers } from './../../../../utils';
import { Ref, computed, inject } from 'vue';
import { IRadioOption, RadioStyleType } from './types';

const groupSelectedValue = inject<Ref<string>>('radio-group-selected-value');
const changeValue = inject<(value: string) => void>('change-radio-button-value-handler');

interface IProps extends IRadioOption {
  styleType?: keyof typeof RadioStyleType;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  label: '',
  styleType: 'radio-style',
});

const changeHandler = () => {
  if (changeValue && !props.disabled) changeValue(props.value);
};

const checked = computed(() => groupSelectedValue?.value === props.value);

const modifiers = computed(() =>
  createModifiers('nmorph-radio', [props.disabled ? 'disabled' : '', props.styleType, checked.value ? 'checked' : ''])
);
</script>

<template>
  <label :class="modifiers" @click.prevent="changeHandler">
    <div v-if="props.styleType === 'radio-style'" class="nmorph-radio__content">
      <div class="nmorph-radio__input-wrapper">
        <input type="radio" :name="props.label" :value="props.value" :checked="checked" />
        <div class="nmorph-radio__fake" />
        <transition-group name="opacity" tag="div">
          <div v-if="checked" class="nmorph-radio__fake-checked" />
        </transition-group>
      </div>
      <span v-if="props.label" class="nmorph-radio__label">
        {{ props.label }}
      </span>
      <slot v-else name="label" />
    </div>
    <div v-if="props.styleType === 'button-style'" class="nmorph-radio__content">
      <input type="radio" :disabled="props.disabled" :name="props.label" :value="props.value" :checked="checked" />
      <div v-if="props.label" class="nmorph-radio__fake">
        {{ props.label }}
      </div>
      <div v-else class="nmorph-radio__fake">
        <slot name="label" />
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.nmorph-radio {
  --size: #{$xs-input-height};
  cursor: pointer;
  @include body-1(var(--text-01));

  .nmorph-radio__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
    background: var(--accent-color-01);
    width: 50%;
    height: 50%;
    border-radius: var(--border-radius-circular);
    @include absolute-center;
  }

  .nmorph-radio__label {
    margin-left: 4px;
  }
}

.nmorph-radio--button-style {
  --size: #{$default-input-height};
  @include nmorph-wrapper;

  .nmorph-radio__fake {
    padding: 8px;
    border-radius: var(--default-border-radius);
    position: relative;
    height: var(--size);
    display: flex;
    align-items: center;
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
