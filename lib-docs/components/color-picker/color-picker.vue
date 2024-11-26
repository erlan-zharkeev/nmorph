<script lang="ts" setup>
interface INmorphProps {
  modelValue: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {});

interface INmorphEmit {
  (e: "update:model-value", value: string): void;
}

const emit = defineEmits<INmorphEmit>();

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  },
  { immediate: true }
);

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  value.value = target.value;
  emit("update:model-value", value.value);
};
</script>

<template>
  <div class="color-picker">
    <input type="color" :value="value" @input="inputHandler" />
  </div>
</template>

<style scoped lang="scss">
input {
  height: 30px;
  width: 30px;
}
</style>
