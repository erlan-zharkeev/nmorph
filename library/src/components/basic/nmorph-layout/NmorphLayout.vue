<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, useMergedAttrs, useModifiers } from '@/utils';
import type { INmorphLayoutProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<INmorphLayoutProps>(), {
  tag: 'section',
  gap: 0,
  asideWidth: '240px',
  asidePosition: 'left',
  fullHeight: false,
});

const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-layout': [`aside-${props.asidePosition}`, props.fullHeight && 'full-height'],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-layout-gap': props.gap,
    '--nmorph-private-layout-aside-width': props.asideWidth,
  })
);
const rootAttrs = useMergedAttrs(modifiers, styles);
</script>

<template>
  <component :is="props.tag" v-bind="rootAttrs">
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
  gap: var(--nmorph-private-layout-gap);
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
    gap: var(--nmorph-private-layout-gap);
    min-width: 0;
    min-height: 0;
  }

  .nmorph-layout__aside {
    flex: 0 0 var(--nmorph-private-layout-aside-width);
    width: var(--nmorph-private-layout-aside-width);
    min-width: 0;
  }

  .nmorph-layout__main {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
  }
}
</style>
