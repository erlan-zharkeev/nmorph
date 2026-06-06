<script setup lang="ts">
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconChevronDoubleDown,
  NmorphIconChevronDown,
  getMonthName,
} from '@/components';
import type { INmorphDatePickerHeaderEmit, INmorphDatePickerHeaderProps } from './types';

const props = defineProps<INmorphDatePickerHeaderProps>();

const emit = defineEmits<INmorphDatePickerHeaderEmit>();
</script>

<template>
  <div class="nmorph-date-picker-header">
    <div class="nmorph-date-picker-header__left-side">
      <NmorphButton class="nmorph-date-picker-header__action-btn" :tabindex="-1" @click="emit('prev-year')">
        <NmorphIcon class="nmorph-date-picker-header__chevron-double-left">
          <NmorphIconChevronDoubleDown />
        </NmorphIcon>
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" :tabindex="-1" @click="emit('prev-month')">
        <NmorphIcon class="nmorph-date-picker-header__chevron-left">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
    <div class="nmorph-date-picker-header__center-side">
      <NmorphButton :text="props.year" :tabindex="-1" fill @click="emit('change-year')" />
      <NmorphButton :text="getMonthName(props.month)" :tabindex="-1" fill @click="emit('change-month')" />
    </div>
    <div class="nmorph-date-picker-header__right-side">
      <NmorphButton class="nmorph-date-picker-header__action-btn" :tabindex="-1" @click="emit('next-month')">
        <NmorphIcon class="nmorph-date-picker-header__chevron-right">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" :tabindex="-1" @click="emit('next-year')">
        <NmorphIcon class="nmorph-date-picker-header__chevron-double-right">
          <NmorphIconChevronDoubleDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-date-picker-header {
  display: flex;
  justify-content: space-between;
  padding: var(--indentation-03);

  .nmorph-date-picker-header__center-side {
    display: flex;
    justify-content: center;
    width: 165px;
    margin: 0 var(--indentation-00);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-date-picker-header__action-btn {
    margin: 0 var(--indentation-02);

    .nmorph-button__content {
      padding: 0 var(--indentation-02);
    }
  }

  .nmorph-date-picker-header__chevron-double-left {
    rotate: 90deg;
  }

  .nmorph-date-picker-header__chevron-double-right {
    rotate: -90deg;
  }

  .nmorph-date-picker-header__chevron-left {
    rotate: 90deg;
  }

  .nmorph-date-picker-header__chevron-right {
    rotate: -90deg;
  }
}
</style>
