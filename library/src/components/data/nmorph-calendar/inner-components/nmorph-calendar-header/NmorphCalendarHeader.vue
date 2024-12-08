<script setup lang="ts">
import { computed } from 'vue';
import { NmorphButton, getMonthName, NmorphIcon, NmorphIconArrowLeft, NmorphIconArrowRight } from '@/components';
import { title1, useModifiers } from '@/utils';
import { styled, css } from '@vue-styled-components/core'

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

const commonCSS = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  .nmorph-calendar-header__actions {
    display: flex;
  }

  .nmorph-calendar-header__action:nth-child(2) {
    margin: 0 var(--indentation-03);
  }

  .nmorph-calendar-header__text {
    ${title1()}
    margin-right: 8px;
    width: 160px;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <slot>
      <div class="nmorph-calendar-header__text">{{ props.year }} {{ getMonthName(props.month) }}</div>
      <div class="nmorph-calendar-header__actions">
        <NmorphButton v-if="showPreviousMonthButton" class="nmorph-calendar-header__action"
          @click="emit('click-previous-month')">
          <NmorphIcon>
            <NmorphIconArrowLeft />
          </NmorphIcon>
        </NmorphButton>
        <NmorphButton v-if="showTodayButton" class="nmorph-calendar-header__action" text="Today"
          @click="emit('click-today')" />
        <NmorphButton v-if="showNextMonthButton" class="nmorph-calendar-header__action"
          @click="emit('click-next-month')">
          <NmorphIcon>
            <NmorphIconArrowRight />
          </NmorphIcon>
        </NmorphButton>
      </div>
    </slot>
  </StyledComponent>
</template>
