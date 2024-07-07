<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { Ref, computed, onMounted, ref, watch } from 'vue';
import { NmorphIcon } from '@/components';

type ValueType = boolean | string | number;

interface INmorphProps extends Omit<INmorphCommonInputProps, 'fill'> {
  modelValue?: ValueType;
  loading?: boolean;
  activeValue?: ValueType;
  inactiveValue?: ValueType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  height: 'default',
  activeValue: true,
  inactiveValue: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-switch': [
      `${props.disabled && 'disabled'}`,
      `${initialValue.value ? 'on' : 'off'}`,
      `${props.loading && 'loading'}`,
    ],
  })
);

const emit = defineEmits<INmorphEmit>();

const initialValue = ref<boolean>(props.modelValue === props.activeValue);

const changeHandler = () => {
  if (props.disabled) return;
  initialValue.value = !initialValue.value;
  const value = initialValue.value ? props.activeValue : props.inactiveValue;
  emit('update:modelValue', value);
};

interface INmorphEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElementType>): void;
  (e: 'update:modelValue', val: ValueType): void;
}
const inputDOMRef = ref<NmorphDomElementType>(null);
onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

watch(
  () => props.modelValue,
  (newValue) => {
    initialValue.value = newValue === props.activeValue;
  }
);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-switch__content" @click="changeHandler">
      <input
        ref="inputDOMRef"
        type="checkbox"
        :value="initialValue"
        :disabled="props.disabled"
        class="nmorph-native-input"
      />
      <div class="nmorph-switch-thumb">
        <NmorphIcon v-if="props.loading" name="loader" width="16px" height="16px" />
        <slot v-else-if="initialValue" name="thumb-on">{{ $t('NmorphSwitch.on') }}</slot>
        <slot v-else name="thumb-off">{{ $t('NmorphSwitch.off') }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-switch {
  --height: 20px;
  --offset: 2px;
  --thumb-height: 16px;

  width: 40px;
  height: var(--height);
  overflow: hidden;
  border-radius: var(--border-radius-999);
  cursor: pointer;

  .nmorph-switch__content {
    position: relative;
    height: 100%;
    font-size: 8px;
    border-radius: var(--border-radius-999);
    transition:
      background ease-in-out var(--transition-02),
      box-shadow ease-in-out var(--transition-02);

    @include nmorph-inset;
  }

  input {
    width: 100%;
    height: var(--height);
    visibility: hidden;
    opacity: 0;
  }

  .nmorph-switch-thumb {
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    width: var(--thumb-height);
    height: var(--thumb-height);
    border-radius: var(--border-radius-999);
    transition:
      left ease-in-out var(--transition-02),
      box-shadow ease-in-out var(--transition-02);

    @include flex-full-center;
    @include nmorph-outset;
  }
}

@mixin nmorph-switch-disabled {
  @include disabled;

  .nmorph-switch__input-content {
    pointer-events: none;
  }
}

.nmorph-switch--disabled {
  @include nmorph-switch-disabled;
}

.nmorph-switch--on {
  .nmorph-switch__content {
    background: var(--nmorph-accent-color);
    box-shadow: none;
  }

  .nmorph-switch-thumb {
    left: calc(100% - 16px - 2px);
    box-shadow: none;
  }
}

.nmorph-switch--loading {
  @include nmorph-switch-disabled;
}
</style>
