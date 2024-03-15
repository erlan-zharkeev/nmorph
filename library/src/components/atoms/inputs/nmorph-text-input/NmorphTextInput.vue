<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { onMounted } from 'vue';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import { computed } from 'vue';
import NmorphErrorBox from './../../nmorph-error-box/NmorphErrorBox.vue';
import { createModifiers } from './../../../../utils';
import { CommonInputProps, ControlComponentHeight } from './../../../common-component.enums';
import { ITextValidationRule, useValidation } from './../../../../hooks/useValidation';
import NmorphValidationIcon from './../common/NmorphValidationIcon.vue';

interface IProps extends CommonInputProps {
  placeholder?: string;
  typePassword?: boolean;
  modelValue?: string;
  rules?: ITextValidationRule[];
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  rules: () => [],
  height: ControlComponentHeight['thick'],
  showValidationIcon: true,
  staticErrorBoxSpace: false,
  fill: true,
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

const modifiers = computed(() =>
  createModifiers('nmorph-text-input', [
    props.label ? 'labeled' : '',
    showValidation.value ? (valid.value ? 'valid' : 'invalid') : '',
    props.height,
    focused.value ? 'focused' : '',
    props.typePassword ? 'password' : '',
  ])
);

const inputValue = ref(props.modelValue);

const { showValidation, valid, errors } = useValidation({ rules: props.rules, inputValue });

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
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

const focused = ref(false);

const handleFocus = () => {
  emit('focus');
  focused.value = true;
};
const handleBlur = () => {
  emit('blur');
  focused.value = false;
};
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
          width="32px"
          bg-transparent-on-hover
          @click="changePasswordAppearance"
        >
          <NmorphIcon :name="showPassword ? 'eye-blocked' : 'eye'" />
        </NmorphButton>
      </div>
      <NmorphValidationIcon :valid="valid" :show="showValidation" />
    </div>
    <NmorphErrorBox v-if="props.staticErrorBoxSpace || showValidation" :errors="errors" :height="props.height" />
    <slot name="append" />
  </div>
</template>

<style lang="scss">
$input-transition: ease-in-out var(--transition-01) background;

.nmorph-text-input {
  --height: #{$thick-input-height};
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
    border: none;
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

.nmorph-text-input--fill {
  width: 100%;
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
    background: var(--success-color-00);
  }
}

.nmorph-text-input--invalid {
  input:focus {
    background: var(--error-color-00);
  }
}

.nmorph-text-input--thin {
  --height: #{$default-input-height};
  label {
    @include caption-1-strong(var(--text-01));
  }
  .nmorph-text-input__password-btn {
    margin-top: 0px;
    .nmorph-button {
      --height: #{$default-input-height};
    }
  }
}

.nmorph-text-input--password {
  input {
    padding-right: #{$default-input-height};
  }
}
</style>
