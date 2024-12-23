<template>
  <div class="wrapper">
    <NmorphCard>
      <template #header>Button</template>
      <div class="overview-component-content">
        <NmorphButton text="Button" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Avatar</template>
      <div class="overview-component-content">
        <NmorphAvatar :src="Cat" :size="70" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Badge</template>
      <div class="overview-component-content">
        <NmorphBadge value="11">
          <NmorphButton text="Badge" />
        </NmorphBadge>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tag</template>
      <div class="overview-component-content">
        <NmorphTagList :model-value="[
          { value: '1', text: 'Lorem' },
          { value: '2', text: 'Ipsum' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Skeleton</template>
      <div class="overview-component-content">
        <NmorphSkeleton :rows="3" loading />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Progress</template>
      <div class="overview-component-content">
        <NmorphProgress :percentage="75" color="var(--nmorph-accent-color)" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tooltip</template>
      <div class="overview-component-content">
        <NmorphTooltip force-show text="Tooltip">
          <NmorphButton text="Lorem ipsum" />
        </NmorphTooltip>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Divider</template>
      <div class="overview-component-content">
        <p>Lorem</p>
        <NmorphDivider />
        <p>Ipsum</p>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Text input</template>
      <div class="overview-component-content">
        <NmorphTextInput placeholder="Lorem ipsum" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Switch</template>
      <div class="overview-component-content">
        <NmorphSwitch />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Checkbox</template>
      <div class="overview-component-content">
        <NmorphCheckbox :model-value="true" design="button" label="Checkbox" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Checkbox group</template>
      <div class="overview-component-content">
        <NmorphCheckboxGroup :model-value="['1']" :options="[
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Radio</template>
      <div class="overview-component-content">
        <NmorphRadio checked label="Radio" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Radio group</template>
      <div class="overview-component-content">
        <NmorphRadioGroup :model-value="'1'" :options="[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Autocomplete</template>
      <div class="overview-component-content">
        <NmorphAutocomplete placeholder="Lorem..." :list="[]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>File upload</template>
      <div class="overview-component-content">
        <NmorphFileUpload />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Slider</template>
      <div class="overview-component-content">
        <NmorphSlider :model-value="33" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Number input</template>
      <div class="overview-component-content">
        <NmorphNumberInput />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Select</template>
      <div class="overview-component-content">
        <NmorphSelect />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Date picker</template>
      <div class="overview-component-content">
        <NmorphDatePicker :model-value="new Date()" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tabs</template>
      <div class="overview-component-content">
        <NmorphTabs model-value="tab-1" :stretch="true">
          <NmorphTabPane v-for="tab in tabs" :key="tab.name" v-bind="tab">
            <template #label="{ scope }">
              <div>{{ scope.label }}</div>
            </template>
            <template #default="{ scope }"> {{ scope.content }}</template>
          </NmorphTabPane>
        </NmorphTabs>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Pagination</template>
      <div class="overview-component-content">
        <NmorphPagination :quantity-elements-on-page="2" :total-elements-quantity="4" :model-value="1" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Button</template>
      <div class="overview-component-content">
        <NmorphButton text="Button" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Avatar</template>
      <div class="overview-component-content">
        <NmorphAvatar :src="Dog" :size="70" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Badge</template>
      <div class="overview-component-content">
        <NmorphBadge value="11">
          <NmorphButton text="Badge" />
        </NmorphBadge>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tag</template>
      <div class="overview-component-content">
        <NmorphTagList :model-value="[
          { value: '1', text: 'Lorem' },
          { value: '2', text: 'Ipsum' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Skeleton</template>
      <div class="overview-component-content">
        <NmorphSkeleton :rows="3" loading />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Progress</template>
      <div class="overview-component-content">
        <NmorphProgress :percentage="75" color="var(--nmorph-accent-color)" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tooltip</template>
      <div class="overview-component-content">
        <NmorphTooltip force-show text="Tooltip">
          <NmorphButton text="Lorem ipsum" />
        </NmorphTooltip>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Divider</template>
      <div class="overview-component-content">
        <p>Lorem</p>
        <NmorphDivider />
        <p>Ipsum</p>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Text input</template>
      <div class="overview-component-content">
        <NmorphTextInput placeholder="Lorem ipsum" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Switch</template>
      <div class="overview-component-content">
        <NmorphSwitch />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Checkbox</template>
      <div class="overview-component-content">
        <NmorphCheckbox :model-value="true" design="button" label="Checkbox" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Checkbox group</template>
      <div class="overview-component-content">
        <NmorphCheckboxGroup :model-value="['1']" :options="[
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Radio</template>
      <div class="overview-component-content">
        <NmorphRadio checked label="Radio" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Radio group</template>
      <div class="overview-component-content">
        <NmorphRadioGroup :model-value="'1'" :options="[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Autocomplete</template>
      <div class="overview-component-content">
        <NmorphAutocomplete placeholder="Lorem..." :list="[]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>File upload</template>
      <div class="overview-component-content">
        <NmorphFileUpload />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Slider</template>
      <div class="overview-component-content">
        <NmorphSlider :model-value="33" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Number input</template>
      <div class="overview-component-content">
        <NmorphNumberInput />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Select</template>
      <div class="overview-component-content">
        <NmorphSelect />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Date picker</template>
      <div class="overview-component-content">
        <NmorphDatePicker :model-value="new Date()" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tabs</template>
      <div class="overview-component-content">
        <NmorphTabs model-value="tab-1" :stretch="true">
          <NmorphTabPane v-for="tab in tabs" :key="tab.name" v-bind="tab">
            <template #label="{ scope }">
              <div>{{ scope.label }}</div>
            </template>
            <template #default="{ scope }"> {{ scope.content }}</template>
          </NmorphTabPane>
        </NmorphTabs>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Pagination</template>
      <div class="overview-component-content">
        <NmorphPagination :quantity-elements-on-page="2" :total-elements-quantity="4" :model-value="1" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Button</template>
      <div class="overview-component-content">
        <NmorphButton text="Button" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Avatar</template>
      <div class="overview-component-content">
        <NmorphAvatar :src="Racoon" :size="70" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Badge</template>
      <div class="overview-component-content">
        <NmorphBadge value="11">
          <NmorphButton text="Badge" />
        </NmorphBadge>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tag</template>
      <div class="overview-component-content">
        <NmorphTagList :model-value="[
          { value: '1', text: 'Lorem' },
          { value: '2', text: 'Ipsum' },
        ]" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Skeleton</template>
      <div class="overview-component-content">
        <NmorphSkeleton :rows="3" loading />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Progress</template>
      <div class="overview-component-content">
        <NmorphProgress :percentage="75" color="var(--nmorph-accent-color)" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Tooltip</template>
      <div class="overview-component-content">
        <NmorphTooltip force-show text="Tooltip">
          <NmorphButton text="Lorem ipsum" />
        </NmorphTooltip>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Divider</template>
      <div class="overview-component-content">
        <p>Lorem</p>
        <NmorphDivider />
        <p>Ipsum</p>
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Text input</template>
      <div class="overview-component-content">
        <NmorphTextInput placeholder="Lorem ipsum" />
      </div>
    </NmorphCard>
    <NmorphCard>
      <template #header>Switch</template>
      <div class="overview-component-content">
        <NmorphSwitch />
      </div>
    </NmorphCard>
  </div>
</template>

<script setup lang="ts">
import {
  NmorphCard,
  NmorphButton,
  NmorphAvatar,
  NmorphBadge,
  NmorphTagList,
  NmorphSkeleton,
  NmorphProgress,
  NmorphTooltip,
  NmorphDivider,
  NmorphTextInput,
  NmorphSwitch,
  NmorphCheckbox,
  NmorphCheckboxGroup,
  NmorphRadioGroup,
  NmorphAutocomplete,
  NmorphFileUpload,
  NmorphNumberInput,
  NmorphSelect,
  NmorphDatePicker,
  NmorphTabs,
  NmorphTabPane,
  NmorphPagination,
  NmorphSlider,
  NmorphRadio,
} from "@nmorph/nmorph-ui-kit";
import Cat from './../assets/cat.jpg';
import Dog from './../assets/dog.jpg';
import Racoon from './../assets/racoon.jpg';

const tabs = [
  { name: "tab-1", label: "Tab 1", content: "Lorem ipsum 1" },
  {
    name: "tab-2",
    label: "Tab 2",
  },
  {
    name: "tab-3",
    label: "Tab 3",
  },
]
</script>

<style>
.overview-component-content {
  margin-top: 16px;
}


/* .wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 24px;
  margin: 8px;
  max-width: 2000px;
} */

.nmorph-card {

  /* height: 180px; */
}
</style>
