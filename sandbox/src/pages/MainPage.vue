<template>
  <div class="wrapper">
    <div class="docs-top-bar__search">
      <div class="badge-value-overview__element">
        <NmorphBadge :value="1">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
      <!-- <div class="badge-value-overview__element">
        <NmorphBadge value="abc" :offsetX="-25" :offsetY="-15">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div> -->
    </div>
    <NmorphAutocomplete
      v-model="value"
      :list="variants"
      :actionCallback="getVariants"
    />
    <NmorphAlert
      v-for="color in ['info', 'success', 'error', 'warning']"
      :key="color"
      content="Hello, I'm alert content"
      title="Hi, Title is very important"
      :type="color"
      class="additional-class"
    />
    <NmorphYearMonthPicker :currentDate="new Date()" />
    <NmorphButton class="btn" @click="addNotification"
      >Add notification</NmorphButton
    >
    <NmorphButton class="btn" @click="openModal">Open modal</NmorphButton>
    <div class="element">
      <NmorphLink disabled type="accent">Accent</NmorphLink>
      <NmorphLink disabled type="success">Success</NmorphLink>
      <NmorphLink disabled type="warning">Warning</NmorphLink>
      <NmorphLink disabled type="error">Error</NmorphLink>
      <NmorphLink disabled underline>Underlined</NmorphLink>
      {{ $t("custom") }}
    </div>
    <div class="slider">
      <div class="docs-top-bar__left">
        <NmorphCheckbox
          class="docs-top-bar__burger"
          label="menu"
          design="button"
        >
          <template #label>
            <NmorphIcon name="burger" />
          </template>
        </NmorphCheckbox>
        <!-- <NmorphSlider
          :show-tooltip="true"
          :model-value="coords.y"
          :min="0"
          :max="560"
          :step="20"
          @update:model-value="updateSliderHandler"
        />
        <div class="slider__value">{{ coords.y }}px</div> -->
      </div>
      <NmorphScroll
        height="300px"
        class="docs-scroll__scroll"
        update-only-on-end
        v-model="coords"
        ref="scroll"
      >
        <div class="docs-scroll__box" v-for="i in elements" :key="i">
          {{ i }}
        </div>
      </NmorphScroll>
    </div>
  </div>
  <NmorphNotificationProvider :notifications="notifications" :quantity="3" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphAutocomplete,
  NmorphAlert,
  NmorphYearMonthPicker,
  NmorphButton,
  NmorphTextInput,
  NmorphIcon,
  NmorphCheckbox,
  NmorphAvatar,
  NmorphBadge,
} from "./../../../library/src/components";
import NmorphNotificationProvider from "./../../../library/src/components/providers/nmorph-notification-provider/NmorphNotificationProvider.vue";
import { useNmorphNotification } from "./../../../library/src/hooks";
import cat from "./../assets/images/cat.png";

interface ICoords {
  x: number;
  y: number;
}

const elements = ref(30);
const coords = ref<ICoords>({ x: 0, y: 0 });

const updateSliderHandler = (value: number) => {
  if (scroll.value) scroll.value.moveTo({ x: 0, y: value });
};

const updateScrollHandler = (newValue: ICoords) => {
  coords.value = newValue;
};

const scroll = ref(null);

const searchQuery = ref("");

const { notifications, notify } = useNmorphNotification();
const count = ref(8);

const addNotification = () => {
  count.value += 1;
  notify({
    content: `Yay!, ${count.value}`,
    duration: 0,
    title: "Title",
    type: "error",
  });
};

const showDialog = ref(false);

const openModal = () => {
  showDialog.value = true;
};

const value = ref("");
const variants = ref([]);

const getVariants = async () => {
  return fetch("https://rickandmortyapi.com/api/character/?page=19")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      variants.value = data.results.map((el: any) => {
        return {
          value: el.name,
        };
      });
    });
};
</script>

<style lang="scss">
// .nmorph-scroll {
//   height: 300px;
// }
.docs-top-bar__search {
  display: flex;
  padding: 40px;
}

.nmorph-badge {
  --dot-size: 8px;
}

.avatar {
  margin: 1rem;
}
.docs-scroll__scroll {
  align-items: center;
  overflow-x: scroll;
  width: 200px;
}

.docs-scroll__box {
  margin-top: 1rem;
  width: 250px;
  background: #000;
}

.element {
  margin: 1rem;
}

.btn {
  margin: 40px;
}

.nmorph-divider {
  margin: 0 8px;
}

.wrapper {
  // margin: 50px;
}

.nmorph-alert {
  margin-right: 8px;
}

.nmorph-link {
  margin-right: 8px;
}

.line {
  display: flex;
  .ml-2 {
    margin-left: 8px;
  }
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.additional-class {
  margin-top: 24px;
  margin-bottom: 24px;
}

.slider {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.slider__value {
  padding: 0 24px 0 12px;
  font-weight: 600;
}

.docs-scroll__scroll {
  text-align: center;
  // padding-right: 8px;
}
.slider {
  display: flex;
  flex-direction: column;
}
</style>
