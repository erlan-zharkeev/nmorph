<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types/common';
import { useModifiers } from '@/utils';
import { Ref, computed, onMounted, ref } from 'vue';
import { NmorphIcon } from '@/components';

interface INmorphProps extends Omit<INmorphCommonInputProps, 'fill'> {
  modelValue?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  height: 'default',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-switch': [
      `${props.disabled && 'disabled'}`,
      `${props.modelValue ? 'on' : 'off'}`,
      `${props.loading && 'loading'}`,
    ],
  })
);

const emit = defineEmits<INmorphEmit>();

const initialValue = ref(props.modelValue);

const changeHandler = () => {
  if (props.disabled) return;
  initialValue.value = !initialValue.value;
  emit('update:modelValue', initialValue.value);
};

interface INmorphEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElementType>): void;
  (e: 'update:modelValue', val: boolean): void;
}
const inputDOMRef = ref<NmorphDomElementType>(null);
onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-switch__content" @click="changeHandler">
      <input ref="inputDOMRef" type="checkbox" :value="initialValue" :disabled="props.disabled" />
      <div class="nmorph-switch-thumb">
        <NmorphIcon v-if="props.loading" name="loader" width="16px" height="16px" />
        <slot v-else-if="props.modelValue" name="thumb-on" />
        <slot v-else name="thumb-off" />
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
  border-radius: var(--border-radius-circular);
  cursor: pointer;

  .nmorph-switch__content {
    position: relative;
    height: 100%;
    border-radius: var(--border-radius-circular);
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
    border-radius: var(--border-radius-circular);
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
    background: var(--accent-color-00);
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
