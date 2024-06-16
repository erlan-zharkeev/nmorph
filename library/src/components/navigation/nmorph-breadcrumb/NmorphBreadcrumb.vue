<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateUUID, useModifiers } from '@/utils';
import { provide } from 'vue';
import { NmorphBreadcrumbInjection, NmorphBreadcrumbsType } from './types';

interface INmorphProps {
  separator?: string;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  separator: '/',
});

const breadcrumbs: NmorphBreadcrumbsType = ref([]);

const breadcrumbId = generateUUID();
provide<NmorphBreadcrumbInjection>('breadcrumb-data', { breadcrumbs, breadcrumbId });

const modifiers = computed(() =>
  useModifiers({
    'nmorph-breadcrumb': [],
  })
);
</script>
<template>
  <div :class="modifiers">
    <slot />
    <div v-for="(breadcrumbData, idx) in breadcrumbs" :key="idx" class="nmorph-breadcrumb__content">
      <div
        :id="`nmorph-breadcrumb-${breadcrumbId}-${breadcrumbData.itemId}-element`"
        class="nmorph-breadcrumb__element"
      />
      <div v-if="idx < breadcrumbs.length - 1" class="nmorph-breadcrumb__separator">
        {{ props.separator }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-breadcrumb {
  display: flex;

  .nmorph-breadcrumb__content {
    display: flex;
  }

  .nmorph-breadcrumb__separator {
    margin: 0 var(--indentation-03);
  }
}
</style>
