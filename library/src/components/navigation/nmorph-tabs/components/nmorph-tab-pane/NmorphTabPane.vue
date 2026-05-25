<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue';
import { useModifiers } from '@/utils';
import { getTabContentId, getTabLabelId } from '@/components';
import type { INmorphTabPaneProps, INmorphTabsDataProvider } from '../../types';
import type { INmorphTabPaneComponentProps } from './types';

const props = withDefaults(defineProps<INmorphTabPaneComponentProps>(), {
  label: '',
  disabled: false,
  content: '',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tab-pane': [],
  })
);

const providedData = inject<INmorphTabsDataProvider>('nmorph-tabs-data');
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

providedData.tabsData.value.push(props);
const scopeProperties = props as INmorphTabPaneProps;
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="`#${getTabLabelId(providedData?.tabsIdentifier, props.name)}`">
      <slot name="label" :scope="scopeProperties" />
    </teleport>
    <teleport :to="`#${getTabContentId(providedData?.tabsIdentifier, props.name)}`">
      <slot :scope="scopeProperties" />
    </teleport>
  </div>
</template>
