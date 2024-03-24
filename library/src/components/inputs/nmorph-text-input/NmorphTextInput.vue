<script setup lang="ts">
import { CommonInputProps } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { NmorphIcon, NmorphButton } from '@/components';

interface IProps extends CommonInputProps {
  placeholder?: string;
  typePassword?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  rules: () => [],
  height: 'default',
  fill: true,
});

interface IEmit {
  (e: 'update:modelValue', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}

const emit = defineEmits<IEmit>();

const modifiers = computed(() =>
  createModifiers('nmorph-text-input', [
    props.height,
    focused.value ? 'focused' : '',
    props.typePassword ? 'password' : '',
    props.fill ? 'fill' : '',
  ])
);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
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
    <div class="nmorph-text-input__input-side">
      <input
        ref="domInputRef"
        :type="type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="props.modelValue"
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
  </div>
</template>

<style lang="scss">
.nmorph-text-input {
  --height: var(--thick-component);
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  .nmorph-text-input__input-side {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    position: relative;
  }

  input {
    width: 100%;
    border: none;
    border-radius: var(--default-border-radius);
    text-indent: var(--default-indentation-input);
    height: var(--height);
    transition: ease-in-out var(--transition-01) background;
    @include nmorph-inset;
    @include body-1(var(--text-01));
  }

  input:focus {
    outline: none;
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
  --height: var(--default-thickness-component);

  .nmorph-text-input__password-btn {
    margin-top: 0px;
    .nmorph-button {
      --height: var(--default-thickness-component);
    }
  }
}

.nmorph-text-input--password {
  input {
    padding-right: var(--default-thickness-component);
  }
}
</style>
