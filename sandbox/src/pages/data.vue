<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphAvatar,
  NmorphBadge,
  NmorphButton,
  NmorphCalendar,
  NmorphCard,
  NmorphCarousel,
  NmorphCarouselItem,
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphEmpty,
  NmorphIcon,
  NmorphIconImage,
  NmorphIconUsers,
  NmorphImage,
  NmorphImagePreview,
  NmorphPagination,
  NmorphProgress,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphTable,
  NmorphTableCell,
  NmorphTableColumn,
  NmorphTagItem,
  NmorphTagList,
} from '@nmorph/nmorph-ui-kit'
import type { NmorphSortOrderType } from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const createImage = (startColor: string, endColor: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${startColor}" />
          <stop offset="1" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#g)" />
      <circle cx="242" cy="66" r="36" fill="rgba(255,255,255,.35)" />
      <path d="M0 178 L74 118 L129 154 L192 92 L320 196 L320 220 L0 220 Z" fill="rgba(255,255,255,.42)" />
      <text x="26" y="48" fill="white" font-family="Arial" font-size="24" font-weight="700">${label}</text>
    </svg>
  `)}`

const imageOne = createImage('#2563eb', '#22c55e', 'Cover')
const imageTwo = createImage('#7c3aed', '#f97316', 'Preview')
const imageThree = createImage('#0f766e', '#eab308', 'Gallery')
const brokenImage = 'data:image/png;base64,broken'

const progressValue = ref(65)
const circleProgress = ref(72)
const currentPage = ref(4)
const activeCalendarDate = ref(new Date(2026, 4, 5))
const selectedCalendarDates = ref([new Date(2026, 4, 7), new Date(2026, 4, 9)])
const selectedCalendarRange = ref([new Date(2026, 4, 12), new Date(2026, 4, 18)])
const collapseValue = ref(['availability'])
const tags = ref([
  { text: 'New', value: 'new', height: 'thin' as const },
  { text: 'Stable', value: 'stable', removable: false },
  { text: 'Preview', value: 'preview', design: 'common' as const },
])

const tableData = ref([
  { name: 'Avatar', status: 'Ready', count: 12 },
  { name: 'Progress', status: 'Review', count: 8 },
  { name: 'Table', status: 'Ready', count: 21 },
])

const tableSort = ref<Record<string, NmorphSortOrderType>>({
  name: 'ascending',
  count: 'descending',
})

const progressColor = (value: number) => {
  if (value >= 80) return 'var(--nmorph-success-color)'
  if (value >= 50) return 'var(--nmorph-warn-color)'
  return 'var(--nmorph-error-color)'
}
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphBadge">
      <div class="row">
        <NmorphBadge :value="3">
          <NmorphButton text="Default" />
        </NmorphBadge>
        <NmorphBadge :value="128" :max="99" :offset-x="4" :offset-y="-2">
          <NmorphButton text="Max" />
        </NmorphBadge>
        <NmorphBadge is-dot color="var(--nmorph-error-color)" :dot-size="10">
          <NmorphButton text="Dot" />
        </NmorphBadge>
        <NmorphBadge :value="12" color="var(--nmorph-success-color)">
          <template #value="{ displayValue }">
            <div class="badge-value">
              <NmorphIcon width="10px" height="10px" color="currentColor"><NmorphIconUsers /></NmorphIcon>
              <span>{{ displayValue }}</span>
            </div>
          </template>
          <NmorphButton text="Slot" />
        </NmorphBadge>
        <NmorphBadge value="Tag" is-tag size="extra-small" />
        <NmorphBadge value="Base Tag" is-tag size="base" />
        <NmorphBadge value="Hidden" hidden>
          <NmorphButton text="Hidden" />
        </NmorphBadge>
        <NmorphBadge value="Disabled" disabled>
          <NmorphButton text="No badge" />
        </NmorphBadge>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphCard">
      <div class="cards">
        <NmorphCard shadow-type="outset">
          <template #header>Outset</template>
          <p>Default content card.</p>
          <template #footer>Footer slot</template>
        </NmorphCard>
        <NmorphCard shadow-type="inset">
          <template #header>Inset</template>
          <p>Inset visual state.</p>
        </NmorphCard>
        <NmorphCard shadow-type="combined" :combined-shadow-border-width="2">
          <template #header>Combined</template>
          <p>Combined border and shadow.</p>
        </NmorphCard>
        <NmorphCard tag="article" :fill="false" card-padding="12px">
          <template #header>Fit content</template>
          <p>Compact article card.</p>
        </NmorphCard>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphEmpty">
      <div class="empty-grid">
        <NmorphEmpty
          title="No dashboards"
          description="Create a dashboard to start tracking this workspace."
        >
          <template #action>
            <NmorphButton text="Create dashboard" height="thin" />
          </template>
        </NmorphEmpty>
        <NmorphEmpty
          design="common"
          title="No media"
          description="Drop assets here or connect an external source."
          :icon-size="42"
          min-height="150px"
        >
          <template #icon>
            <NmorphIcon width="42px" height="42px" color="var(--nmorph-accent-color)">
              <NmorphIconImage />
            </NmorphIcon>
          </template>
        </NmorphEmpty>
        <NmorphEmpty
          title="Compact"
          description="A tighter state for small panels."
          :icon-size="32"
          :min-height="112"
          :padding="12"
          shadow-type="outset"
        />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphAvatar">
      <div class="row">
        <NmorphAvatar :src="imageOne" :size="40" alt="Small avatar" />
        <NmorphAvatar :src="imageTwo" :size="56" shape="square" fit="cover" />
        <NmorphAvatar :src="[imageOne, imageTwo, imageThree]" preview :size="64" shape="square" alt="Preview avatar" />
        <NmorphAvatar :src="imageOne" :preview-src="[imageOne, imageTwo, imageThree]" preview :size="56" />
        <NmorphAvatar name="John Doe" :size="56" />
        <NmorphAvatar name="Alex Smith" :size="72" shape="square" />
        <NmorphAvatar :src="brokenImage" name="Broken Image" :size="56" />
        <NmorphAvatar :size="56" :frame-border="0" :image-padding="0" />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphImage">
      <div class="row">
        <NmorphImage class="image-demo" :src="imageOne" alt="Cover" fit="cover" loading-text="Loading image" />
        <NmorphImage class="image-demo" :src="imageTwo" alt="Contain" fit="contain" :frame-border="0" />
        <NmorphImage class="image-demo" :src="brokenImage" load-failed-text="Load failed" />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphImagePreview">
      <div class="row">
        <NmorphImagePreview :src="imageOne" alt="Single preview" />
        <NmorphImagePreview
          :src="[imageOne, imageTwo, imageThree]"
          :initial-index="1"
          :scale-step="0.25"
          :width="190"
          :height="130"
          :navigation-button-margin="32"
        />
        <NmorphImagePreview
          :src="[imageThree, imageTwo]"
          :width="190"
          :height="130"
          :show-navigation-buttons="false"
          :show-action-bar="false"
        />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphProgress">
      <div class="stack">
        <NmorphProgress :percentage="progressValue" :height="10" />
        <NmorphProgress :percentage="progressValue" value-inside :value-right-side="false" color="var(--nmorph-success-color)" />
        <NmorphProgress :percentage="100" indeterminate />
        <div class="row">
          <NmorphProgress type="circle" :percentage="circleProgress" :circle-size="96" :color="progressColor" />
          <NmorphProgress type="circle" :percentage="35" :circle-size="72" color="var(--nmorph-error-color)">
            <template #circle-inner-part>
              <NmorphIcon color="var(--nmorph-error-color)"><NmorphIconImage /></NmorphIcon>
            </template>
          </NmorphProgress>
        </div>
      </div>
      <p class="hint">linear: {{ progressValue }}%, circle: {{ circleProgress }}%</p>
    </SandboxSection>

    <SandboxSection title="NmorphSkeleton">
      <div class="cards">
        <NmorphSkeleton
          :rows="3"
          loading-gradient="linear-gradient(90deg, var(--nmorph-accent-color) 20%, var(--nmorph-white-color) 45%, var(--nmorph-accent-color) 70%)"
        />
        <NmorphSkeleton>
          <template #template>
            <div class="skeleton-template">
              <NmorphSkeletonItem variant="circle" width="44px" height="44px" />
              <div class="skeleton-lines">
                <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
                <NmorphSkeletonItem variant="rect" width="70%" height="14px" />
              </div>
            </div>
          </template>
        </NmorphSkeleton>
        <NmorphSkeleton :loading="false">
          <p>Loaded default content.</p>
        </NmorphSkeleton>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphPagination">
      <div class="stack">
        <NmorphPagination
          v-model="currentPage"
          :total-elements-quantity="96"
          :elements-quantity-on-page="8"
          :max-visible-pages="7"
          :fast-forward-step="4"
          :hide-on-single-page="false"
        />
        <NmorphPagination :model-value="1" :total-elements-quantity="4" :elements-quantity-on-page="10" disabled />
      </div>
      <p class="hint">page: {{ currentPage }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphTable">
      <NmorphTable
        :data="tableData"
        :sort="tableSort"
        bordered
        row-hover
        design="nmorph"
        border-color="color-mix(in srgb, var(--nmorph-accent-color) 55%, transparent)"
        :cell-height="44"
        row-hover-background="color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent)"
      >
        <NmorphTableColumn prop="name" label="Name" width="180" alignment="left" />
        <NmorphTableColumn prop="status" label="Status" width="160">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(_, index) in scope.rows" :key="index" :row="index">
              <NmorphBadge :value="String(scope.rows[index].status)" is-tag color="var(--nmorph-success-color)" />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
        <NmorphTableColumn prop="count" label="Count" width="120" alignment="right" />
      </NmorphTable>
    </SandboxSection>

    <SandboxSection title="NmorphTagList">
      <div class="stack">
        <NmorphTagList v-model="tags" />
        <div class="row">
          <NmorphTagItem text="Thin" value="thin" height="thin" />
          <NmorphTagItem text="Default" value="default" removable />
          <NmorphTagItem text="Thick" value="thick" height="thick" design="common" />
        </div>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphCollapse">
      <NmorphCollapse v-model="collapseValue">
        <NmorphCollapseItem name="availability" title="Availability" :block="false" :transition-speed="220">
          <p>Multiple panels can stay opened.</p>
        </NmorphCollapseItem>
        <NmorphCollapseItem name="disabled" title="Disabled" disabled :block="false">
          <p>Disabled panel content.</p>
        </NmorphCollapseItem>
        <NmorphCollapseItem name="custom" :block="false" height="thin">
          <template #title>
            <span>Custom title slot</span>
          </template>
          <p>Thin title height.</p>
        </NmorphCollapseItem>
      </NmorphCollapse>
    </SandboxSection>

    <SandboxSection title="NmorphCalendar">
      <div class="calendar-grid">
        <NmorphCalendar v-model="activeCalendarDate" :initial-date="new Date(2026, 4, 1)" />
        <NmorphCalendar v-model="selectedCalendarDates" type="dates" :mark-today="false" :cell-height="42" />
        <NmorphCalendar
          v-model="selectedCalendarRange"
          type="daterange"
          :range="[new Date(2026, 4, 1), new Date(2026, 5, 30)]"
        />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphCarousel">
      <NmorphCarousel class="carousel-demo">
        <NmorphCarouselItem name="one">
          <div class="slide slide--one">First slide</div>
        </NmorphCarouselItem>
        <NmorphCarouselItem name="two">
          <div class="slide slide--two">Second slide</div>
        </NmorphCarouselItem>
        <NmorphCarouselItem name="three">
          <div class="slide slide--three">Third slide</div>
        </NmorphCarouselItem>
      </NmorphCarousel>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.stack {
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px;
}

.empty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.cards p,
.stack p {
  margin: 0;
}

.badge-value {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.image-demo {
  --width: 180px;
  --height: 120px;
}

.skeleton-template {
  display: flex;
  gap: 12px;
  align-items: center;
}

.skeleton-lines {
  flex: 1;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.carousel-demo {
  height: 240px;
}

.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
}

.slide--one {
  background: linear-gradient(135deg, #2563eb, #22c55e);
}

.slide--two {
  background: linear-gradient(135deg, #7c3aed, #f97316);
}

.slide--three {
  background: linear-gradient(135deg, #0f766e, #eab308);
}

.hint {
  margin: 0;
  font-size: 13px;
  color: var(--nmorph-semi-contrast-text-color);
}

:deep(.nmorph-carousel) {
  position: relative;
  height: 240px;
  overflow: hidden;
  border: 8px solid var(--nmorph-main-color);
  border-radius: 8px;
  box-shadow:
    -4px -4px 8px var(--nmorph-light-shade-color),
    4px 4px 8px var(--nmorph-dark-shade-color);
}

:deep(.nmorph-carousel__wrapper) {
  display: flex;
  height: 100%;
}

:deep(.nmorph-carousel__wrapper.transition-enabled) {
  transition: transform 0.4s ease;
}

:deep(.nmorph-carousel__item) {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

:deep(.nmorph-carousel__elements-indicator) {
  position: absolute;
  bottom: 14px;
  display: flex;
  justify-content: center;
  width: 100%;
}

:deep(.nmorph-carousel__element-indicator-wrapper) {
  padding: 5px;
  cursor: pointer;
}

:deep(.nmorph-carousel__element-indicator) {
  width: 28px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
}

:deep(.nmorph-carousel__element-indicator--active) {
  background: #fff;
}

:deep(.nmorph-carousel__action-btn) {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.35);
  transform: translateY(-50%);
  cursor: pointer;
}

:deep(.nmorph-carousel__prev) {
  right: 12px;
  rotate: -90deg;
}

:deep(.nmorph-carousel__next) {
  left: 12px;
  rotate: 90deg;
}

:deep(.nmorph-carousel__action-btn .nmorph-icon) {
  --color: #fff;
}
</style>
