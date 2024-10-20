<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = `
<template>
  <div class="elements">
    <div class="elements__element">
      <NmorphTooltip force-show>
        <NmorphButton text="button" />
        <template #content>
          <div class="content">
            tooltip
          </div>
        </template>
      </NmorphTooltip>
    </div>
    <div class="elements__element">
      <NmorphTooltip force-show position="right">
        <NmorphButton text="button" />
        <template #content>
          <div class="content">
            tooltip
          </div>
        </template>
      </NmorphTooltip>
    </div>
    <div class="elements__element">
      <NmorphTooltip force-show position="bottom">
        <NmorphButton text="button" />
        <template #content>
          <div class="content">
            tooltip
          </div>
        </template>
      </NmorphTooltip>
    </div>
    <div class="elements__element">
      <NmorphTooltip force-show position="left">
        <NmorphButton text="button" />
        <template #content>
          <div class="content">
            tooltip
          </div>
        </template>
      </NmorphTooltip>
    </div>
  </div>
</template>
`;

const cssData = `
<style lang="scss">
.elements {
  display: flex;
}
.elements__element {
  margin-right: 8px;
}
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-position">
    <attribute
      header="Position"
      :subtitle="$t('overview.tooltip.position.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tooltip-position-overview">
          <ClientOnly>
            <div class="elements">
              <div class="elements__element">
                <NmorphTooltip force-show>
                  <NmorphButton :text="$t('overview.tooltip.text.button')" />
                  <template #content>
                    <div class="content">
                      {{ $t("overview.tooltip.text.tooltip") }}
                    </div>
                  </template>
                </NmorphTooltip>
              </div>
              <div class="elements__element">
                <NmorphTooltip force-show position="bottom">
                  <NmorphButton :text="$t('overview.tooltip.text.button')" />
                  <template #content>
                    <div class="content">
                      {{ $t("overview.tooltip.text.tooltip") }}
                    </div>
                  </template>
                </NmorphTooltip>
              </div>
              <div class="elements__element">
                <NmorphTooltip force-show position="right">
                  <NmorphButton :text="$t('overview.tooltip.text.button')" />
                  <template #content>
                    <div class="content">
                      {{ $t("overview.tooltip.text.tooltip") }}
                    </div>
                  </template>
                </NmorphTooltip>
              </div>
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.tooltip-position-overview {
  .elements {
    display: flex;
  }
  .elements__element {
    margin-right: 8px;
  }
}
</style>
