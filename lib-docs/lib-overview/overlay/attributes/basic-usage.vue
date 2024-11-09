<script setup lang="ts">
import { NmorphOverlay, NmorphButton, NmorphCard } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const showDefault = ref(false);
  const showTransparent = ref(false);
<\/script>
`;

const templateData = `
<template>
  <div class="overlay-content">
    <div class="overlay-element">
      <NmorphButton
        :text="$t('overview.overlay.basic-usage.show-default')"
        @click="showDefault = true"
      />
      <NmorphOverlay
        :show="showDefault"
        @on-outside-click="showDefault = false"
      >
        <div class="overlay-slot-element">
          <div class="overlay-slot__content">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the
            1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </div>
        </div>
      </NmorphOverlay>
    </div>
    <div class="overlay-element">
      <NmorphButton
        :text="$t('overview.overlay.basic-usage.show-transparent')"
        @click="showTransparent = true"
      />
      <NmorphOverlay
        :show="showTransparent"
        transparent
        @on-outside-click="showTransparent = false"
      >
        <div class="overlay-slot-element">
          <NmorphCard>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the
            1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </NmorphCard>
        </div>
      </NmorphOverlay>
    </div>
  </div>
</template>
`;
const cssData = `
<style lang="scss">
  .overlay-basic-usage-overview {
    .overlay-slot-element {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .overlay-slot__content {
      background: var(--nmorph-main-color);
      padding: 8px;
    }
    .nmorph-button {
      margin-bottom: 8px;
    }
    .overlay-content {
      display: flex;
      flex-wrap: wrap;
    }
    .overlay-element {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const showDefault = ref(false);
const showTransparent = ref(false);
</script>

<template>
  <div id="content-basic-usage">
    <attribute
      :header="$t('overview.basic-usage')"
      :subtitle="$t('overview.overlay.basic-usage.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="overlay-basic-usage-overview">
          <ClientOnly>
            <div class="overlay-content">
              <div class="overlay-element">
                <NmorphButton
                  :text="$t('overview.overlay.basic-usage.show-default')"
                  @click="showDefault = true"
                />
                <NmorphOverlay
                  :show="showDefault"
                  @on-outside-click="showDefault = false"
                >
                  <div class="overlay-slot-element">
                    <div class="overlay-slot__content">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                  </div>
                </NmorphOverlay>
              </div>
              <div class="overlay-element">
                <NmorphButton
                  :text="$t('overview.overlay.basic-usage.show-transparent')"
                  @click="showTransparent = true"
                />
                <NmorphOverlay
                  :show="showTransparent"
                  transparent
                  @on-outside-click="showTransparent = false"
                >
                  <div class="overlay-slot-element">
                    <NmorphCard>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </NmorphCard>
                  </div>
                </NmorphOverlay>
              </div>
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.overlay-basic-usage-overview {
  .overlay-slot-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .overlay-slot__content {
    background: var(--nmorph-main-color);
    padding: 8px;
  }
  .nmorph-button {
    margin-bottom: 8px;
  }
  .overlay-content {
    display: flex;
    flex-wrap: wrap;
  }
  .overlay-element {
    margin-right: 8px;
  }
}
</style>
