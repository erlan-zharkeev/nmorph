<script setup lang="ts">
import { computed } from 'vue';
import { nmorphInset, useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconChevronDoubleDown, NmorphIconChevronDown, getMonthName } from '@/components';
import { styled, css } from '@vue-styled-components/core'

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

const commonCSS = css`
  display: flex;
  justify-content: space-between;
  padding: var(--indentation-03);

  .nmorph-date-picker-header__center-side {
    display: flex;
    justify-content: center;
    width: 165px;
    margin: 0 var(--indentation-00);
    border-radius: var(--default-border-radius);
    ${nmorphInset()}
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
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <div class="nmorph-date-picker-header__left-side">
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('prev-year')"
        :tabindex="-1">
        <NmorphIcon class="nmorph-date-picker-header__chevron-double-left">
          <NmorphIconChevronDoubleDown />
        </NmorphIcon>
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('prev-month')"
        :tabindex="-1">
        <NmorphIcon class="nmorph-date-picker-header__chevron-left">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
    <div class="nmorph-date-picker-header__center-side">
      <NmorphButton :text="props.year" style-type="transparent" fill @click="emit('change-year')" :tabindex="-1" />
      <NmorphButton :text="getMonthName(props.month)" style-type="transparent" fill @click="emit('change-month')"
        :tabindex="-1" />
    </div>
    <div class="nmorph-date-picker-header__right-side">
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('next-month')"
        :tabindex="-1">
        <NmorphIcon class="nmorph-date-picker-header__chevron-right">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
      <NmorphButton class="nmorph-date-picker-header__action-btn" style-type="transparent" @click="emit('next-year')"
        :tabindex="-1">
        <NmorphIcon class="nmorph-date-picker-header__chevron-double-right">
          <NmorphIconChevronDoubleDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
  </StyledComponent>
</template>
