<script setup lang="ts">
import { NmorphAlert, NmorphAlertType } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const initialAlerts: Record<
  string,
  {
    type: keyof typeof NmorphAlertType;
    closable: boolean;
    closed: boolean;
    id: string;
  }
  > = {
    "1": { type: "info", closable: true, closed: false, id: "1" },
    "2": { type: "success", closable: false, closed: false, id: "2" },
    "3": { type: "error", closable: true, closed: false, id: "3" },
    "4": { type: "warning", closable: true, closed: false, id: "4" },
  };

  const alerts = ref(initialAlerts);

  const closeHandler = (id: string) => {
    alerts.value[id].closed = true;
  };
<\/script>
`;

const templateData = `
<template>
  <div class="alert-basic-usage-overview">
    <div class="first-row">
      <div v-for="(alert, idx) in alerts" :key="idx">
        <NmorphAlert
          v-if="!alert.closed"
          :content="$t('overview.alert.basic-usage.content')"
          :title="$t('overview.alert.basic-usage.title')"
          v-bind="alert"
          @close="() => closeHandler(alert.id)"
        />
      </div>
    </div>
    <div class="second-row">
      <NmorphAlert
        html="<span>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span><br><p>Lorem ipsum</p>"
        fill
        :bordered="false"
        :show-icon="false"
      />
    </div>
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .alert-basic-usage-overview {
    width: 100%;
    .first-row {
      display: flex;
      margin-bottom: 8px;
    }
    .second-row {
      span,
      p {
        color: var(--nmorph-white-color);
      }
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const initialAlerts: Record<
  string,
  {
    type: keyof typeof NmorphAlertType;
    closable: boolean;
    closed: boolean;
    id: string;
  }
> = {
  "1": { type: "info", closable: true, closed: false, id: "1" },
  "2": { type: "success", closable: false, closed: false, id: "2" },
  "3": { type: "error", closable: true, closed: false, id: "3" },
  "4": { type: "warning", closable: true, closed: false, id: "4" },
};

const alerts = reactive(initialAlerts);

const closeHandler = (id: string) => {
  alerts[id].closed = true;
};
</script>

<template>
  <div id="content-basic-usage">
    <attribute
      :header="$t('overview.basic-usage')"
      :codeToCopy="code"
      info-name="alert.basic-usage"
    >
      <template #overview>
        <div class="alert-basic-usage-overview">
          <ClientOnly>
            <div class="first-row">
              <div v-for="(alert, idx) in alerts" :key="idx">
                <NmorphAlert
                  v-if="!alert.closed"
                  :content="$t('overview.alert.basic-usage.content')"
                  :title="$t('overview.alert.basic-usage.title')"
                  v-bind="alert"
                  @close="() => closeHandler(alert.id)"
                />
              </div>
            </div>
            <div class="second-row">
              <NmorphAlert
                html="<span>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span><br><p>Lorem ipsum</p>"
                fill
                :bordered="false"
                :show-icon="false"
              />
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
.alert-basic-usage-overview {
  width: 100%;
  .first-row {
    display: flex;
    margin-bottom: 8px;
  }
  .nmorph-alert {
    margin-right: 8px;
  }
  .second-row {
    span,
    p {
      color: var(--nmorph-white-color);
    }
  }
}
</style>
