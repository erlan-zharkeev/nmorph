<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
  NmorphEmojiPicker,
  NmorphFileCard,
  NmorphIcon,
  NmorphIconClose,
  NmorphIconImage,
  NmorphIconUsers,
  NmorphImage,
  NmorphImagePreview,
  NmorphMediaGallery,
  NmorphPagination,
  NmorphProgress,
  NmorphQRCode,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphTable,
  NmorphTableCell,
  NmorphTableColumn,
  NmorphTagItem,
  NmorphTagList,
  NmorphVirtualList,
} from '@nmorph/nmorph-ui-kit'
import type {
  INmorphEmojiPickerI18n,
  INmorphFileCardProps,
  NmorphDataTableElRecordType,
  NmorphElementDesignType,
  NmorphMediaGalleryItem,
  NmorphEmojiPickerDataSource,
  NmorphSortOrderType,
  NmorphTableSortType,
} from '@nmorph/nmorph-ui-kit'
import { loadNmorphEmojiLocale, nmorphEmojiLanguageOptions } from '../../../library/src/emoji'
import type { NmorphEmojiLanguage, NmorphEmojiLocale } from '../../../library/src/emoji'
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
const pdfPreviewSrc = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
const audioPreviewSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
const videoPreviewSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const createDownloadHref = (name: string, mimeType = 'text/plain') =>
  `data:${mimeType};charset=utf-8,${encodeURIComponent(`Sandbox file placeholder: ${name}`)}`

type FileCardExample = {
  label: string
  props: INmorphFileCardProps
}

const createFileCard = (
  label: string,
  name: string,
  mimeType: string,
  size: number,
  overrides: Partial<INmorphFileCardProps> = {}
): FileCardExample => ({
  label,
  props: {
    name,
    mimeType,
    size,
    downloadHref: createDownloadHref(name, mimeType),
    ...overrides,
  },
})

const fileCardExamples: FileCardExample[] = [
  createFileCard('PDF preview', 'morph_specification.pdf', 'application/pdf', 435_200, {
    previewSrc: pdfPreviewSrc,
    surface: 'soft',
    height: 150,
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
  createFileCard('Image preview', 'cover-photo.jpeg', 'image/jpeg', 245_760, {
    previewSrc: imageOne,
    downloadHref: imageOne,
    mediaPreview: 'image',
    previewMode: 'emit',
    surface: 'soft',
    height: 150,
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
  createFileCard('ZIP archive', 'assets_bundle.zip', 'application/zip', 9_175_040, {
    surface: 'soft',
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
  createFileCard('Video preview', 'clip-preview.mp4', 'video/mp4', 7_340_032, {
    previewSrc: videoPreviewSrc,
    mediaPreview: 'video',
    previewMode: 'emit',
    surface: 'soft',
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
  createFileCard('Audio preview', '32.mp3', 'audio/mpeg', 3_407_872, {
    previewSrc: audioPreviewSrc,
    mediaPreview: 'audio',
    surface: 'soft',
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
]

const fileCardCustomActionExamples: FileCardExample[] = [
  createFileCard('PDF custom action', 'custom-report.pdf', 'application/pdf', 435_200, {
    previewSrc: pdfPreviewSrc,
    surface: 'soft',
    height: 150,
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
  createFileCard('Image custom action', 'custom-photo.jpeg', 'image/jpeg', 245_760, {
    previewSrc: imageOne,
    downloadHref: imageOne,
    mediaPreview: 'image',
    previewMode: 'emit',
    surface: 'soft',
    height: 150,
    showExtensionBadge: false,
    iconSurface: false,
    compact: true,
  }),
]

const mediaGalleryOpen = ref(false)
const mediaGalleryIndex = ref(0)
const mediaGalleryItems: NmorphMediaGalleryItem[] = [
  {
    kind: 'image',
    src: imageOne,
    name: 'cover-photo.jpeg',
    alt: 'cover-photo.jpeg',
    size: 245_760,
    downloadHref: imageOne,
  },
  {
    kind: 'video',
    src: videoPreviewSrc,
    name: 'clip-preview.mp4',
    poster: imageTwo,
    size: 7_340_032,
    downloadHref: createDownloadHref('clip-preview.mp4', 'video/mp4'),
    controls: true,
  },
  {
    kind: 'image',
    src: imageThree,
    name: 'gallery-photo.png',
    alt: 'gallery-photo.png',
    size: 318_464,
    downloadHref: imageThree,
  },
]

const openMediaGalleryDemo = (index: number) => {
  mediaGalleryIndex.value = index
  mediaGalleryOpen.value = true
}

const openFileCardMedia = (name: string) => {
  const index = mediaGalleryItems.findIndex((item) => item.name === name)

  if (index < 0) return

  openMediaGalleryDemo(index)
}

const progressValue = ref(65)
const circleProgress = ref(72)
const qrValue = ref('https://nmorph-ui-kit.example/sandbox')
const currentPage = ref(4)
const activeCalendarDate = ref(new Date(2026, 4, 5))
const selectedCalendarDates = ref([new Date(2026, 4, 7), new Date(2026, 4, 9)])
const selectedCalendarRange = ref([new Date(2026, 4, 12), new Date(2026, 4, 18)])
const selectedEmoji = ref('🙂')
const collapseValue = ref(['availability'])
const tags = ref([
  { text: 'New', value: 'new', thickness: 'thin' as const },
  { text: 'Stable', value: 'stable', removable: false },
  { text: 'Preview', value: 'preview', design: 'plain' as const },
])
const plainTags = ref([
  { text: 'New', value: 'new', thickness: 'thin' as const },
  { text: 'Stable', value: 'stable', removable: false },
  { text: 'Preview', value: 'preview', color: 'var(--nmorph-gray-color)' },
])

const flatRibbonExamples = [
  { corner: 'top-left', value: 'Flat TL', label: 'Top left', offsetX: 0, offsetY: 0 },
  { corner: 'top-right', value: 'Flat TR', label: 'Top right', offsetX: 0, offsetY: 0 },
  { corner: 'bottom-left', value: 'Flat BL', label: 'Bottom left', offsetX: 8, offsetY: 8 },
  { corner: 'bottom-right', value: 'Flat BR', label: 'Bottom right', offsetX: 0, offsetY: 0 },
] as const

const tableData = ref([
  { name: 'Avatar', status: 'Ready', count: 12 },
  { name: 'Progress', status: 'Review', count: 8 },
  { name: 'Table', status: 'Ready', count: 21 },
])

const tableSort = ref<Record<string, NmorphSortOrderType>>({
  name: 'ascending',
  count: 'descending',
})

interface BasicTableCell {
  date: string
  name: string
  address: string
}

const basicTableData = ref<BasicTableCell[]>([
  {
    date: '2023-10-10',
    name: 'Alice',
    address: '123 Maple Ave, New York',
  },
  {
    date: '2023-10-09',
    name: 'Bob',
    address: '456 Elm St, Chicago',
  },
  {
    date: '2023-10-08',
    name: 'Charlie',
    address: '789 Pine St, San Francisco',
  },
  {
    date: '2023-10-07',
    name: 'Diana',
    address: '321 Oak St, Seattle',
  },
  {
    date: '2023-10-06',
    name: 'Ethan',
    address: '654 Birch Rd, Austin',
  },
  {
    date: '2023-10-05',
    name: 'Fiona',
    address: '987 Cedar Blvd, Miami',
  },
  {
    date: '2023-10-04',
    name: 'George',
    address: '147 Spruce St, Denver',
  },
])
const basicTableSort = ref<NmorphTableSortType>({
  date: 'descending',
  name: 'ascending',
})
const basicTableBordered = ref(false)
const basicTableDesign = ref<NmorphElementDesignType>('nmorph')
const basicTableHighlightRowOnHover = ref(false)
const basicTableDesignProps = computed(() =>
  basicTableDesign.value === 'plain'
    ? { design: 'plain' as const, bordered: basicTableBordered.value }
    : { design: 'nmorph' as const }
)
const basicTableHighlightRowOnHoverText = computed(() =>
  basicTableHighlightRowOnHover.value
    ? 'Disable row highlight on hover'
    : 'Enable row highlight on hover'
)
const toggleBasicTableDesign = () => {
  if (basicTableDesign.value === 'nmorph') {
    basicTableBordered.value = true
    basicTableDesign.value = 'plain'
    return
  }

  basicTableBordered.value = false
  basicTableDesign.value = 'nmorph'
}
const clickBasicTableRow = (data: NmorphDataTableElRecordType) => {
  alert(`My name is ${data.name}!`)
}

const selectedEmojiLanguage = ref<NmorphEmojiLanguage>('en')
const emojiLocale = ref<NmorphEmojiLocale | null>(null)
const emojiLoading = ref(false)
const emojiLoadToken = ref(0)
const fallbackEmojiI18n: INmorphEmojiPickerI18n = {
  searchPlaceholder: 'Search emoji',
  searchLabel: 'Search emoji',
  quickLabel: 'Frequent reactions',
  expandLabel: 'Open emoji picker',
  collapseLabel: 'Collapse emoji picker',
  noResults: 'No emoji found',
  categoryLabel: 'Emoji categories',
  resultsLabel: 'Emoji results',
}
const emojiData = computed<NmorphEmojiPickerDataSource>(() => emojiLocale.value?.data || [])
const emojiQuickList = computed(() => emojiLocale.value?.quickList || [])
const emojiI18n = computed(() => emojiLocale.value?.i18n || fallbackEmojiI18n)

const virtualItems = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `Virtual item ${index + 1}`,
  description: index % 3 === 0 ? 'Dynamic row with a little more content.' : 'Compact row.',
}))

type VirtualItem = (typeof virtualItems)[number]

const getVirtualItem = (item: unknown): VirtualItem => item as VirtualItem

watch(
  selectedEmojiLanguage,
  async (language) => {
    const token = emojiLoadToken.value + 1

    emojiLoadToken.value = token
    emojiLoading.value = true

    try {
      const locale = await loadNmorphEmojiLocale(language)

      if (emojiLoadToken.value !== token) return
      emojiLocale.value = locale
    } finally {
      if (emojiLoadToken.value === token) emojiLoading.value = false
    }
  },
  { immediate: true }
)

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
        <div class="badge-dot-demo">
          <NmorphBadge type="dot" color="var(--nmorph-error-color)" :dot-size="10">
            <NmorphButton text="Dot" />
          </NmorphBadge>
        </div>
        <NmorphBadge :value="12" color="var(--nmorph-success-color)">
          <template #value="{ displayValue }">
            <div class="badge-value">
              <NmorphIcon width="10px" height="10px" color="currentColor"><NmorphIconUsers /></NmorphIcon>
              <span>{{ displayValue }}</span>
            </div>
          </template>
          <NmorphButton text="Slot" />
        </NmorphBadge>
        <NmorphBadge value="Top right" type="ribbon" ribbon-corner="top-right">
          <div class="badge-ribbon-card">Ribbon</div>
        </NmorphBadge>
        <NmorphBadge value="asdf" type="ribbon" :offset-x="20" ribbon-corner="top-left" color="var(--nmorph-error-color)">
          <div class="badge-ribbon-card">Corner</div>
        </NmorphBadge>
        <NmorphBadge value="Bottom right" type="ribbon" ribbon-corner="bottom-right" color="var(--nmorph-warn-color)">
          <div class="badge-ribbon-card">Bottom</div>
        </NmorphBadge>
        <NmorphBadge
          v-for="example in flatRibbonExamples"
          :key="example.corner"
          :value="example.value"
          type="ribbon"
          :ribbon-corner="example.corner"
          :ribbon-tilt="false"
          :offset-x="example.offsetX"
          :offset-y="example.offsetY"
          color="var(--nmorph-success-color)"
        >
          <div class="badge-ribbon-card">{{ example.label }}</div>
        </NmorphBadge>
        <NmorphBadge value="Tiny" type="ribbon" size="tiny" ribbon-corner="bottom-right">
          <div class="badge-ribbon-card">Tiny</div>
        </NmorphBadge>
        <NmorphBadge value="Tag" type="tag" size="extra-small" />
        <NmorphBadge value="Base Tag" type="tag" size="base" />
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
            <NmorphButton text="Create dashboard" thickness="thin" />
          </template>
        </NmorphEmpty>
        <NmorphEmpty
          design="plain"
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
        <NmorphAvatar :src="imageOne" :preview-src="[imageOne, imageTwo, imageThree]" preview :size="56" design="plain" />
        <NmorphAvatar name="John Doe" :size="56" />
        <NmorphAvatar name="Alex Smith" :size="72" shape="square" />
        <NmorphAvatar :src="brokenImage" name="Broken Image" :size="56" />
        <NmorphAvatar :size="56" :frame-border="0" :image-padding="0" />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphImage">
      <div class="row">
        <NmorphImage
          class="image-demo"
          :src="imageOne"
          alt="Cover"
          fit="cover"
          :width="180"
          :height="120"
        />
        <NmorphImage
          class="image-demo"
          :src="imageTwo"
          alt="Contain"
          fit="contain"
          :width="180"
          :height="120"
          :frame-border="0"
        />
        <NmorphImage class="image-demo" :src="brokenImage" :width="180" :height="120" load-failed-text="Load failed" />
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

    <SandboxSection title="NmorphMediaGallery">
      <div class="media-gallery-demo">
        <NmorphMediaGallery
          v-model="mediaGalleryOpen"
          :items="mediaGalleryItems"
          :active-index="mediaGalleryIndex"
          height="235px"
          show-trigger
          @update:active-index="mediaGalleryIndex = $event"
        />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphFileCard">
      <div class="file-card-grid">
        <div v-for="file in fileCardExamples" :key="file.props.name" class="file-card-demo">
          <span class="file-card-demo__label">{{ file.label }}</span>
          <NmorphFileCard v-bind="file.props" @open="openFileCardMedia(file.props.name)" />
        </div>
      </div>
      <div class="file-card-grid file-card-grid--custom-actions">
        <div v-for="file in fileCardCustomActionExamples" :key="file.props.name" class="file-card-demo">
          <span class="file-card-demo__label">{{ file.label }}</span>
          <NmorphFileCard v-bind="file.props" @open="openFileCardMedia(file.props.name)">
            <template #actions="{ fileName }">
              <button class="file-card-demo__close" type="button" :aria-label="`Remove ${fileName}`" @click.stop>
                <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
                  <NmorphIconClose />
                </NmorphIcon>
              </button>
            </template>
          </NmorphFileCard>
        </div>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphEmojiPicker">
      <div class="emoji-toolbar">
        <NmorphButton
          v-for="language in nmorphEmojiLanguageOptions"
          :key="language.value"
          class="emoji-toolbar__button"
          :class="{ 'emoji-toolbar__button--selected': selectedEmojiLanguage === language.value }"
          :text="language.label"
          thickness="thin"
          :disabled="emojiLoading"
          @click="selectedEmojiLanguage = language.value"
        />
      </div>
      <div class="emoji-demo">
        <NmorphEmojiPicker
          :language="selectedEmojiLanguage"
          :data-source="emojiData"
          :i18n="emojiI18n"
          :quick-list="emojiQuickList"
          :initial-expanded="false"
          :disabled="emojiLoading"
          @select="selectedEmoji = $event"
        />
        <NmorphEmojiPicker
          :language="selectedEmojiLanguage"
          :data-source="emojiData"
          :i18n="emojiI18n"
          :initial-expanded="true"
          :disabled="emojiLoading"
          @select="selectedEmoji = $event"
        />
      </div>
      <p class="hint">selected: {{ selectedEmoji }}</p>
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

    <SandboxSection title="NmorphQRCode">
      <div class="qr-demo">
        <NmorphQRCode :value="qrValue" :size="172" title="Sandbox QR code" />
        <div class="stack">
          <p class="hint">encoded value</p>
          <code>{{ qrValue }}</code>
          <NmorphButton text="Use docs URL" thickness="thin" @click="qrValue = 'https://nmorph-ui-kit.example/docs'" />
        </div>
      </div>
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
      <div class="table-demo-stack">
        <div class="table-actions">
          <NmorphButton text="Toggle design" @click="toggleBasicTableDesign" />
          <NmorphButton
            :text="basicTableHighlightRowOnHoverText"
            @click="basicTableHighlightRowOnHover = !basicTableHighlightRowOnHover"
          />
          <p class="hint">sort: {{ basicTableSort }}</p>
        </div>
        <NmorphTable
          :data="basicTableData"
          :row-hover="basicTableHighlightRowOnHover"
          :sort="basicTableSort"
          v-bind="basicTableDesignProps"
        >
          <NmorphTableColumn prop="date" label="Date" alignment="left" width="100" />
          <NmorphTableColumn prop="name" label="Name" />
          <NmorphTableColumn prop="address" label="Address" />
          <NmorphTableColumn prop="operations" label="Operations">
            <template #default="{ scope }">
              <NmorphTableCell v-for="(cellData, index) in scope.rows" :key="index" :row="index">
                <NmorphButton
                  text="Click me!"
                  fill
                  borderless
                  design="plain"
                  @click="clickBasicTableRow(cellData)"
                />
              </NmorphTableCell>
            </template>
          </NmorphTableColumn>
        </NmorphTable>

        <NmorphTable
          :data="tableData"
          :sort="tableSort"
          row-hover
          design="nmorph"
          :cell-height="44"
          row-hover-background="color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent)"
        >
          <NmorphTableColumn prop="name" label="Name" width="180" alignment="left" />
          <NmorphTableColumn prop="status" label="Status" width="160">
            <template #default="{ scope }">
              <NmorphTableCell v-for="(_, index) in scope.rows" :key="index" :row="index">
                <NmorphBadge
                  :value="String(scope.rows[index].status)"
                  type="tag"
                  color="var(--nmorph-success-color)"
                />
              </NmorphTableCell>
            </template>
          </NmorphTableColumn>
          <NmorphTableColumn prop="count" label="Count" width="120" alignment="right" />
        </NmorphTable>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphVirtualList">
      <NmorphVirtualList
        class="virtual-list-demo"
        :items="virtualItems"
        item-key="id"
        :item-height="52"
        :overscan="8"
        height="260px"
      >
        <template #default="{ item }">
          <div class="virtual-list-demo__item">
            <strong>#{{ getVirtualItem(item).id }}</strong>
            <div>
              <span>{{ getVirtualItem(item).title }}</span>
              <small>{{ getVirtualItem(item).description }}</small>
            </div>
          </div>
        </template>
      </NmorphVirtualList>
    </SandboxSection>

    <SandboxSection title="NmorphTagList">
      <div class="stack">
        <NmorphTagList v-model="tags" />
        <NmorphTagList v-model="plainTags" design="plain" color="var(--nmorph-accent-color)" />
        <div class="row">
          <NmorphTagItem text="Thin" value="thin" thickness="thin" />
          <NmorphTagItem text="Default" value="default" removable />
          <NmorphTagItem text="Thick" value="thick" thickness="thick" design="plain" color="var(--nmorph-warn-color)" />
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
        <NmorphCollapseItem name="custom" :block="false" thickness="thin">
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

.emoji-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.emoji-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.emoji-toolbar__button :deep(.nmorph-button__content) {
  min-width: 42px;
}

.emoji-toolbar__button--selected :deep(.nmorph-button__content) {
  color: var(--nmorph-text-color);
  background: color-mix(in srgb, var(--nmorph-text-color) 9%, var(--nmorph-main-color));
  box-shadow: var(--nmorph-shadow-inset);
}

.emoji-toolbar__button--selected :deep(.nmorph-button__content span) {
  color: var(--nmorph-text-color);
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

.table-demo-stack {
  display: grid;
  gap: 24px;
}

.table-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.table-actions p {
  margin: 0;
}

.qr-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.qr-demo code {
  max-width: 420px;
  padding: 8px 10px;
  overflow-wrap: anywhere;
  border-radius: 8px;
  background: color-mix(in srgb, var(--nmorph-text-color) 8%, transparent);
}

.virtual-list-demo {
  max-width: 520px;
}

.virtual-list-demo__item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 12px;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--nmorph-text-color) 12%, transparent);
}

.virtual-list-demo__item div {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.virtual-list-demo__item small {
  color: var(--nmorph-semi-contrast-text-color);
}

.badge-value {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-ribbon-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 110px;
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-outset);
}

.media-gallery-demo {
  max-width: 680px;
}

.file-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  align-items: start;
}

.file-card-grid--custom-actions {
  margin-top: 14px;
}

.file-card-demo {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.file-card-demo__label {
  overflow: hidden;
  color: var(--nmorph-semi-contrast-text-color);
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.file-card-demo__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  padding: 0;
  color: var(--nmorph-contrast-text-color);
  background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
  border: 0;
  border-radius: var(--default-border-radius);
  cursor: pointer;
}

.file-card-demo__close:hover {
  background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
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
  left: 12px;
}

:deep(.nmorph-carousel__next) {
  right: 12px;
}

:deep(.nmorph-carousel__action-btn .nmorph-icon) {
  --nmorph-private-icon-color: #fff;
}
</style>
