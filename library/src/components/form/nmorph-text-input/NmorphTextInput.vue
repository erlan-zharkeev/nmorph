<script setup lang="ts">
import { NmorphComponentThickness } from '@/types';
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import { NmorphIcon, NmorphButton, NmorphIconError, NmorphIconEye, NmorphIconEyeBlocked } from '@/components';
import { useFocusableInput } from '@/hooks/use-focusable-input';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphTextInputEmit, INmorphTextInputProps } from './types';

const slots = useSlots();

const props = withDefaults(defineProps<INmorphTextInputProps>(), {
  placeholder: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  thickness: 'basic',
  clearable: false,
  indentation: '',
  prependIconIndent: undefined,
  prependIconSize: undefined,
  prependIconColor: undefined,
  inputAttrs: () => ({}),
});

const emit = defineEmits<INmorphTextInputEmit>();
const { id, name, autocomplete, tabindex } = useFormItemInput(props);
const { modelValue, updateModelValue } = useFormItemModel<string>(
  props,
  (value) => emit('update:model-value', value),
  ''
);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness], focused.value && 'focused'],
    'nmorph-text-input': [props.typePassword && 'password', (props.typePassword || props.clearable) && 'with-action'],
  })
);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  updateModelValue(target.value);
};

const showPassword = ref(false);

const actionButtonClickHandler = () => {
  if (props.clearable) {
    updateModelValue('');
  } else {
    showPassword.value = !showPassword.value;
  }
};

const type = computed(() => {
  return props.typePassword && !showPassword.value && !props.clearable ? 'password' : 'text';
});

const {
  elementRef: inputDOMRef,
  focused,
  handleFocus,
  handleBlur,
  focus,
  blur,
  select,
} = useFocusableInput<HTMLInputElement>({
  onFocus: () => emit('focus'),
  onBlur: () => emit('blur'),
});

defineExpose({ inputDOMRef, focus, blur, select });

const actionIcon = computed(() => {
  if (props.clearable) return NmorphIconError;
  else return showPassword.value ? NmorphIconEyeBlocked : NmorphIconEye;
});

const indentation = computed(() => props.indentation || (slots['prepend-icon'] ? '28px' : '8px'));
const styles = computed(() => ({
  '--nmorph-private-text-input-indentation': indentation.value,
  ...createCssSizeVariables({
    '--nmorph-private-text-input-prepend-icon-indent': props.prependIconIndent,
    '--nmorph-private-text-input-prepend-icon-size': props.prependIconSize,
  }),
  ...createCssVariables({
    '--nmorph-private-text-input-prepend-icon-color': props.prependIconColor,
  }),
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-text-input__input-side">
      <div v-if="slots['prepend-icon']" class="nmorph-text-input__prepend-icon">
        <slot name="prepend-icon" />
      </div>
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        class="nmorph-native-input"
        :type="type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="modelValue"
        v-bind="props.inputAttrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="emit('keydown', $event)"
        @keyup.enter="emit('on-enter')"
      />
      <NmorphButton
        v-if="props.typePassword || props.clearable"
        :disabled="props.disabled"
        class="nmorph-text-input__password-btn"
        design="plain"
        :thickness="props.thickness"
        @mousedown.prevent
        @click="actionButtonClickHandler"
      >
        <NmorphIcon>
          <component :is="actionIcon" />
        </NmorphIcon>
      </NmorphButton>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-text-input {
  --nmorph-private-text-input-prepend-icon-indent: 8px;
  --nmorph-private-text-input-prepend-icon-size: 14px;
  --nmorph-private-text-input-prepend-icon-color: var(--nmorph-placeholder-text-color);

  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.nmorph-text-input__input-side {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.nmorph-text-input__prepend-icon {
  position: absolute;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--nmorph-private-text-input-prepend-icon-size);
  min-width: var(--nmorph-private-text-input-prepend-icon-size);
  height: var(--nmorph-private-text-input-prepend-icon-size);
  min-height: var(--nmorph-private-text-input-prepend-icon-size);
  margin-left: var(--nmorph-private-text-input-prepend-icon-indent);
  color: var(--nmorph-private-text-input-prepend-icon-color);
  pointer-events: none;

  .nmorph-icon {
    --nmorph-private-icon-color: var(--nmorph-private-text-input-prepend-icon-color);
  }
}

.nmorph-text-input__prepend-icon svg,
.nmorph-text-input__prepend-icon .nmorph-icon,
.nmorph-text-input__prepend-icon .nmorph-icon__content {
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
}

.nmorph-text-input__prepend-icon svg {
  fill: var(--nmorph-private-text-input-prepend-icon-color);
  stroke-width: 0;
}

.nmorph-text-input__prepend-icon path {
  stroke: var(--nmorph-private-text-input-prepend-icon-color);
}

.nmorph-text-input input {
  width: 100%;
  height: var(--nmorph-private-control-height);
  padding-top: var(--nmorph-private-control-text-offset-y);
  padding-bottom: 0;
  line-height: calc(var(--nmorph-private-control-height) - var(--nmorph-private-control-text-offset-y));
  text-indent: var(--nmorph-private-text-input-indentation);
  background: var(--nmorph-main-color);
  border: none;
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);
}

.nmorph-text-input--with-action input {
  padding-right: calc(var(--nmorph-private-control-height) + var(--indentation-03));
}

.nmorph-text-input input:focus {
  background: var(--nmorph-accent-color);
  outline: none;
  box-shadow: var(--nmorph-shadow-outset);
}

.nmorph-text-input.nmorph--focused {
  --nmorph-private-text-input-prepend-icon-color: var(--nmorph-focus-text-color);
}

.nmorph-text-input input:-webkit-autofill,
.nmorph-text-input input:-webkit-autofill:hover,
.nmorph-text-input input:-webkit-autofill:active {
  caret-color: var(--nmorph-text-color);
  box-shadow:
    var(--nmorph-shadow-inset),
    inset 0 0 0 1000px var(--nmorph-main-color);
  -webkit-text-fill-color: var(--nmorph-text-color);
}

.nmorph-text-input input:-webkit-autofill:focus {
  caret-color: var(--nmorph-focus-text-color);
  outline: none;
  box-shadow:
    var(--nmorph-shadow-outset),
    inset 0 0 0 1000px var(--nmorph-accent-color);
  -webkit-text-fill-color: var(--nmorph-focus-text-color);
}

.nmorph-text-input input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.nmorph-text-input__password-btn {
  position: absolute;
  right: 0;
  height: 100%;
}

.nmorph-text-input__password-btn.nmorph-button.nmorph-button--plain .nmorph-button__content {
  padding: var(--indentation-03);
  background: transparent;
  border: none;
  box-shadow: none;
}

.nmorph-text-input__password-btn.nmorph-button.nmorph-button--plain
  .nmorph-button__content:not(:disabled, [loading='true']):hover {
  background: transparent;
  border: none;
  box-shadow: none;
}

.nmorph-text-input.nmorph--thin-component .nmorph-text-input__password-btn {
  margin-top: var(--indentation-00);
}

.nmorph-text-input.nmorph--thin-component .nmorph-text-input__password-btn .nmorph-button {
  --nmorph-private-control-height: var(--thin-component);
}

.nmorph-text-input.nmorph--focused .nmorph-text-input__password-btn .nmorph-icon {
  --nmorph-private-icon-color: var(--nmorph-white-color);
}

.nmorph-text-input.nmorph--focused
  .nmorph-text-input__password-btn
  .nmorph-button:not(:disabled, [loading='true']):hover
  .nmorph-icon {
  --nmorph-private-icon-color: var(--nmorph-white-color);
}
</style>
