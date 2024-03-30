<script setup lang="ts">
import { CommonInputProps, NmorphComponentHeight } from '@/types/common.enums';
import { getModifiers } from '@/utils';
import { Ref, computed, onMounted, ref } from 'vue';
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

const modifiers = computed(() =>
  getModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`, `${props.fill && 'fill'}`],
    'nmorph-text-input': [`${props.typePassword && 'password'}`],
  })
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

const inputDOMRef = ref<HTMLElement | null>(null);

interface IEmit {
  (e: 'inputDOMRef', val: Ref<HTMLElement | null>): void;
  (e: 'update:modelValue', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}

const emit = defineEmits<IEmit>();

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-text-input__input-side">
      <input
        ref="inputDOMRef"
        class="nmorph-native-input"
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
        :height="props.height"
        @click="changePasswordAppearance"
      >
        <NmorphIcon :name="showPassword ? 'eye-blocked' : 'eye'" />
      </NmorphButton>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-text-input {
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
  }

  input:focus {
    outline: none;
    @include nmorph-outset;
    background: var(--accent-color-00);
  }

  input:disabled {
    @include disabled;
  }

  .nmorph-text-input__password-btn {
    position: absolute;
    height: 100%;
    right: 0;
    .nmorph-button__content {
      padding: var(--indentation-03);
    }
  }
}

.nmorph-button.nmorph--thin-component {
  .nmorph-text-input__password-btn {
    margin-top: var(--indentation-00);
    .nmorph-button {
      --height: var(--thin-component);
    }
  }
}

.nmorph-button.nmorph--focused {
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
</style>
