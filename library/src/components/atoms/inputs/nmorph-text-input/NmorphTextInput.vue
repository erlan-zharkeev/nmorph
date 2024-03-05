<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { onMounted } from 'vue';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import { computed } from 'vue';
import NmorphErrorBox from './../nmorph-error-box/NmorphErrorBox.vue';
import { createModifiers } from './../../../../utils';
import { InputHeight } from '../inputs.enums';

interface IRule {
  pattern: RegExp;
  error: string;
}

interface IProps {
  id: string;
  placeholder?: string;
  label?: string;
  typePassword?: boolean;
  disabled?: boolean;
  modelValue?: string;
  error?: boolean;
  rules?: IRule[];
  height?: keyof typeof InputHeight;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Enter text',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  error: false,
  rules: () => [],
  height: InputHeight.default,
});

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
  (e: 'getDomRef', el: Ref<HTMLElement | null>): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}

const emit = defineEmits<IEmit>();

const domInputRef: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (domInputRef.value) emit('getDomRef', domInputRef);
});

const invalid = computed(() => Boolean(errors.value.length));
const touched = ref(false);

const modifiers = computed(() =>
  createModifiers('nmorph-text-input', [
    props.label ? 'labeled' : '',
    touched.value ? (invalid.value ? 'invalid' : 'valid') : '',
    props.height,
    focused.value ? 'focused' : '',
  ])
);

const inputValue = ref(props.modelValue);
const errors = ref<string[]>([]);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
    touched.value = true;
    errors.value = props.rules.reduce((acc, rule) => {
      const match = inputValue.value.match(rule.pattern);
      if (!match) acc.push(rule.error);
      return acc;
    }, [] as string[]);
  }
);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit('update:modelValue', target.value);
};

const showPassword = ref(false);
const changePasswordAppearance = () => {
  showPassword.value = !showPassword.value;
};
const type = computed(() => {
  return props.typePassword && !showPassword.value ? 'password' : 'text';
});
const validationIcon = computed(() => (invalid.value ? 'error' : 'success'));

const focused = ref(false);

const handleFocus = () => {
  emit('focus');
  focused.value = true;
};
const handleBlur = () => {
  emit('blur');
  focused.value = false;
};

const validateIconSize = computed(() => (props.height === 'small' ? 18 : 24));
</script>

<template>
  <div :class="modifiers">
    <label :for="props.id">{{ props.label }}</label>
    <div class="nmorph-text-input__main-content">
      <div class="nmorph-text-input__input-side">
        <input
          :id="props.id"
          ref="domInputRef"
          :type="type"
          :name="props.id"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :value="inputValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div v-if="props.typePassword" class="nmorph-text-input__password-btn">
          <NmorphButton style-type="transparent" @click="changePasswordAppearance">
            <NmorphIcon :name="showPassword ? 'eye-blocked' : 'eye'" />
          </NmorphButton>
        </div>
      </div>
      <NmorphIcon
        v-if="touched"
        class="nmorph-text-input__validate-icon"
        :name="validationIcon"
        :width="validateIconSize"
        :height="validateIconSize"
      />
    </div>
    <NmorphErrorBox :errors="errors" :height="props.height" />
    <slot name="append" />
  </div>
</template>

<style lang="scss">
$input-transition: ease-in-out var(--transition-01) background;

.nmorph-text-input {
  --height: $default-input-height;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: $base-shadow-width;
}

.nmorph-text-input--small {
  --height: $small-input-height;
}

.nmorph-text-input input {
  width: 100%;
  border: 2px solid var(--main-bg);
  border-radius: var(--border-radius-60);
  text-indent: $base-input-indentation;
  height: var(--height);
  transition: $input-transition;
  @include nmorph-inset;
  @include body-1(var(--text-01));
}

.nmorph-text-input input:focus {
  outline: none;
  transition: $input-transition;
  color: var(--text-00);
  @include nmorph-outset;
  background: var(--accent-color-00);
  border: none;
}

.nmorph-text-input input:focus::placeholder {
  color: var(--text-00);
}

.nmorph-text-input input::placeholder {
  color: var(--text-01);
}

.nmorph-text-input input:disabled {
  @include disabled;
}

.nmorph-text-input label {
  @include body-1(var(--text-01));
  margin-left: 4px;
}

.nmorph-text-input--labeled input {
  margin-top: 4px;
}

.nmorph-text-input__password-btn {
  position: absolute;
  right: 3px;
}

.nmorph-text-input__input-side {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  position: relative;
}

.nmorph-text-input__password-btn .nmorph-button:hover {
  --height: 26px;
  margin-bottom: 1px;
}

.nmorph-text-input__password-btn .nmorph-button:not(:disabled):not([loading='true']):hover {
  background-color: transparent;
}

.nmorph-text-input__password-btn .nmorph-button:not(:disabled):not([loading='true']):hover .nmorph-icon {
  --color: var(--text-01);
}

.nmorph-text-input--focused .nmorph-text-input__password-btn .nmorph-icon {
  --color: var(--text-00);
}

.nmorph-text-input--focused
  .nmorph-text-input__password-btn
  .nmorph-button:not(:disabled):not([loading='true']):hover
  .nmorph-icon {
  --color: var(--text-00);
}

.nmorph-text-input--small .nmorph-text-input__password-btn .nmorph-button {
  --height: $small-input-height;
}

.nmorph-text-input input:focus .nmorph-text-input__password-btn .nmorph-button:hover {
  background: transparent;
}

.nmorph-text-input--valid input:focus {
  background: var(--success-color-01);
}

.nmorph-text-input--valid .nmorph-text-input__validate-icon {
  --color: var(--success-color-01);
}

.nmorph-text-input--invalid input:focus {
  background: var(--error-color-01);
}

.nmorph-text-input--invalid .nmorph-text-input__validate-icon {
  --color: var(--error-color-01);
}

.nmorph-text-input--invalid .nmorph-text-input__validate-icon,
.nmorph-text-input--valid .nmorph-text-input__validate-icon {
  margin-left: 8px;
}

.nmorph-text-input--invalid input:focus .nmorph-text-input__validate-icon,
.nmorph-text-input--valid input:focus .nmorph-text-input__validate-icon {
  margin-left: 12px;
}

.nmorph-text-input__main-content {
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: relative;
}
</style>
