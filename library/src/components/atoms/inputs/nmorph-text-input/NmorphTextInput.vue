<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { onMounted } from 'vue';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import { computed } from 'vue';
import NmorphErrorBox from './../nmorph-error-box/NmorphErrorBox.vue';
import { createModifiers } from './../../../../utils';

interface IRule {
  pattern: RegExp;
  error: string;
}

interface IProps {
  placeholder?: string;
  label?: string;
  id: string;
  typePassword?: boolean;
  disabled?: boolean;
  modelValue?: string;
  error?: boolean;
  rules?: IRule[];
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Enter text',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  error: false,
  rules: () => [],
});

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
  (e: 'getDomRef', el: Ref<HTMLElement | null>): void;
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
</script>

<template>
  <div :class="modifiers">
    <label :for="props.id">{{ props.label }}</label>
    <div class="nmorph-text-input__main-content">
      <input
        :id="props.id"
        ref="domInputRef"
        :type="type"
        :name="props.id"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="inputValue"
        @input="handleInput"
      />
      <div v-if="props.typePassword" class="nmorph-text-input__password-btn">
        <NmorphButton style-type="transparent" @button-click="changePasswordAppearance">
          <NmorphIcon :name="showPassword ? 'eye-blocked' : 'eye'" />
        </NmorphButton>
      </div>
      <NmorphIcon v-if="touched" :name="validationIcon" :width="29" :height="29" />
    </div>
    <NmorphErrorBox :errors="errors" />
    <slot name="append" />
  </div>
</template>

<style lang="scss">
$input-transition: ease-in-out var(--transition-03) background;

.nmorph-text-input {
  --height: 32px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: $base-shadow-width;
  position: relative;
}

.nmorph-text-input input {
  width: 100%;
  border: 2px solid var(--main-bg);
  border-radius: var(--border-radius-60);
  text-indent: 4px;
  height: var(--height);
  transition: $input-transition;
  @include nmorph-combined;
  @include body-1(var(--text-01));
}

.nmorph-text-input input:focus {
  outline: none;
  transition: $input-transition;
  color: var(--text-00);
  background: var(--accent-color-00);
  box-shadow: none;
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
  top: 6px;
  right: 4px;
}

.nmorph-text-input__password-btn .nmorph-button {
  --height: 28px;
}

.nmorph-text-input--valid input:focus {
  background: var(--success-color-01);
}

.nmorph-text-input--valid .nmorph-icon {
  --color: var(--success-color-01);
  margin-left: 4px;
}

.nmorph-text-input--invalid input:focus {
  background: var(--error-color-01);
}

.nmorph-text-input--invalid .nmorph-icon {
  --color: var(--error-color-01);
  margin-left: 4px;
  margin-top: 2px;
}

.nmorph-text-input__main-content {
  display: inline-flex;
  align-items: center;
  width: 100%;
}
</style>
