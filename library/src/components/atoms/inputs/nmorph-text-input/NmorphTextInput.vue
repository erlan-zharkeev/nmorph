<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { onMounted } from 'vue';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import { computed } from 'vue';
import NmorphErrorBox from './../nmorph-error-box/NmorphErrorBox.vue';
import { createModifiers } from './../../../../utils';
import { ControlComponentHeight } from './../../../common-component.enums';

interface IRule {
  pattern: RegExp;
  error: string;
}

interface IProps {
  placeholder?: string;
  label?: string;
  typePassword?: boolean;
  disabled?: boolean;
  modelValue?: string;
  error?: boolean;
  rules?: IRule[];
  height?: keyof typeof ControlComponentHeight;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  error: false,
  rules: () => [],
  height: ControlComponentHeight['default-height'],
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
const showValidationElements = computed(() => touched.value && Boolean(props.rules.length));

const modifiers = computed(() =>
  createModifiers('nmorph-text-input', [
    props.label ? 'labeled' : '',
    showValidationElements.value ? (invalid.value ? 'invalid' : 'valid') : '',
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

const validateIconSize = computed(() => (props.height === 'small-height' ? '18px' : '24px'));
</script>

<template>
  <div :class="modifiers">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="nmorph-text-input__main-content">
      <div class="nmorph-text-input__input-side">
        <input
          ref="domInputRef"
          :type="type"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :value="inputValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <NmorphButton
          v-if="props.typePassword"
          class="nmorph-text-input__password-btn"
          style-type="transparent"
          height="small-height"
          bg-transparent-on-hover
          @click="changePasswordAppearance"
        >
          <NmorphIcon :name="showPassword ? 'eye-blocked' : 'eye'" />
        </NmorphButton>
      </div>
      <NmorphIcon
        v-if="showValidationElements"
        class="nmorph-text-input__validate-icon"
        :name="validationIcon"
        :width="validateIconSize"
        :height="validateIconSize"
      />
    </div>
    <NmorphErrorBox v-if="showValidationElements" :errors="errors" :height="props.height" />
    <slot name="append" />
  </div>
</template>

<style lang="scss">
$input-transition: ease-in-out var(--transition-01) background;

.nmorph-text-input {
  --height: #{$default-input-height};
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  .nmorph-text-input__main-content {
    display: inline-flex;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .nmorph-text-input__input-side {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    position: relative;
  }

  label {
    @include body-1-strong(var(--text-01));
  }

  input {
    width: 100%;
    border-width: 0;
    border-radius: var(--default-border-radius);
    text-indent: $base-input-indentation;
    height: var(--height);
    transition: $input-transition;
    @include nmorph-inset;
    @include body-1(var(--text-01));
  }

  input:focus {
    outline: none;
    transition: $input-transition;
    color: var(--text-00);
    @include nmorph-outset;
    background: var(--accent-color-00);
    border: none;
  }

  input:focus::placeholder {
    color: var(--text-00);
  }

  input::placeholder {
    color: var(--text-01);
  }

  input:disabled {
    @include disabled;
  }

  .nmorph-text-input__password-btn {
    position: absolute;
    height: 100%;
    right: 0;
    .nmorph-button__content {
      padding: 8px;
    }
  }
}

.nmorph-text-input--labeled {
  .nmorph-text-input__main-content {
    margin-top: 4px;
  }
}

.nmorph-text-input--focused {
  .nmorph-text-input__password-btn {
    .nmorph-icon {
      --color: var(--text-00);
    }
    .nmorph-button:not(:disabled):not([loading='true']):hover {
      .nmorph-icon {
        --color: var(--text-00);
      }
    }
  }
}

.nmorph-text-input--valid {
  input:focus {
    background: var(--success-color-01);
    .nmorph-text-input__validate-icon {
      margin-left: 12px;
    }
  }
  .nmorph-text-input__validate-icon {
    --color: var(--success-color-01);
    margin-left: 8px;
  }
}

.nmorph-text-input--invalid {
  input:focus {
    background: var(--error-color-01);
    .nmorph-text-input__validate-icon {
      margin-left: 12px;
    }
  }
  .nmorph-text-input__validate-icon {
    --color: var(--error-color-01);
    margin-left: 8px;
  }
}

.nmorph-text-input--small-height {
  --height: #{$small-input-height};
  label {
    @include caption-1-strong(var(--text-01));
  }
  .nmorph-text-input__password-btn {
    margin-top: 0px;
    .nmorph-button {
      --height: #{$small-input-height};
    }
  }
}
</style>
