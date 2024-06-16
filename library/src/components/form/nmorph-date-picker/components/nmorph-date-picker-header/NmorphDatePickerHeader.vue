<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, getMonthName } from '@/components';

interface INmorphProps {
  date?: Date;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  date: () => new Date(),
});

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
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('prev-year')">
        <NmorphIcon name="chevron-double-down" class="nmorph-date-picker-header__chevron-double-left" />
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('prev-month')">
        <NmorphIcon name="chevron-down" class="nmorph-date-picker-header__chevron-left" />
      </NmorphButton>
    </div>
    <div class="nmorph-date-picker-header__center-side">
      <NmorphButton
        :text="String(props.date.getFullYear())"
        style-type="transparent"
        fill
        @click="emit('change-year')"
      />
      <NmorphButton
        :text="getMonthName(props.date.getMonth())"
        style-type="transparent"
        fill
        @click="emit('change-month')"
      />
    </div>
    <div class="nmorph-date-picker-header__right-side">
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('next-month')">
        <NmorphIcon name="chevron-down" class="nmorph-date-picker-header__chevron-right" />
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('next-year')">
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
    border-radius: var(--default-border-radius);
    margin: 0 var(--indentation-00);
    width: 165px;
    display: flex;
    justify-content: center;
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
