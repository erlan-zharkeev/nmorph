<script setup lang="ts">
import { computed, reactive } from "vue";
import { notificationProvider } from "~/providers";

import {
  NmorphForm,
  NmorphFormItem,
  NmorphTextInput,
  NmorphIcon,
} from "@nmorph/nmorph-ui-kit";

import {
  NmorphIconAddLocation,
  NmorphIconAim,
  NmorphIconAlarmClock,
  NmorphIconApple,
  NmorphIconArchive,
  NmorphIconArrowDown,
  NmorphIconArrowLeft,
  NmorphIconArrowRight,
  NmorphIconArrowUp,
  NmorphIconAudio,
  NmorphIconAvatar,
  NmorphIconBack,
  NmorphIconBellFilled,
  NmorphIconBell,
  NmorphIconBicycle,
  NmorphIconBottomLeft,
  NmorphIconBottomRight,
  NmorphIconBottom,
  NmorphIconBurger,
  NmorphIconCalendar,
  NmorphIconCamera,
  NmorphIconCaretBottom,
  NmorphIconCaretLeft,
  NmorphIconCaretRight,
  NmorphIconCaretTop,
  NmorphIconCellphone,
  NmorphIconChatDotRound,
  NmorphIconChatDotSquare,
  NmorphIconChatLineRound,
  NmorphIconChatLineSquare,
  NmorphIconChatRound,
  NmorphIconChatSquare,
  NmorphIconCheck,
  NmorphIconChecked,
  NmorphIconCherry,
  NmorphIconChevronDoubleDown,
  NmorphIconChevronDown,
  NmorphIconChromeFilled,
  NmorphIconCircleCheckFilled,
  NmorphIconCircleCheck,
  NmorphIconCircleCloseFilled,
  NmorphIconCircleClose,
  NmorphIconCirclePlusFilled,
  NmorphIconCirclePlus,
  NmorphIconClock,
  NmorphIconClose,
  NmorphIconCloudy,
  NmorphIconCode,
  NmorphIconCoffeeCup,
  NmorphIconCoffee,
  NmorphIconCoin,
  NmorphIconCollectionTag,
  NmorphIconCollection,
  NmorphIconCompass,
  NmorphIconConnection,
  NmorphIconCoordinate,
  NmorphIconCopyDocument,
  NmorphIconCopy,
  NmorphIconCpu,
  NmorphIconCreditCard,
  NmorphIconCrop,
  NmorphIconCross,
  NmorphIconDeleteFilled,
  NmorphIconDelete,
  NmorphIconDessert,
  NmorphIconDiscount,
  NmorphIconDoc,
  NmorphIconDocumentAdd,
  NmorphIconDocumentChecked,
  NmorphIconDocumentCopy,
  NmorphIconDocumentDelete,
  NmorphIconDocumentRemove,
  NmorphIconDocument,
  NmorphIconDownload,
  NmorphIconEditPen,
  NmorphIconEdit,
  NmorphIconEnlarge,
  NmorphIconExpand,
  NmorphIconError,
  NmorphIconExit,
  NmorphIconExitSquare,
  NmorphIconEye,
  NmorphIconEyeBlocked,
  NmorphIconFailed,
  NmorphIconFiles,
  NmorphIconFilm,
  NmorphIconFilter,
  NmorphIconFinished,
  NmorphIconFlag,
  NmorphIconFold,
  NmorphIconFolderAdd,
  NmorphIconFolderChecked,
  NmorphIconFolderDelete,
  NmorphIconFolderOpened,
  NmorphIconFolder,
  NmorphIconFood,
  NmorphIconForkSpoon,
  NmorphIconFullScreen,
  NmorphIconGoblet,
  NmorphIconGoogle,
  NmorphIconGoldMedal,
  NmorphIconGoodsFilled,
  NmorphIconGoods,
  NmorphIconGrape,
  NmorphIconGrid,
  NmorphIconGuide,
  NmorphIconHandbag,
  NmorphIconHeadset,
  NmorphIconHistogram,
  NmorphIconHotWater,
  NmorphIconHouse,
  NmorphIconIceCreamRound,
  NmorphIconIceDrink,
  NmorphIconInfoFilled,
  NmorphIconInfo,
  NmorphIconImage,
  NmorphIconKey,
  NmorphIconKnifeFork,
  NmorphIconLightning,
  NmorphIconLink,
  NmorphIconList,
  NmorphIconLoader,
  NmorphIconLoading,
  NmorphIconLocationFilled,
  NmorphIconLocationInformation,
  NmorphIconLogo,
  NmorphIconLocation,
  NmorphIconLock,
  NmorphIconLollipop,
  NmorphIconMagicStick,
  NmorphIconMagnet,
  NmorphIconMale,
  NmorphIconManagement,
  NmorphIconMapLocation,
  NmorphIconMedal,
  NmorphIconMemo,
  NmorphIconMenu,
  NmorphIconMessageBox,
  NmorphIconMessage,
  NmorphIconMic,
  NmorphIconMicrophone,
  NmorphIconMinus,
  NmorphIconMinusThin,
  NmorphIconMoney,
  NmorphIconMonitor,
  NmorphIconMoon,
  NmorphIconMoreFilled,
  NmorphIconMore,
  NmorphIconMostlyCloudy,
  NmorphIconMouse,
  NmorphIconMug,
  NmorphIconMuteNotification,
  NmorphIconMute,
  NmorphIconNoSmoking,
  NmorphIconNotebook,
  NmorphIconNotification,
  NmorphIconOfficeBuilding,
  NmorphIconOperation,
  NmorphIconOpportunity,
  NmorphIconOrange,
  NmorphIconPaperclip,
  NmorphIconPartlyCloudy,
  NmorphIconPause,
  NmorphIconPear,
  NmorphIconPhoneFilled,
  NmorphIconPhone,
  NmorphIconPicture,
  NmorphIconPieChart,
  NmorphIconPlace,
  NmorphIconPlatform,
  NmorphIconPlay,
  NmorphIconPlus,
  NmorphIconPlusThin,
  NmorphIconPointer,
  NmorphIconPosition,
  NmorphIconPostCard,
  NmorphIconPouring,
  NmorphIconPresent,
  NmorphIconPriceTag,
  NmorphIconPrinter,
  NmorphIconPromotion,
  NmorphIconQuartzWatch,
  NmorphIconQuestionFilled,
  NmorphIconRank,
  NmorphIconReadingLamp,
  NmorphIconReading,
  NmorphIconRecord,
  NmorphIconRefreshLeft,
  NmorphIconRefreshRight,
  NmorphIconRefresh,
  NmorphIconRefrigerator,
  NmorphIconRemoveFilled,
  NmorphIconRemove,
  NmorphIconRight,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconScaleToOriginal,
  NmorphIconSchool,
  NmorphIconScissor,
  NmorphIconSearch,
  NmorphIconSelect,
  NmorphIconSell,
  NmorphIconSemiSelect,
  NmorphIconService,
  NmorphIconSetting,
  NmorphIconShare,
  NmorphIconShip,
  NmorphIconShop,
  NmorphIconShoppingBag,
  NmorphIconShoppingCartFull,
  NmorphIconShoppingCart,
  NmorphIconShrink,
  NmorphIconSmoking,
  NmorphIconSoccer,
  NmorphIconSoldOut,
  NmorphIconSortDown,
  NmorphIconSortUp,
  NmorphIconSort,
  NmorphIconStamp,
  NmorphIconStarFilled,
  NmorphIconStar,
  NmorphIconStop,
  NmorphIconSuccessFilled,
  NmorphIconSuccess,
  NmorphIconSugar,
  NmorphIconSunny,
  NmorphIconSunrise,
  NmorphIconSunset,
  NmorphIconSwitchButton,
  NmorphIconSwitchFilled,
  NmorphIconSwitch,
  NmorphIconTakeawayBox,
  NmorphIconTicket,
  NmorphIconTickets,
  NmorphIconTime,
  NmorphIconTimer,
  NmorphIconToiletPaper,
  NmorphIconTools,
  NmorphIconTopLeft,
  NmorphIconTopRight,
  NmorphIconTop,
  NmorphIconTrendCharts,
  NmorphIconTriangleDown,
  NmorphIconTrophyBase,
  NmorphIconTrophy,
  NmorphIconTurnOff,
  NmorphIconUmbrella,
  NmorphIconUnlock,
  NmorphIconUploadFilled,
  NmorphIconUpload,
  NmorphIconUserFilled,
  NmorphIconUser,
  NmorphIconUsers,
  NmorphIconVan,
  NmorphIconVideoCamera,
  NmorphIconVideoPause,
  NmorphIconVideoPlay,
  NmorphIconVideo,
  NmorphIconView,
  NmorphIconWalletFilled,
  NmorphIconWallet,
  NmorphIconWarnTriangleFilled,
  NmorphIconWarning,
  NmorphIconWatch,
  NmorphIconWindPower,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
} from "@nmorph/nmorph-ui-kit";

const iconList = {
  NmorphIconAddLocation,
  NmorphIconAim,
  NmorphIconAlarmClock,
  NmorphIconApple,
  NmorphIconArchive,
  NmorphIconArrowDown,
  NmorphIconArrowLeft,
  NmorphIconArrowRight,
  NmorphIconArrowUp,
  NmorphIconAudio,
  NmorphIconAvatar,
  NmorphIconBack,
  NmorphIconBellFilled,
  NmorphIconBell,
  NmorphIconBicycle,
  NmorphIconBottomLeft,
  NmorphIconBottomRight,
  NmorphIconBottom,
  NmorphIconBurger,
  NmorphIconCalendar,
  NmorphIconCamera,
  NmorphIconCaretBottom,
  NmorphIconCaretLeft,
  NmorphIconCaretRight,
  NmorphIconCaretTop,
  NmorphIconCellphone,
  NmorphIconChatDotRound,
  NmorphIconChatDotSquare,
  NmorphIconChatLineRound,
  NmorphIconChatLineSquare,
  NmorphIconChatRound,
  NmorphIconChatSquare,
  NmorphIconCheck,
  NmorphIconChecked,
  NmorphIconCherry,
  NmorphIconChevronDoubleDown,
  NmorphIconChevronDown,
  NmorphIconChromeFilled,
  NmorphIconCircleCheckFilled,
  NmorphIconCircleCheck,
  NmorphIconCircleCloseFilled,
  NmorphIconCircleClose,
  NmorphIconCirclePlusFilled,
  NmorphIconCirclePlus,
  NmorphIconClock,
  NmorphIconClose,
  NmorphIconCloudy,
  NmorphIconCode,
  NmorphIconCoffeeCup,
  NmorphIconCoffee,
  NmorphIconCoin,
  NmorphIconCollectionTag,
  NmorphIconCollection,
  NmorphIconCompass,
  NmorphIconConnection,
  NmorphIconCoordinate,
  NmorphIconCopyDocument,
  NmorphIconCopy,
  NmorphIconCpu,
  NmorphIconCreditCard,
  NmorphIconCrop,
  NmorphIconCross,
  NmorphIconDeleteFilled,
  NmorphIconDelete,
  NmorphIconDessert,
  NmorphIconDiscount,
  NmorphIconDoc,
  NmorphIconDocumentAdd,
  NmorphIconDocumentChecked,
  NmorphIconDocumentCopy,
  NmorphIconDocumentDelete,
  NmorphIconDocumentRemove,
  NmorphIconDocument,
  NmorphIconDownload,
  NmorphIconEditPen,
  NmorphIconEdit,
  NmorphIconEnlarge,
  NmorphIconExpand,
  NmorphIconError,
  NmorphIconExit,
  NmorphIconExitSquare,
  NmorphIconEye,
  NmorphIconEyeBlocked,
  NmorphIconFailed,
  NmorphIconFiles,
  NmorphIconFilm,
  NmorphIconFilter,
  NmorphIconFinished,
  NmorphIconFlag,
  NmorphIconFold,
  NmorphIconFolderAdd,
  NmorphIconFolderChecked,
  NmorphIconFolderDelete,
  NmorphIconFolderOpened,
  NmorphIconFolder,
  NmorphIconFood,
  NmorphIconForkSpoon,
  NmorphIconFullScreen,
  NmorphIconGoblet,
  NmorphIconGoogle,
  NmorphIconGoldMedal,
  NmorphIconGoodsFilled,
  NmorphIconGoods,
  NmorphIconGrape,
  NmorphIconGrid,
  NmorphIconGuide,
  NmorphIconHandbag,
  NmorphIconHeadset,
  NmorphIconHistogram,
  NmorphIconHotWater,
  NmorphIconHouse,
  NmorphIconIceCreamRound,
  NmorphIconIceDrink,
  NmorphIconInfoFilled,
  NmorphIconInfo,
  NmorphIconImage,
  NmorphIconKey,
  NmorphIconKnifeFork,
  NmorphIconLightning,
  NmorphIconLink,
  NmorphIconList,
  NmorphIconLoader,
  NmorphIconLoading,
  NmorphIconLocationFilled,
  NmorphIconLocationInformation,
  NmorphIconLogo,
  NmorphIconLocation,
  NmorphIconLock,
  NmorphIconLollipop,
  NmorphIconMagicStick,
  NmorphIconMagnet,
  NmorphIconMale,
  NmorphIconManagement,
  NmorphIconMapLocation,
  NmorphIconMedal,
  NmorphIconMemo,
  NmorphIconMenu,
  NmorphIconMessageBox,
  NmorphIconMessage,
  NmorphIconMic,
  NmorphIconMicrophone,
  NmorphIconMinus,
  NmorphIconMinusThin,
  NmorphIconMoney,
  NmorphIconMonitor,
  NmorphIconMoon,
  NmorphIconMoreFilled,
  NmorphIconMore,
  NmorphIconMostlyCloudy,
  NmorphIconMouse,
  NmorphIconMug,
  NmorphIconMuteNotification,
  NmorphIconMute,
  NmorphIconNoSmoking,
  NmorphIconNotebook,
  NmorphIconNotification,
  NmorphIconOfficeBuilding,
  NmorphIconOperation,
  NmorphIconOpportunity,
  NmorphIconOrange,
  NmorphIconPaperclip,
  NmorphIconPartlyCloudy,
  NmorphIconPause,
  NmorphIconPear,
  NmorphIconPhoneFilled,
  NmorphIconPhone,
  NmorphIconPicture,
  NmorphIconPieChart,
  NmorphIconPlace,
  NmorphIconPlatform,
  NmorphIconPlay,
  NmorphIconPlus,
  NmorphIconPlusThin,
  NmorphIconPointer,
  NmorphIconPosition,
  NmorphIconPostCard,
  NmorphIconPouring,
  NmorphIconPresent,
  NmorphIconPriceTag,
  NmorphIconPrinter,
  NmorphIconPromotion,
  NmorphIconQuartzWatch,
  NmorphIconQuestionFilled,
  NmorphIconRank,
  NmorphIconReadingLamp,
  NmorphIconReading,
  NmorphIconRecord,
  NmorphIconRefreshLeft,
  NmorphIconRefreshRight,
  NmorphIconRefresh,
  NmorphIconRefrigerator,
  NmorphIconRemoveFilled,
  NmorphIconRemove,
  NmorphIconRight,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconScaleToOriginal,
  NmorphIconSchool,
  NmorphIconScissor,
  NmorphIconSearch,
  NmorphIconSelect,
  NmorphIconSell,
  NmorphIconSemiSelect,
  NmorphIconService,
  NmorphIconSetting,
  NmorphIconShare,
  NmorphIconShip,
  NmorphIconShop,
  NmorphIconShoppingBag,
  NmorphIconShoppingCartFull,
  NmorphIconShoppingCart,
  NmorphIconShrink,
  NmorphIconSmoking,
  NmorphIconSoccer,
  NmorphIconSoldOut,
  NmorphIconSortDown,
  NmorphIconSortUp,
  NmorphIconSort,
  NmorphIconStamp,
  NmorphIconStarFilled,
  NmorphIconStar,
  NmorphIconStop,
  NmorphIconSuccessFilled,
  NmorphIconSuccess,
  NmorphIconSugar,
  NmorphIconSunny,
  NmorphIconSunrise,
  NmorphIconSunset,
  NmorphIconSwitchButton,
  NmorphIconSwitchFilled,
  NmorphIconSwitch,
  NmorphIconTakeawayBox,
  NmorphIconTicket,
  NmorphIconTickets,
  NmorphIconTime,
  NmorphIconTimer,
  NmorphIconToiletPaper,
  NmorphIconTools,
  NmorphIconTopLeft,
  NmorphIconTopRight,
  NmorphIconTop,
  NmorphIconTrendCharts,
  NmorphIconTriangleDown,
  NmorphIconTrophyBase,
  NmorphIconTrophy,
  NmorphIconTurnOff,
  NmorphIconUmbrella,
  NmorphIconUnlock,
  NmorphIconUploadFilled,
  NmorphIconUpload,
  NmorphIconUserFilled,
  NmorphIconUser,
  NmorphIconUsers,
  NmorphIconVan,
  NmorphIconVideoCamera,
  NmorphIconVideoPause,
  NmorphIconVideoPlay,
  NmorphIconVideo,
  NmorphIconView,
  NmorphIconWalletFilled,
  NmorphIconWallet,
  NmorphIconWarnTriangleFilled,
  NmorphIconWarning,
  NmorphIconWatch,
  NmorphIconWindPower,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
};

const form = reactive({
  searchText: {
    value: "",
    rules: [],
  },
});

const filteredIconNames = computed(() => {
  const searchText = form.searchText.value.trim().toLowerCase();
  const iconNames = Object.keys(iconList);
  if (!searchText) return iconNames;
  return iconNames.filter((iconName) => {
    const plainName = pascalToSpace(iconName.slice(10)).toLowerCase();
    return plainName.includes(searchText) || iconName.toLowerCase().includes(searchText);
  });
});

const copyToClipboard = async (value: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const clickIconHandler = async (iconName: string) => {
  const value = `<NmorphIcon>
    <${iconName} />
  </NmorphIcon>`;
  try {
    await copyToClipboard(value);
    notificationProvider.notify({
      content: `Copied`,
      duration: 2000,
      type: "success",
      width: "fit-content",
      closable: false,
      bordered: false,
    });
  } catch {
    notificationProvider.notify({
      content: `Copy failed`,
      duration: 2000,
      type: "error",
      width: "fit-content",
      closable: false,
      bordered: false,
    });
  }
};
</script>

<template>
  <ComponentOverview name="icon">
    <template #default>
      <div class="docs-icon" id="content-icon-list">
        <NmorphForm :value="form" class="docs-icon__search-icon-form">
          <NmorphFormItem id="searchText" class="docs-icon__search-field">
            <NmorphTextInput :placeholder="$t('overview.icon.search-icon')" v-model="form.searchText.value" />
          </NmorphFormItem>
        </NmorphForm>
        <div class="docs-icon__list-content nmorph--shadow-outset" v-if="filteredIconNames.length">
          <div class="docs-icon__list-el nmorph--shadow-outset" v-for="(el, idx) in filteredIconNames" :key="idx"
            @click="() => clickIconHandler(String(el))">
            <ClientOnly>
              <NmorphIcon size="medium">
                <!--@vue-ignore-->
                <component :is="iconList[el]" />
              </NmorphIcon>
            </ClientOnly>
            <span class="docs-icon__icon-name">{{
              pascalToSpace(el.slice(10)).toLowerCase()
              }}</span>
          </div>
        </div>
      </div>
    </template>
  </ComponentOverview>
</template>

<style lang="scss">
.docs-icon {
  .nmorph-form-item .nmorph-form-item__content {
    display: block;
  }

  :deep(.docs-icon__search-field) {
    width: 100%;
  }

  :deep(.nmorph-form__content) {
    width: 100%;
    display: flex;
  }

  :deep(.nmorph-alert) {
    padding: 8px;
  }

  :deep(.nmorph-alert .nmorph-alert__icon) {
    margin-right: 4px;
  }

  :deep(.nmorph-validation-icon) {
    display: none;
  }

  .docs-icon__list-content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 8px;
    margin: 20px 0;
    padding: 8px;
  }

  @include max-width-query(768) {
    .docs-icon__list-content {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include max-width-query(768) {
    .docs-icon__list-content {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include max-width-query(500) {
    .docs-icon__list-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include max-width-query(360) {
    .docs-icon__list-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .docs-icon__list-el {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    text-align: center;
    height: 80px;
    cursor: pointer;
  }

  .docs-icon__icon-name {
    margin-top: 4px;
  }
}
</style>
