<template>
  <div>
    <!-- <div class="text-right mb-8">
      <router-link :to="{ name: 'create_purchase_order' }">
        <v-btn color="primary" prepend-icon="mdi-plus">{{
          $lang.CREATE_PURCHASE_ORDER
        }}</v-btn>
      </router-link>
    </div> -->
    <v-row class="">
      <v-col cols="12" md="6" xl="6" class="overview-card mb-6">
        <list-item title="Expiring Soon" :drug_list="near_expiry"></list-item>
      </v-col>
      <v-col cols="12" md="6" xl="6" class="overview-card mb-6">
        <list-item title="Expired" :drug_list="expired"></list-item>
      </v-col>
      <v-col cols="12" md="6" xl="6" class="overview-card mb-6">
        <list-item
          title="Low Stockout"
          :drug_list="near_stock_out"
        ></list-item>
      </v-col>
      <v-col cols="12" md="6" xl="6" class="overview-card mb-6">
        <list-item title="Stockout" :drug_list="stock_out"></list-item>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { defineComponent } from "vue";
import ListItem from "@/components/inventory/ListItem.vue";

export default defineComponent({
  name: "OverviewVue",
  components: { ListItem },
  data: () => ({
    near_expiry: [],
    expired: [],
    near_stock_out: [],
    stock_out: [],
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
        this.near_expiry = response.data.near_expiry;
        this.expired = response.data.expired;
        this.near_stock_out = response.data.near_stock_out;
        this.stock_out = response.data.stock_out;
      };
      const finallyHandler = () => {
        this.btn_loading = false;
      };
      this.request_GET(
        this,
        this.$urls.INVENTORY_OVERVIEW,
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
