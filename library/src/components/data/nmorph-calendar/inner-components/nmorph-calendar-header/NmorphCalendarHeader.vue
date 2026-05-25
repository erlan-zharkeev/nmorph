<script setup lang="ts">
import { computed } from 'vue';
import { NmorphButton, getMonthName, NmorphIcon, NmorphIconArrowLeft, NmorphIconArrowRight } from '@/components';
import { useModifiers } from '@/utils';
import type { INmorphCalendarHeaderEmit, INmorphCalendarHeaderProps } from './types';

const props = withDefaults(defineProps<INmorphCalendarHeaderProps>(), {});

const emit = defineEmits<INmorphCalendarHeaderEmit>();

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
          <NmorphIcon>
            <NmorphIconArrowLeft />
          </NmorphIcon>
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
          <NmorphIcon>
            <NmorphIconArrowRight />
          </NmorphIcon>
        </NmorphButton>
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.nmorph-calendar-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  .nmorph-calendar-header__actions {
    display: flex;
  }

  .nmorph-calendar-header__action:nth-child(2) {
    margin: 0 var(--indentation-03);
  }

  .nmorph-calendar-header__text {
    width: 160px;
    margin-right: 8px;
    font-weight: 800;
    font-size: var(--font-size-extra-large);
    line-height: var(--line-height-loose);
  }
}
</style>
