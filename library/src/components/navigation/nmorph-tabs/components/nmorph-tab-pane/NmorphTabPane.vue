<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { inject } from 'vue';
import { INmorphTabPaneProps, INmorphTabsDataProvider, getTabContentId, getTabLabelId } from '@/components';
import { onMounted } from 'vue';

interface INmorphProps extends INmorphTabPaneProps {}
const props = withDefaults(defineProps<INmorphProps>(), {
  label: '',
  disabled: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tab-pane': [],
  })
);

const providedData = inject<INmorphTabsDataProvider | undefined>('nmorph-tabs-data', undefined);

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  if (!providedData) return;
  providedData.tabsData.value.push(props);
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="`#${getTabLabelId(providedData?.tabsIdentifier, props.name)}`">
      <slot name="label" />
    </teleport>
    <teleport :to="`#${getTabContentId(providedData?.tabsIdentifier, props.name)}`">
      <slot />
    </teleport>
  </div>
</template>
