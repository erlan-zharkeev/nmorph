<script setup lang="ts">
import { computed } from 'vue';
import { NmorphButton, getMonthName } from '@/components';
import { useModifiers } from '@/utils';

interface INmorphProps {
  year: number;
  month: number;
  showPreviousMonthButton: boolean;
  showNextMonthButton: boolean;
  showTodayButton: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {});

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
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
      <h2 class="nmorph-calendar-header">{{ props.year }} {{ getMonthName(props.month) }}</h2>
      <div class="nmorph-calendar-header__actions">
        <NmorphButton
          v-if="showPreviousMonthButton"
          class="nmorph-calendar-header__action"
          text="Previous month"
          @click="emit('click-previous-month')"
        />
        <NmorphButton
          v-if="showTodayButton"
          class="nmorph-calendar-header__action"
          text="Today"
          @click="emit('click-today')"
        />
        <NmorphButton
          v-if="showNextMonthButton"
          class="nmorph-calendar-header__action"
          text="Next month"
          @click="emit('click-next-month')"
        />
      </div>
    </slot>
  </div>
</template>
<style lang="scss">
.nmorph-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nmorph-calendar-header__actions {
  display: flex;
}

.nmorph-calendar-header__action:nth-child(2) {
  margin: 0 var(--indentation-03);
}
</style>
