<template>
  <div>
    <h2>Profit</h2>
    <Toast position="top-right" />

    <div v-if="showProfit === true">
      <DataTable
        :value="profit"
        class="p-datatable-sm"
        showGridlines
        selectionMode="single"
      >
        <ColumnGroup type="header">
          <Row>
            <Column
              header="Ticker"
              field="ticker"
              :sortable="true"
              :rowspan="2"
            />
            <Column header="Text" :rowspan="2" />
            <Column header="Currency" :rowspan="2" />
            <Column header="Buy" :colspan="4" />
            <Column header="Sell" :colspan="4" />
            <Column header="End" :colspan="3" />
            <Column header="Dividends" :colspan="2" />
            <Column header="Coupons" :colspan="2" />
            <Column header="Total" :colspan="2" />
          </Row>
          <Row>
            <Column header="Quantity"></Column>
            <Column header="Price"></Column>
            <Column header="Value"></Column>
            <Column header="Commission"></Column>
            <Column header="Quantity"></Column>
            <Column header="Price"></Column>
            <Column header="Value"></Column>
            <Column header="Commission"></Column>
            <Column header="Quantity"></Column>
            <Column header="Price"></Column>
            <Column header="Value"></Column>
            <Column header="Value"></Column>
            <Column header="Tax"></Column>
            <Column header="Value"></Column>
            <Column header="Tax"></Column>
            <Column header="Value" field="totalValue" :sortable="true"></Column>
            <Column
              header="Percent"
              field="totalPercent"
              :sortable="true"
            ></Column>
          </Row>
        </ColumnGroup>
        <Column field="ticker"></Column>
        <Column field="text"></Column>
        <Column field="currency"></Column>
        <Column field="quantityBuy" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.quantityBuy) }}
          </template>
        </Column>
        <Column field="priceBuy" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.priceBuy) }}
          </template>
        </Column>
        <Column field="valueBuy" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.valueBuy) }}
          </template>
        </Column>
        <Column field="commissionBuy" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.commissionBuy) }}
          </template>
        </Column>
        <Column field="quantitySell" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.quantitySell) }}
          </template>
        </Column>
        <Column field="priceSell" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.priceSell) }}
          </template>
        </Column>
        <Column field="valueSell" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.valueSell) }}
          </template>
        </Column>
        <Column field="commissionSell" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.commissionSell) }}
          </template>
        </Column>
        <Column field="quantityEnd" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.quantityEnd) }}
          </template>
        </Column>
        <Column field="priceEnd" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.priceEnd) }}
          </template>
        </Column>
        <Column field="valueEnd" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.valueEnd) }}
          </template>
        </Column>
        <Column field="dividentValue" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.dividendValue) }}
          </template>
        </Column>
        <Column field="dividendTax" class="p-text-right">
          <template #body="slotProps" class="p-text-right">
            {{ formatCurrency(slotProps.data.dividendTax) }}
          </template>
        </Column>
        <Column field="couponValue" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.couponValue) }}
          </template>
        </Column>
        <Column field="couponTax" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.couponTax) }}
          </template>
        </Column>
        <Column field="totalValue" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.totalValue) }}
          </template>
        </Column>
        <Column field="totalPercent" class="p-text-right">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.totalPercent) }}
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column
              footer="Totals:"
              :colspan="14"
              footerStyle="text-align:right"
            />
            <Column :colspan="2" :footer="total.dividendValue" />
            <Column :colspan="2" :footer="total.couponValue" />
            <Column :colspan="2" :footer="total.totalValue" />
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
  name: "Profit",
  props: {
    settings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showProfit: false,
      showLoading: false,
      profit: [],
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

      const request = new Request(this.settings.url + "/profit", {
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

        this.profit = data;

        this.profit.sort((a, b) =>
          a.ticker < b.ticker ? -1 : a.ticker > b.ticker ? 1 : 0
        );

        this.showProfit = true;
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
    total() {
      if (this.profit.length == 0) {
        return;
      }

      let totals = new Map();

      this.profit.forEach((profit) => {
        let total = totals.get(profit.currency);

        if (!total) {
          total = {
            dividendValue: 0,
            couponValue: 0,
            totalValue: 0,
          };
        }

        total.dividendValue += profit.dividendValue;
        total.couponValue += profit.couponValue;
        total.totalValue += profit.totalValue;

        totals.set(profit.currency, total);
      });

      let textDividendValue = "";
      let textCouponValue = "";
      let textTotalValue = "";

      totals.forEach((total, key) => {
        if (textDividendValue !== "") {
          textDividendValue += `\n\r`;
        }

        if (total.dividendValue !== 0) {
          textDividendValue += `${this.formatCurrency(
            total.dividendValue
          )} ${key}`;
        }

        if (textCouponValue !== "") {
          textCouponValue += `\n\r`;
        }

        if (total.couponValue !== 0) {
          textCouponValue += `${this.formatCurrency(
            total.dividendValue
          )} ${key}`;
        }

        if (textTotalValue !== "") {
          textTotalValue += `\n\r`;
        }

        if (total.totalValue !== 0) {
          textTotalValue += `${this.formatCurrency(total.totalValue)} ${key}`;
        }
      });

      return {
        dividendValue: textDividendValue,
        couponValue: textCouponValue,
        totalValue: textTotalValue,
      };
    },
  },

  components: {},
};
</script>