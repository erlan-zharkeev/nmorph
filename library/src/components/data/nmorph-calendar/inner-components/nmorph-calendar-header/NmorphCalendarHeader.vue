<script setup lang="ts">
import { computed } from 'vue';
import { NmorphButton, getMonthName, NmorphIcon } from '@/components';
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
      <div class="nmorph-calendar-header__text">{{ props.year }} {{ getMonthName(props.month) }}</div>
      <div class="nmorph-calendar-header__actions">
        <NmorphButton
          v-if="showPreviousMonthButton"
          class="nmorph-calendar-header__action"
          @click="emit('click-previous-month')"
        >
          <NmorphIcon name="arrow-left" />
        </NmorphButton>
        <NmorphButton
          v-if="showTodayButton"
          class="nmorph-calendar-header__action"
          text="Today"
          @click="emit('click-today')"
        />
        <NmorphButton
          v-if="showNextMonthButton"
          class="nmorph-calendar-header__action"
          @click="emit('click-next-month')"
        >
          <NmorphIcon name="arrow-right" />
        </NmorphButton>
      </div>
    </slot>
  </div>
</template>
<style lang="scss">
.nmorph-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.nmorph-calendar-header__actions {
  display: flex;
}

.nmorph-calendar-header__action:nth-child(2) {
  margin: 0 var(--indentation-03);
}

.nmorph-calendar-header__text {
  @include title-1;
  margin-right: 8px;
  width: 160px;
}
</style>
