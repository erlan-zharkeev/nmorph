<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import { NmorphIcon, NmorphButton, NmorphIconError, NmorphIconEye, NmorphIconEyeBlocked } from '@/components';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

const slots = useSlots();

interface INmorphProps extends INmorphCommonInputProps {
  placeholder?: string;
  typePassword?: boolean;
  modelValue?: string;
  clearable?: boolean;
  indentation?: string;
  inputAttrs?: Record<string, string | number | boolean | undefined>;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placeholder: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  height: 'basic',
  clearable: false,
  indentation: '',
  inputAttrs: () => ({}),
});

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], focused.value && 'focused'],
    'nmorph-text-input': [props.typePassword && 'password', (props.typePassword || props.clearable) && 'with-action'],
  })
);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:model-value', target.value);
};

const showPassword = ref(false);

const actionButtonClickHandler = () => {
  if (props.clearable) {
    emit('update:model-value', '');
  } else {
    showPassword.value = !showPassword.value;
  }
};

const type = computed(() => {
  return props.typePassword && !showPassword.value && !props.clearable ? 'password' : 'text';
});

const focused = ref(false);

const handleFocus = () => {
  emit('focus');
  focused.value = true;
};
const handleBlur = () => {
  emit('blur');
  focused.value = false;
};

const inputDOMRef = ref<NmorphDomElementType>(null);

const focus = () => {
  inputDOMRef.value?.focus();
};

const blur = () => {
  inputDOMRef.value?.blur();
};

const select = () => {
  (inputDOMRef.value as HTMLInputElement | null)?.select();
};

interface INmorphEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
  (e: 'keydown', event: KeyboardEvent): void;
}

defineExpose({ inputDOMRef, focus, blur, select });

const emit = defineEmits<INmorphEmit>();

const actionIcon = computed(() => {
  if (props.clearable) return NmorphIconError;
  else return showPassword.value ? NmorphIconEyeBlocked : NmorphIconEye;
});

const indentation = computed(() => props.indentation || (slots['prepend-icon'] ? '28px' : '8px'));
const styles = computed(() => ({ '--nmorph-text-input-indentation': indentation.value }));
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
        :value="props.modelValue"
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
        style-type="transparent"
        width="32px"
        :height="props.height"
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
  --prepend-icon-indent: 8px;
  --prepend-icon-size: 14px;

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
  width: var(--prepend-icon-size);
  min-width: var(--prepend-icon-size);
  height: var(--prepend-icon-size);
  min-height: var(--prepend-icon-size);
  margin-left: var(--prepend-icon-indent);
  pointer-events: none;
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
  fill: var(--nmorph-text-color);
  stroke-width: 0;
}

.nmorph-text-input__prepend-icon path {
  stroke: var(--nmorph-text-color);
}

.nmorph-text-input input {
  width: 100%;
  height: var(--height);
  text-indent: var(--nmorph-text-input-indentation);
  border: none;
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);
}

.nmorph-text-input--with-action input {
  padding-right: calc(var(--height) + var(--indentation-03));
}

.nmorph-text-input input:focus {
  background: var(--nmorph-accent-color);
  outline: none;
  box-shadow: var(--nmorph-shadow-outset);
}

.nmorph-text-input.nmorph--focused .nmorph-text-input__prepend-icon svg {
  fill: var(--nmorph-focus-text-color);
}

.nmorph-text-input.nmorph--focused .nmorph-text-input__prepend-icon path {
  stroke: var(--nmorph-focus-text-color);
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

.nmorph-text-input__password-btn .nmorph-button__content {
  padding: var(--indentation-03);
}

.nmorph-text-input.nmorph-button.nmorph--thin-component .nmorph-text-input__password-btn {
  margin-top: var(--indentation-00);
}

.nmorph-text-input.nmorph-button.nmorph--thin-component .nmorph-text-input__password-btn .nmorph-button {
  --height: var(--thin-component);
}

.nmorph-text-input.nmorph-button.nmorph--focused .nmorph-text-input__password-btn .nmorph-icon {
  --color: var(--nmorph-white-color);
}

.nmorph-text-input.nmorph-button.nmorph--focused
  .nmorph-text-input__password-btn
  .nmorph-button:not(:disabled, [loading='true']):hover
  .nmorph-icon {
  --color: var(--nmorph-white-color);
}
</style>
