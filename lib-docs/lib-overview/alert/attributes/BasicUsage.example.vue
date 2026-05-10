<script setup lang="ts">
import { NmorphAlert, NmorphAlertType } from "@nmorph/nmorph-ui-kit";

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

<style lang="scss">
.alert-basic-usage-overview {
  width: 100%;

  .first-row {
    display: flex;
    flex-wrap: wrap;
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
