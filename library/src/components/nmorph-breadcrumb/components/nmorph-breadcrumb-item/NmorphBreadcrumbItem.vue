<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { generateUUID, useModifiers } from '@/utils';
import { onMounted } from 'vue';
import { NmorphBreadcrumbInjection, INmorphBreadcrumbItemProps } from '../../types';

interface INmorphProps extends INmorphBreadcrumbItemProps {}
const props = withDefaults(defineProps<INmorphProps>(), {
  to: '',
  replace: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-breadcrumb-item': [],
  })
);

const breadcrumbData = inject<NmorphBreadcrumbInjection>('breadcrumb-data');
const isMounted = ref(false);
const itemId = generateUUID();

onMounted(() => {
  isMounted.value = true;
  if (!breadcrumbData) return;
  breadcrumbData.breadcrumbs.value.push({ ...props, itemId });
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="`#nmorph-breadcrumb-${breadcrumbData?.breadcrumbId}-${itemId}-element`">
      <router-link :to="to" :replace="replace" class="fill-height"> <slot /> </router-link>
    </teleport>
  </div>
</template>

<style lang="scss">
.nmorph-breadcrumb-item {
  // display: none;
}
</style>
