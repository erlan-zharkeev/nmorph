<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';

type NmorphLayoutAsidePositionType = 'left' | 'right';

interface INmorphProps {
  tag?: string;
  gap?: number | string;
  asideWidth?: number | string;
  asidePosition?: NmorphLayoutAsidePositionType;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  tag: 'section',
  gap: 0,
  asideWidth: '240px',
  asidePosition: 'left',
  fullHeight: false,
});

const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-layout': [`aside-${props.asidePosition}`, `${props.fullHeight && 'full-height'}`],
  })
);

const getCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-layout-gap': getCssSize(props.gap),
  '--nmorph-layout-aside-width': getCssSize(props.asideWidth),
}));
</script>

<template>
  <component :is="props.tag" :class="modifiers" :style="styles">
    <header v-if="slots.header" class="nmorph-layout__header">
      <slot name="header" />
    </header>
    <div class="nmorph-layout__body">
      <aside v-if="slots.aside && props.asidePosition === 'left'" class="nmorph-layout__aside">
        <slot name="aside" />
      </aside>
      <main class="nmorph-layout__main">
        <slot />
      </main>
      <aside v-if="slots.aside && props.asidePosition === 'right'" class="nmorph-layout__aside">
        <slot name="aside" />
      </aside>
    </div>
    <footer v-if="slots.footer" class="nmorph-layout__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style lang="scss">
.nmorph-layout {
  display: flex;
  flex-direction: column;
  gap: var(--nmorph-layout-gap);
  box-sizing: border-box;
  width: 100%;
  min-width: 0;

  &--full-height {
    min-height: 100%;
  }

  .nmorph-layout__header,
  .nmorph-layout__footer {
    flex: 0 0 auto;
    min-width: 0;
  }

  .nmorph-layout__body {
    display: flex;
    flex: 1 1 auto;
    gap: var(--nmorph-layout-gap);
    min-width: 0;
    min-height: 0;
  }

  .nmorph-layout__aside {
    flex: 0 0 var(--nmorph-layout-aside-width);
    width: var(--nmorph-layout-aside-width);
    min-width: 0;
  }

  .nmorph-layout__main {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
  }
}
</style>
