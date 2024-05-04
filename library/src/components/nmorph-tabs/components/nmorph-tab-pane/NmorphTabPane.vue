<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { inject } from 'vue';
import { NmorphTabPaneProps, NmorphTabsDataProvider } from '../../type';
import { onMounted } from 'vue';
import { getTabContentId, getTabLabelId } from './../../utils';

interface IProps extends NmorphTabPaneProps {}
const props = withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tab-pane': [],
  })
);

const providedData = inject<NmorphTabsDataProvider | undefined>('nmorph-tabs-data');

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
