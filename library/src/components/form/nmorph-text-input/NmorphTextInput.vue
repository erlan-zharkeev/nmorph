<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { disabled, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import { NmorphIcon, NmorphButton, NmorphIconError, NmorphIconEye, NmorphIconEyeBlocked } from '@/components';
import { styled, css } from '@vue-styled-components/core';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

const slots = useSlots();

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
  clearable: false,
});

const { id, name, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`],
    'nmorph-text-input': [`${props.typePassword && 'password'}`],
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

interface INmorphEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
}

defineExpose({ inputDOMRef });

const emit = defineEmits<INmorphEmit>();

const actionIcon = computed(() => {
  if (props.clearable) return NmorphIconError;
  else return showPassword.value ? NmorphIconEyeBlocked : NmorphIconEye;
});

const indentation = computed(() => (slots['prepend-icon'] ? '28px' : '8px'));

const commonCSS = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  --prepend-icon-indent: 8px;

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
    margin-left: var(--prepend-icon-indent);
  }

  input {
    width: 100%;
    height: var(--height);
    border: none;
    border-radius: var(--default-border-radius);

    ${nmorphInset()}
  }

  input:focus {
    ${nmorphOutset()}

    background: var(--nmorph-accent-color);
    outline: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: var(--nmorph-text-color);
    caret-color: var(--nmorph-text-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color),
      inset 0 0 0 1000px var(--nmorph-main-color);
  }

  input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--nmorph-focus-text-color);
    caret-color: var(--nmorph-focus-text-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color),
      inset 0 0 0 1000px var(--nmorph-accent-color);
    outline: none;
  }

  input:disabled {
    ${disabled()}
  }

  .nmorph-text-input__password-btn {
    position: absolute;
    right: 0;
    height: 100%;

    .nmorph-button__content {
      padding: var(--indentation-03);
    }
  }

  &.nmorph-button.nmorph--thin-component {
    .nmorph-text-input__password-btn {
      margin-top: var(--indentation-00);

      .nmorph-button {
        --height: var(--thin-component);
      }
    }
  }

  &.nmorph-button.nmorph--focused {
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
`;

const StyledComponent = styled.div`
  ${commonCSS}
  input {
    text-indent: ${(props) => props.indentation};
  }
`;
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ indentation }">
    <div class="nmorph-text-input__input-side">
      <div v-if="slots['prepend-icon']" class="nmorph-text-input__prepend-icon">
        <slot name="prepend-icon" />
      </div>
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        :tabindex="tabindex"
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
        :disabled="props.disabled"
        class="nmorph-text-input__password-btn"
        style-type="transparent"
        width="32px"
        :height="props.height"
        @click="actionButtonClickHandler"
      >
        <NmorphIcon>
          <component :is="actionIcon" />
        </NmorphIcon>
      </NmorphButton>
    </div>
  </StyledComponent>
</template>
