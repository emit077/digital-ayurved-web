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

    <v-row class="mt-10">
      <v-col cols="12" md="6" xl="6" class="overview-card">
        <list-item
          title="Monthly Best Sellers"
          :drug_list="monthly_best_sellers"
        ></list-item>
      </v-col>
      <v-col cols="12" md="6" xl="6" class="overview-card">
        <list-item
          title="All Time Best Sellers"
          :drug_list="best_sellers"
        ></list-item>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { defineComponent } from "vue";
import SalesCard from "@/components/overview/SalesCard.vue";
import ListItem from "@/components/inventory/ListItem.vue";

export default defineComponent({
  name: "OverviewVue",
  components: { SalesCard, ListItem },
  data: () => ({
    today_sales: "",
    monthly_sales: "",
    today_patient: "",
    monthly_patient: "",
    best_sellers: [],
    monthly_best_sellers: [],
    sales_data: [
      {
        icon: "mdi-chart-bar",
        title: "Today's Sales",
        value: "",
        is_amount:true,
        analatical_value: "",
      },
      {
        icon: "mdi-account-plus",
        title: "Today's Appointment",
        value: "",
        analatical_value: "",
      },
      {
        icon: "mdi-chart-bar",
        title: "Monthly Sales",
        is_amount:true,
        value: "",
        analatical_value: "",
      },
      {
        icon: "mdi-account-plus",
        title: "Monthly Appointment",
        value: "",
        analatical_value: "",
      },
    ],
  }),
  mounted() {
    this.getData();
    this.showSnakeBar('success', "Record Deleted")
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
        this.monthly_best_sellers = response.data.monthly_best_sellers;
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
