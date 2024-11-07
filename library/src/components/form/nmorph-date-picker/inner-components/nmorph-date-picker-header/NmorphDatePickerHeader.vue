<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, getMonthName } from '@/components';

interface INmorphProps {
  year: number;
  month: number;
}
const props = withDefaults(defineProps<INmorphProps>(), {});

interface INmorphEmit {
  (e: 'prev-month'): void;
  (e: 'next-month'): void;
  (e: 'prev-year'): void;
  (e: 'next-year'): void;
  (e: 'change-year'): void;
  (e: 'change-month'): void;
}

const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-date-picker-header': [],
  })
);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-date-picker-header__left-side">
      <NmorphButton
        class="nmorph-date-picker-header__action-btn"
        style-type="transparent"
        @click="emit('prev-year')"
        :tabindex="-1"
      >
        <NmorphIcon name="chevron-double-down" class="nmorph-date-picker-header__chevron-double-left" />
      </NmorphButton>
      <NmorphButton
        class="nmorph-date-picker-header__action-btn"
        style-type="transparent"
        @click="emit('prev-month')"
        :tabindex="-1"
      >
        <NmorphIcon name="chevron-down" class="nmorph-date-picker-header__chevron-left" />
      </NmorphButton>
    </div>
    <div class="nmorph-date-picker-header__center-side">
      <NmorphButton :text="props.year" style-type="transparent" fill @click="emit('change-year')" :tabindex="-1" />
      <NmorphButton
        :text="getMonthName(props.month)"
        style-type="transparent"
        fill
        @click="emit('change-month')"
        :tabindex="-1"
      />
    </div>
    <div class="nmorph-date-picker-header__right-side">
      <NmorphButton
        class="nmorph-date-picker-header__action-btn"
        style-type="transparent"
        @click="emit('next-month')"
        :tabindex="-1"
      >
        <NmorphIcon name="chevron-down" class="nmorph-date-picker-header__chevron-right" />
      </NmorphButton>
      <NmorphButton
        class="nmorph-date-picker-header__action-btn"
        style-type="transparent"
        @click="emit('next-year')"
        :tabindex="-1"
      >
        <NmorphIcon name="chevron-double-down" class="nmorph-date-picker-header__chevron-double-right" />
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
    border-radius: var(--default-border-radius);

    @include nmorph-inset;
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
