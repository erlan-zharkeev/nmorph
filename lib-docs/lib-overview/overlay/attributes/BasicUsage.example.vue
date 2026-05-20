<script setup lang="ts">
import { NmorphOverlay, NmorphButton, NmorphCard } from "@nmorph/nmorph-ui-kit";

const showDefault = ref(false);
const showTransparent = ref(false);
</script>

<template>
  <div class="overlay-basic-usage-overview">
    <ClientOnly>
      <div class="overlay-content">
        <div class="overlay-element">
          <NmorphButton text="Show default" @click="showDefault = true" />
          <NmorphOverlay
            :show="showDefault"
            @on-outside-click="showDefault = false"
          >
            <div class="overlay-slot-element">
              <div class="overlay-slot__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
          </NmorphOverlay>
        </div>
        <div class="overlay-element">
          <NmorphButton
            text="Show transparent"
            @click="showTransparent = true"
          />
          <NmorphOverlay
            :show="showTransparent"
            transparent
            @on-outside-click="showTransparent = false"
          >
            <div class="overlay-slot-element">
              <NmorphCard>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </NmorphCard>
            </div>
          </NmorphOverlay>
        </div>
      </div>
    </ClientOnly>
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
