<template>
  <Toast position="top-right" />
  <h2>Operations for {{ ticker }}</h2>
  <ProgressSpinner v-if="showLoading" />
  <div v-if="showOperations === true">
    <DataTable
      class="p-datatable-sm"
      :value="operations"
      showGridlines
      stripedRows
      selectionMode="single"
      scrollHeight="flex"
    >
      <Column field="time" header="Time" :sortable="true">
        <template #body="slotProps">
          {{ formatDateTime(new Date(slotProps.data.time)) }}
        </template>
      </Column>

      <Column field="type" header="Type" :sortable="true"></Column>

      <Column
        field="quantity"
        header="Quantity"
        :sortable="true"
        class="p-text-right"
      >
        <template #body="slotProps">
          {{ formatQuantity(slotProps.data.quantity) }}
        </template>
      </Column>

      <Column
        field="price"
        header="Price"
        :sortable="true"
        class="p-text-right"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price, slotProps.data.currency) }}
        </template>
      </Column>

      <Column
        field="value"
        header="Value"
        :sortable="true"
        class="p-text-right"
      >
        <template #body="slotProps">
          {{
            formatCurrency(
              slotProps.data.type === "Buy"
                ? slotProps.data.value * -1
                : slotProps.data.value,
              slotProps.data.currency
            )
          }}
        </template>
      </Column>

      <Column
        field="commission"
        header="Commission"
        :sortable="true"
        class="p-text-right"
      >
        <template #body="slotProps">
          {{
            formatCurrency(
              slotProps.data.commission * -1,
              slotProps.data.currency
            )
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "operations",
  data() {
    return {
      ticker: "",
      showOperations: false,
      showLoading: false,
      operations: [],
    };
  },

  mounted() {
    let route = useRoute();

    this.ticker = route.params.ticker;

    let errorsExist = false;

    if (!this.ticker) {
      this.showError("No ticker provided");
      errorsExist = true;
    }

    if (!this.settings.url) {
      this.showError("No API URL provided");
      errorsExist = true;
    }

    if (!this.settings.token) {
      this.showError("No Token providedd");
      errorsExist = true;
    }

    if (errorsExist) {
      return;
    }

    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.showLoading = true;

      let url = new URL(this.settings.url + "/operations/" + this.ticker);

      const request = new Request(url.toString(), {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.settings.token,
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      try {
        let response = await fetch(request);

        if (response.status !== 200) {
          let resposeText = await response.text();
          throw resposeText;
        }

        this.operations = await response.json();

        this.operations.sort((a, b) =>
          a.id > b.id ? -1 : a.id < b.id ? 1 : 0
        );

        this.showOperations = true;
      } catch (e) {
        this.showError(e);
      }

      this.showLoading = false;
    },

    formatDateTime(value) {
      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Europe/Moscow",
      };
      let formater = new Intl.DateTimeFormat("ru-RU", options);
      let text = formater.format(value);
      return text;
    },

    formatQuantity(value) {
      let formater = new Intl.NumberFormat("ru-RU");
      let text = formater.format(Math.round(value * 100) / 100);
      return text;
    },

    formatCurrency(value, currency) {
      let formater = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: currency,
      });
      let text = formater.format(Math.round(value * 100) / 100);
      return text;
    },

    showError(message) {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
    },
  },

  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },

  components: {},
};
</script>

<style scoped>
.row-green {
  background-color: green;
}
</style>
