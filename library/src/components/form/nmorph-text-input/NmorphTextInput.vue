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
  label: '',
  typePassword: false,
  disabled: false,
  modelValue: '',
  rules: () => [],
  height: 'basic',
  clearable: false,
  indentation: '',
  inputAttrs: () => ({}),
});

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`],
    'nmorph-text-input': [
      `${props.typePassword && 'password'}`,
      `${(props.typePassword || props.clearable) && 'with-action'}`,
    ],
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
  </div>
</template>
