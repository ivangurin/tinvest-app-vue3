<template>
  <div>
    <Toast position="top-right" />
    <h2>Positions</h2>
    <div v-if="showPositions === true">
      <DataTable
        class="p-datatable-sm"
        :value="positions"
        showGridlines
        selectionMode="single"
        scrollHeight="flex"
      >
        <Column field="ticker" header="Ticker" :sortable="true"></Column>
        <Column field="text" header="Text" :sortable="true"></Column>
        <Column
          field="quantity"
          header="Quantity"
          :sortable="true"
          class="p-text-right"
        ></Column>
        <Column
          field="price"
          header="Price"
          :sortable="true"
          class="p-text-right"
        >
          <template #body="slotProps">
            {{
              formatCurrency(slotProps.data.price) +
              " " +
              slotProps.data.currency
            }}
          </template>
        </Column>
        <Column
          field="profit"
          header="Profit"
          :sortable="true"
          class="p-text-right"
        >
          <template #body="slotProps">
            {{
              formatCurrency(slotProps.data.profit) +
              " " +
              slotProps.data.currency
            }}
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column
              footer="Totals:"
              :colspan="4"
              footerStyle="text-align:right"
            />
            <Column :footer="totals.profit" class="p-text-right" />
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
    <div v-if="showLoading === true">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script>
export default {
  name: "positions",
  data() {
    return {
      showPositions: false,
      showLoading: false,
      positions: [],
    };
  },

  mounted() {
    let errorsExist = false;

    if (!this.settings.url) {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "No URL provided",
        life: 5000,
      });

      errorsExist = true;
    }

    if (!this.settings.token) {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "No Token provided",
        life: 5000,
      });
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

      const request = new Request(this.settings.url + "/positions", {
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

        let data = await response.json();

        this.positions = data;

        this.positions.sort((a, b) =>
          a.ticker < b.ticker ? -1 : a.ticker > b.ticker ? 1 : 0
        );

        this.showPositions = true;
      } catch (e) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: e,
          life: 5000,
        });
      }
      this.showLoading = false;
    },

    formatCurrency(value) {
      let formater = new Intl.NumberFormat("ru-RU");
      let text = formater.format(Math.round(value * 100) / 100);
      return text;
    },
  },

  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    totals() {
      if (this.positions.length === 0) {
        return;
      }

      let profit = new Map();

      this.positions.forEach((position) => {
        let value = profit.get(position.currency);

        if (!value) {
          value = 0;
        }

        if (!profit[position.currency]) {
          profit[position.currency] = 0;
        }

        value += position.profit;

        profit.set(position.currency, value);
      });

      let textProfit = "";

      profit.forEach((value, key) => {
        if (textProfit !== "") {
          textProfit += `\n\r`;
        }

        textProfit += `${this.formatCurrency(value)} ${key}`;
      });

      return {
        profit: textProfit,
      };
    },
  },

  components: {},
};
</script>