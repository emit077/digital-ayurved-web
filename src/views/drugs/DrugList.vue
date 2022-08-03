<template>
  <div>
    <div class="text-right mb-5 ">
      <router-link :to="{ name: 'add_drug'}">
        <v-btn color="primary" prepend-icon="mdi-plus">{{ $lang.ADD_NEW }}</v-btn>
      </router-link>
    </div>
    <v-row class="mb-2">
      <v-col cols="12" md="6" xl="4">
        <v-text-field
            v-model="search_query"
            :placeholder="$lang.DRUG_SEARCH"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            density="comfortable"
            @keyup="getDrugList"
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <data-table :items="drug_list" :headers="headers"/>
      <v-divider/>
      <v-pagination
          class="mt-4"
          v-model="page_number"
          :length="total_page_count"
          :total-visible="8"
          density="comfortable"
          color="primary"
          @update:modelValue="getDrugList"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import DataTable from "@/components/DataTable.vue"

export default defineComponent({
  name: 'DrugListView',
  components: {DataTable},
  data: () => ({
    drug_list: [],
    page_number: 1,
    total_page_count: 1,
    search_query: "",
    headers: [
      {title: "Drug Name", value: "drug_name", class: "fw-450"},
      {title: "Brand", value: 'brand'},
      {title: "formula", value: "formula"},
      {title: "MRP", value: "mrp"},
      {
        title: "", type: "btn", class: "text-right", btn_list: [
          {btn_icon: "mdi-pencil", route_name: '/drug/edit/', router_key: "drug_table_id", color: 'primary'},
          // {
          //   btn_icon: "mdi-chevron-right",
          //   route_name: '/drug/details/',
          //   router_key: "drug_table_id",
          //   size: "25",
          //   color: 'primary'
          // },
        ]
      },
    ]
  }),
  mounted() {
    this.getDrugList()
  }
  ,
  methods: {
    getDrugList() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.drug_list = response.data.drug_list
        this.total_page_count = response.data.total_page_count
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DRUGS_LIST, params, successHandler, null, null, finallyHandler)
    }
  }
})
;
</script>
