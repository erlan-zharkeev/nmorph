<script setup lang="ts">
import { Racoon, Autumn, Winter } from "~/assets/images";
import {
  NmorphIcon,
  NmorphIconArchive,
  NmorphIconImage,
  NmorphCard,
  NmorphButton,
  NmorphLink,
  NmorphAvatar,
  NmorphBadge,
  NmorphImage,
  NmorphTagList,
  NmorphSkeleton,
  NmorphProgress,
  NmorphTooltip,
  NmorphDivider,
  NmorphBreadcrumb,
  NmorphBreadcrumbItem,
  NmorphTextInput,
  NmorphColorPicker,
  NmorphSwitch,
  NmorphCheckbox,
  NmorphCheckboxGroup,
  NmorphAutocomplete,
  NmorphFileUpload,
  NmorphNumberInput,
  NmorphSelect,
  NmorphDatePicker,
  NmorphTabs,
  NmorphTabPane,
  NmorphPagination,
  NmorphSlider,
  NmorphAlert,
  NmorphCallout,
  NmorphRadio,
  NmorphSelectButton,
  NmorphSelectButtonItem
} from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();
const tabs = ref([
  { name: "tab-1", label: "Tab 1", content: "Lorem ipsum 1" },
  {
    name: "tab-2",
    label: "Tab 2",
  },
  {
    name: "tab-3",
    label: "Tab 3",
  },
]);
const localePath = useLocalePath();
</script>

<template>
  <div class="overview">
    <div class="nmorph-title-1 overview__title">
      {{ t("overview.explore-components") }}
    </div>
    <div class="overview-component-list">
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/button')">
          <NmorphCard>
            <template #header>Button</template>
            <div class="overview-component-content">
              <NmorphButton text="Button" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/icon')">
          <NmorphCard>
            <template #header>Icon</template>
            <div class="overview-component-content">
              <NmorphIcon color="var(--nmorph-accent-color)" size="large">
                <NmorphIconArchive />
              </NmorphIcon>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/link')">
          <NmorphCard>
            <template #header>Link</template>
            <div class="overview-component-content">
              <NmorphLink text="Link" class="nmorph-title-3" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper scroll-component">
        <NuxtLink :to="localePath('/elements/scroll')">
          <NmorphCard>
            <template #header>Scroll</template>
            <div class="overview-component-content">
              <div class="scroll-component__el" v-for="el in 20" :key="el" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/avatar')">
          <NmorphCard>
            <template #header>Avatar</template>
            <div class="overview-component-content">
              <NmorphAvatar :src="Racoon" :size="70" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/badge')">
          <NmorphCard>
            <template #header>Badge</template>
            <div class="overview-component-content">
              <NmorphBadge value="11">
                <NmorphButton text="Badge" />
              </NmorphBadge>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper card">
        <NuxtLink :to="localePath('/elements/card')">
          <NmorphCard>
            <template #header>Card</template>
            <div class="overview-component-content">
              <NmorphCard shadow-type="combined">
                <NmorphImage :src="Autumn" />
              </NmorphCard>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink :to="localePath('/elements/image')">
          <NmorphCard>
            <template #header>Image</template>
            <div class="overview-component-content">
              <NmorphImage :src="Winter" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper tag">
        <NuxtLink :to="localePath('/elements/tag')">
          <NmorphCard>
            <template #header>Tag</template>
            <div class="overview-component-content">
              <NmorphTagList :model-value="[
                { value: '1', text: 'Lorem' },
                { value: '2', text: 'Ipsum' },
              ]" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper skeleton">
        <NuxtLink :to="localePath('/elements/skeleton')">
          <NmorphCard>
            <template #header>Skeleton</template>
            <div class="overview-component-content">
              <NmorphSkeleton :rows="3" loading />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper progress">
        <NuxtLink :to="localePath('/elements/progress')">
          <NmorphCard>
            <template #header>Progress</template>
            <div class="overview-component-content">
              <NmorphProgress :percentage="75" color="var(--nmorph-accent-color)" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper image-preview">
        <NuxtLink :to="localePath('/elements/image-preview')">
          <NmorphCard>
            <template #header>Image Preview</template>
            <div class="overview-component-content">
              <NmorphIcon width="60px" height="60px">
                <NmorphIconImage />
              </NmorphIcon>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper tooltip">
        <NuxtLink :to="localePath('/elements/tooltip')">
          <NmorphCard>
            <template #header>Tooltip</template>
            <div class="overview-component-content">
              <NmorphTooltip force-show text="Tooltip">
                <NmorphIcon name="info" width="40px" />
              </NmorphTooltip>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper divider">
        <NuxtLink :to="localePath('/elements/divider')">
          <NmorphCard>
            <template #header>Divider</template>
            <div class="overview-component-content">
              <p>Lorem</p>
              <NmorphDivider />
              <p>Ipsum</p>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper breadcrumb">
        <NuxtLink :to="localePath('/elements/breadcrumb')">
          <NmorphCard>
            <template #header>Breadcrumb</template>
            <div class="overview-component-content">
              <NmorphBreadcrumb>
                <NmorphBreadcrumbItem> Lorem</NmorphBreadcrumbItem>
                <NmorphBreadcrumbItem> Ipsum </NmorphBreadcrumbItem>
              </NmorphBreadcrumb>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper text-input">
        <NuxtLink :to="localePath('/elements/text-input')">
          <NmorphCard>
            <template #header>Text input</template>
            <div class="overview-component-content">
              <NmorphTextInput :placeholder="t('overview.enter-text')" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper color-picker">
        <NuxtLink :to="localePath('/elements/color-picker')">
          <NmorphCard>
            <template #header>Color picker</template>
            <div class="overview-component-content">
              <NmorphColorPicker show-value />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper switch">
        <NuxtLink :to="localePath('/elements/switch')">
          <NmorphCard>
            <template #header>Switch</template>
            <div class="overview-component-content">
              <NmorphSwitch />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper checkbox">
        <NuxtLink :to="localePath('/elements/checkbox')">
          <NmorphCard>
            <template #header>Checkbox</template>
            <div class="overview-component-content">
              <NmorphCheckbox :model-value="true" design="button" label="Checkbox" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper checkbox-group">
        <NuxtLink :to="localePath('/elements/checkbox-group')">
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
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper radio">
        <NuxtLink :to="localePath('/elements/radio')">
          <NmorphCard>
            <template #header>Radio</template>
            <div class="overview-component-content')">
              <NmorphRadio checked label="Radio" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper radio-group">
        <NuxtLink :to="localePath('/elements/radio-group')">
          <NmorphCard>
            <template #header>Radio group</template>
            <div class="overview-component-content">
              <NmorphCheckboxGroup :model-value="['1']" :options="[
                { id: '1', label: '1' },
                { id: '2', label: '2' },
                { id: '3', label: '3' },
              ]" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper select-button">
        <NuxtLink :to="localePath('/elements/select-button')">
          <NmorphCard>
            <template #header>Select button</template>
            <div class="overview-component-content">
              <NmorphSelectButton model-value="on">
                <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
                <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
              </NmorphSelectButton>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper autocomplete">
        <NuxtLink :to="localePath('/elements/autocomplete')">
          <NmorphCard>
            <template #header>Autocomplete</template>
            <div class="overview-component-content">
              <NmorphAutocomplete placeholder="Lorem..." :list="[]" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper file-upload">
        <NuxtLink :to="localePath('/elements/file-upload')">
          <NmorphCard>
            <template #header>File upload</template>
            <div class="overview-component-content">
              <NmorphFileUpload />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper slider">
        <NuxtLink :to="localePath('/elements/slider')">
          <NmorphCard>
            <template #header>Slider</template>
            <div class="overview-component-content">
              <NmorphSlider :model-value="33" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper number-input overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/number-input')">
          <NmorphCard>
            <template #header>Number input</template>
            <div class="overview-component-content">
              <NmorphNumberInput />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper select overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/select')">
          <NmorphCard>
            <template #header>Select</template>
            <div class="overview-component-content">
              <NmorphSelect />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper date-picker overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/date-picker')">
          <NmorphCard>
            <template #header>Date picker</template>
            <div class="overview-component-content">
              <NmorphDatePicker :model-value="new Date()" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper tabs overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/tabs')">
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
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper pagination overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/pagination')">
          <NmorphCard>
            <template #header>Pagination</template>
            <div class="overview-component-content">
              <NmorphPagination :quantity-elements-on-page="2" :total-elements-quantity="4" :model-value="1" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper alert overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/alert')">
          <NmorphCard>
            <template #header>Alert</template>
            <div class="overview-component-content">
              <NmorphAlert title="Lorem" content="Ipsum dolor sit amet consectetur" type="success" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper callout overview-component-wrapper--large">
        <NuxtLink :to="localePath('/elements/callout')">
          <NmorphCard>
            <template #header>Callout</template>
            <div class="overview-component-content">
              <NmorphCallout content="Successful content" type="success" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper" v-for="el in [
        ['Table', 'table'],
        ['Overlay', 'overlay'],
        ['Dialog', 'dialog'],
        ['Notification', 'notification-provider'],
        ['Backtop', 'backtop'],
        ['Form', 'form'],
        ['Dropdown', 'dropdown'],
        ['Calendar', 'calendar'],
      ]">
        <NuxtLink :to="`/elements/${el[1]}`">
          <NmorphCard>
            <template #header>{{ el[0] }}</template>
            <div class="overview-component-content">{{ el[0] }}</div>
          </NmorphCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.overview {
  padding-bottom: 8px;

  .nmorph-card {
    pointer-events: none;
  }

  .overview__title {
    margin-bottom: 8px;
  }

  .overview-component-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .overview-component-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .nmorph-card__content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 4px;
  }

  .overview-component-wrapper {
    height: 200px;

    .nmorph-card {
      height: 100%;
    }
  }

  .scroll-component {
    .overview-component-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .scroll-component__el {
      width: 100%;
      height: 10px;
      background-color: var(--nmorph-accent-color);
      margin-bottom: 4px;
    }
  }

  .card {
    .nmorph-card__content {
      overflow: inherit;
    }

    .nmorph-image img {
      width: 70px;
      height: 70px;
    }
  }

  .tag {
    .nmorph-tag-item {
      margin-bottom: 4px;
    }
  }

  .skeleton {
    .nmorph-skeleton {
      width: 100%;
    }

    .nmorph-skeleton-item {
      width: 100%;
    }
  }

  .progress {
    .nmorph-progress {
      width: 100%;
    }
  }

  .divider {
    .nmorph-divider {
      margin: 8px 0;
    }

    .overview-component-content {
      display: flex;
      flex-direction: column;
    }
  }

  @include max-width-query(1600) {
    .overview-component-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include max-width-query(1366) {
    .overview-component-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include max-width-query(768) {
    .overview-component-wrapper {
      width: 100%;
    }
  }

  @include max-width-query(550) {
    .overview-component-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
