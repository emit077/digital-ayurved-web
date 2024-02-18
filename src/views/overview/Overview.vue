<template>
  <div>
    <v-row class="mt-2">
      <v-col
        cols="12"
        md="3"
        xl="4"
        class="overview-card"
        v-for="(item, i) in sales_data"
        :key="i"
      >
        <sales-card :sales_data="item"></sales-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" md="6" xl="6" class="overview-card">
        <v-card class="h-100">
          <v-card-text class="pb-2">
            <span class="text-h6">Best Sellers</span>
            <v-table class="mt-1" density="compact">
              <tbody>
                <tr
                  class="v-align-middle text-caption"
                  v-for="(item, i) in best_sellers"
                  :key="i"
                >
                  <td class="pl-0">{{ item.drug_name }}</td>
                  <td
                    class="text-right pr-0 v-align-middle"
                    v-if="item.quantity !== null || item.quantity !== undefind"
                  >
                    <small>{{ item.quantity }}</small>
                  </td>
                  <td
                    class="text-right pr-0 v-align-middle text-small"
                    v-if="item.amount"
                  >
                    <small>{{ item.amount }}</small>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { defineComponent } from "vue";
import SalesCard from "@/components/overview/SalesCard.vue";

export default defineComponent({
  name: "OverviewVue",
  components: { SalesCard },
  data: () => ({
    today_sales: "",
    monthly_sales: "",
    today_patient: "",
    monthly_patient: "",
    best_sellers: [],

    sales_data: [
      {
        icon: "mdi-chart-bar",
        title: "Today's Sales",
        value: "",
        analatical_value: "",
      },
      {
        icon: "mdi-chart-bar",
        title: "Today's Appointment",
        value: "",
        analatical_value: "",
      },
      {
        icon: "mdi-chart-bar",
        title: "Monthly Sales",
        value: "",
        analatical_value: "",
      },
      {
        icon: "mdi-chart-bar",
        title: "Monthly Appointment",
        value: "",
        analatical_value: "",
      },
    ],
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      };
      const successHandler = (response) => {
        this.sales_data[0].value = response.data.today_sales;
        this.sales_data[1].value = response.data.today_patient;
        this.sales_data[2].value = response.data.monthly_sales;
        this.sales_data[3].value = response.data.monthly_patient;
        this.best_sellers = response.data.best_sellers;
      };
      const finallyHandler = () => {
        this.btn_loading = false;
      };
      this.request_GET(
        this,
        this.$urls.DASHBOARD_OVERVIEW,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
});
</script>
