<script setup lang="ts">
import { Racoon, Autumn, Winter } from "~/assets/images";
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
</script>

<template>
  <div class="overview">
    <div class="nmorph-title-1 overview__title">
      {{ t("overview.explore-components") }}
    </div>
    <div class="overview-component-list">
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/button">
          <NmorphCard>
            <template #header>Button</template>
            <div class="overview-component-content">
              <NmorphButton text="Button" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/icon">
          <NmorphCard>
            <template #header>Icon</template>
            <div class="overview-component-content">
              <NmorphIcon
                name="archive"
                color="var(--nmorph-accent-color)"
                size="large"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/link">
          <NmorphCard>
            <template #header>Link</template>
            <div class="overview-component-content">
              <NmorphLink text="Link" class="nmorph-title-3" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper scroll-component">
        <NuxtLink to="/components/scroll">
          <NmorphCard>
            <template #header>Scroll</template>
            <div class="overview-component-content">
              <div class="scroll-component__el" v-for="el in 20" :key="el" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/avatar">
          <NmorphCard>
            <template #header>Avatar</template>
            <div class="overview-component-content">
              <NmorphAvatar :src="Racoon" :size="70" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/badge">
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
        <NuxtLink to="/components/card">
          <NmorphCard>
            <template #header>Card</template>
            <div class="overview-component-content">
              <NmorphCard shadow-type="combined">
                <NmorphImage :src="Autumn"
              /></NmorphCard>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper">
        <NuxtLink to="/components/image">
          <NmorphCard>
            <template #header>Image</template>
            <div class="overview-component-content">
              <NmorphImage :src="Winter" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper tag">
        <NuxtLink to="/components/tag">
          <NmorphCard>
            <template #header>Tag</template>
            <div class="overview-component-content">
              <NmorphTagList
                :model-value="[
                  { value: '1', text: 'Lorem' },
                  { value: '2', text: 'Ipsum' },
                ]"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper skeleton">
        <NuxtLink to="/components/skeleton">
          <NmorphCard>
            <template #header>Skeleton</template>
            <div class="overview-component-content">
              <NmorphSkeleton :rows="3" loading />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper progress">
        <NuxtLink to="/components/progress">
          <NmorphCard>
            <template #header>Progress</template>
            <div class="overview-component-content">
              <NmorphProgress
                :percentage="75"
                color="var(--nmorph-accent-color)"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper image-preview">
        <NuxtLink to="/components/image-preview">
          <NmorphCard>
            <template #header>Image Preview</template>
            <div class="overview-component-content">
              <NmorphIcon name="image" width="60px" height="60px" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper tooltip">
        <NuxtLink to="/components/tooltip">
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
        <NuxtLink to="/components/divider">
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
        <NuxtLink to="/components/breadcrumb">
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
        <NuxtLink to="/components/text-input">
          <NmorphCard>
            <template #header>Text input</template>
            <div class="overview-component-content">
              <NmorphTextInput :placeholder="t('overview.enter-text')" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper switch">
        <NuxtLink to="/components/switch">
          <NmorphCard>
            <template #header>Switch</template>
            <div class="overview-component-content">
              <NmorphSwitch />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper checkbox">
        <NuxtLink to="/components/checkbox">
          <NmorphCard>
            <template #header>Checkbox</template>
            <div class="overview-component-content">
              <NmorphCheckbox
                :model-value="true"
                design="button"
                label="Checkbox"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper checkbox-group">
        <NuxtLink to="/components/checkbox-group">
          <NmorphCard>
            <template #header>Checkbox group</template>
            <div class="overview-component-content">
              <NmorphCheckboxGroup
                :model-value="['1']"
                :options="[
                  { id: '1', label: '1' },
                  { id: '2', label: '2' },
                  { id: '3', label: '3' },
                ]"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper radio">
        <NuxtLink to="/components/radio">
          <NmorphCard>
            <template #header>Radio</template>
            <div class="overview-component-content">
              <NmorphRadio checked label="Radio" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper radio-group">
        <NuxtLink to="/components/radio-group">
          <NmorphCard>
            <template #header>Radio group</template>
            <div class="overview-component-content">
              <NmorphCheckboxGroup
                :model-value="['1']"
                :options="[
                  { id: '1', label: '1' },
                  { id: '2', label: '2' },
                  { id: '3', label: '3' },
                ]"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper autocomplete">
        <NuxtLink to="/components/autocomplete">
          <NmorphCard>
            <template #header>Autocomplete</template>
            <div class="overview-component-content">
              <NmorphAutocomplete placeholder="Lorem..." />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper file-upload">
        <NuxtLink to="/components/file-upload">
          <NmorphCard>
            <template #header>File upload</template>
            <div class="overview-component-content">
              <NmorphFileUpload />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div class="overview-component-wrapper slider">
        <NuxtLink to="/components/slider">
          <NmorphCard>
            <template #header>Slider</template>
            <div class="overview-component-content">
              <NmorphSlider :model-value="33" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper number-input overview-component-wrapper--large"
      >
        <NuxtLink to="/components/number-input">
          <NmorphCard>
            <template #header>Number input</template>
            <div class="overview-component-content">
              <NmorphNumberInput />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper select overview-component-wrapper--large"
      >
        <NuxtLink to="/components/select">
          <NmorphCard>
            <template #header>Select</template>
            <div class="overview-component-content">
              <NmorphSelect />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper date-picker overview-component-wrapper--large"
      >
        <NuxtLink to="/components/date-picker">
          <NmorphCard>
            <template #header>Date picker</template>
            <div class="overview-component-content">
              <NmorphDatePicker :model-value="new Date()" />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper tabs overview-component-wrapper--large"
      >
        <NuxtLink to="/components/tabs">
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
      <div
        class="overview-component-wrapper pagination overview-component-wrapper--large"
      >
        <NuxtLink to="/components/pagination">
          <NmorphCard>
            <template #header>Pagination</template>
            <div class="overview-component-content">
              <NmorphPagination
                :quantity-elements-on-page="2"
                :total-elements-quantity="4"
                :model-value="1"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper alert overview-component-wrapper--large"
      >
        <NuxtLink to="/components/alert">
          <NmorphCard>
            <template #header>Alert</template>
            <div class="overview-component-content">
              <NmorphAlert
                title="Lorem"
                content="Ipsum dolor sit amet consectetur"
                type="success"
              />
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
      <div
        class="overview-component-wrapper"
        v-for="el in [
          ['Table', 'table'],
          ['Overlay', 'overlay'],
          ['Dialog', 'dialog'],
          ['Notification', 'notification-provider'],
          ['Backtop', 'backtop'],
          ['Form', 'form'],
          ['Dropdown', 'dropdown'],
          ['Calendar', 'calendar'],
        ]"
      >
        <NuxtLink :to="`/components/${el[1]}`">
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
  .overview__title {
    margin-bottom: 8px;
  }

  .overview-component-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
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
  }

  .overview-component-wrapper {
    height: 200px;

    .nmorph-card {
      height: 100%;
    }

    a {
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

  @include max-width-query(768) {
    .overview-component-list {
      grid-template-columns: 1fr 1fr;
    }

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
