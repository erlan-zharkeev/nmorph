<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { Ref, computed, onMounted, ref, useSlots } from 'vue';
import { NmorphIcon, NmorphButton } from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  placeholder?: string;
  typePassword?: boolean;
  modelValue?: string;
  clearable?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placeholder: '',
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  rules: () => [],
  height: 'default',
  fill: true,
  clearable: false,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`, `${props.fill && 'fill'}`],
    'nmorph-text-input': [`${props.typePassword && 'password'}`],
  })
);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const showPassword = ref(false);

const actionButtonClickHandler = () => {
  if (props.clearable) {
    emit('update:modelValue', '');
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

interface INmorphEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElementType>): void;
  (e: 'update:modelValue', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
}

const emit = defineEmits<INmorphEmit>();

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

const actionIcon = computed(() => {
  if (props.clearable) return 'error';
  else return showPassword.value ? 'eye-blocked' : 'eye';
});

const indentation = computed(() => (slots['prepend-icon'] ? '28px' : '8px'));

const slots = useSlots();
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-text-input__input-side">
      <div v-if="slots['prepend-icon']" class="nmorph-text-input__prepend-icon">
        <slot name="prepend-icon" />
      </div>
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
        @keyup.enter="emit('on-enter')"
      />
      <NmorphButton
        v-if="props.typePassword || props.clearable"
        class="nmorph-text-input__password-btn"
        style-type="transparent"
        width="32px"
        bg-transparent-on-hover
        :height="props.height"
        @click="actionButtonClickHandler"
      >
        <NmorphIcon :name="actionIcon" />
      </NmorphButton>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-text-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  --search-indent: 8px;

  .nmorph-text-input__input-side {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  .nmorph-text-input__prepend-icon {
    position: absolute;
    left: 0;
    margin-left: 8px;
  }

  input {
    width: 100%;
    height: var(--height);
    text-indent: v-bind(indentation);
    border: none;
    border-radius: var(--default-border-radius);

    @include nmorph-inset;
  }

  input:focus {
    @include nmorph-outset;

    background: var(--nmorph-accent-color);
    outline: none;
  }

  input:disabled {
    @include disabled;
  }

  .nmorph-text-input__password-btn {
    position: absolute;
    right: 0;
    height: 100%;

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
      --color: var(--nmorph-white-color);
    }

    .nmorph-button:not(:disabled, [loading='true']):hover {
      .nmorph-icon {
        --color: var(--nmorph-white-color);
      }
    }
  }
}
</style>
