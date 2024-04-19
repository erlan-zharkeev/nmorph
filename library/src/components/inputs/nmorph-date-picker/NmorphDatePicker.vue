<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCommonInputProps, NmorphComponentHeight } from '@/types/common';

interface IProps extends Omit<NmorphCommonInputProps, 'fill'> {}
const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  height: 'default',
});

const emit = defineEmits<IEmit>();
interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-date-picker': [`${props.disabled && 'disabled'}`],
  })
);
</script>
<template>
  <div :class="modifiers">
    <div class="nmorph-date-picker__content">
      <div class="nmorph-date-picker__input">
        <input type="date" />
      </div>
    </div>
    <!-- <NmorphDropdown></NmorphDropdown> -->
  </div>
</template>

<style lang="scss">
.nmorph-date-picker {
  input {
    display: none;
  }
}
</style>
