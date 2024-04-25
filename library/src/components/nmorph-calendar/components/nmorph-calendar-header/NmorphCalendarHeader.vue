<script setup lang="ts">
import { computed } from 'vue';
import { NmorphButton } from '@/components';
import { useModifiers } from '@/utils';

interface IProps {
  year?: string;
  month?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  year: '2000',
  month: 'September',
});

const emit = defineEmits<IEmit>();
interface IEmit {
  (e: 'click-previous-month'): void;
  (e: 'click-today'): void;
  (e: 'click-next-month'): void;
}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-calendar-header': [],
  })
);
</script>

<template>
  <div :class="modifiers">
    <slot>
      <h2 class="nmorph-calendar-header">{{ props.year }} {{ props.month }}</h2>
      <div class="nmorph-calendar-header__actions">
        <NmorphButton
          class="nmorph-calendar-header__action"
          text="Previous month"
          @click="emit('click-previous-month')"
        />
        <NmorphButton class="nmorph-calendar-header__action" text="Today" @click="emit('click-today')" />
        <NmorphButton class="nmorph-calendar-header__action" text="Next month" @click="emit('click-next-month')" />
      </div>
    </slot>
  </div>
</template>
<style lang="scss">
.nmorph-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nmorph-calendar-header__actions {
  display: flex;
}

.nmorph-calendar-header__action:nth-child(2) {
  margin: 0 var(--indentation-03);
}
</style>
