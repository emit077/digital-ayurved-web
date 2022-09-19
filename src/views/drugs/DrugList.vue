<template>
  <div>
    <!--  search  console   -->
    <v-row class="mb-2" justify="space-between">
      <v-col cols="12" md="2">
        <router-link :to="{ name: 'add_drug'}">
          <v-btn color="primary" prepend-icon="mdi-plus">{{ $lang.ADD_NEW }}</v-btn>
        </router-link>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
            v-model="search_query"
            :placeholder="$lang.DRUG_SEARCH"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            variant="outlined"
            @keyup="getDrugList"
            density="compact"
        ></v-text-field>
      </v-col>
    </v-row>

    <!--    -->
    <div>
      <data-table :items="drug_list" :headers="headers" @delete="OpenDialog"/>
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
    <confirmation-dialog ref="confirmation_dialog" @yes="deleteRecord"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import DataTable from "@/components/DataTable.vue"
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default defineComponent({
  name: 'DrugListView',
  components: {DataTable, ConfirmationDialog},
  data: () => ({
    drug_list: [],
    page_number: 1,
    total_page_count: 1,
    search_query: "",
    headers: [
      {title: "Drug Name", value: "drug_name", class: "fw-450"},
      {title: "Brand", value: 'brand'},
      {title: "formula", value: "formula"},
      {
        title: "", type: "btn", class: "text-right", btn_list: [
          {btn_icon: "mdi-pencil", route_name: '/drugs/edit/', router_key: "drug_table_id", color: 'primary'},
          {
            btn_icon: "mdi-delete-empty",
            route_name: '/prescription_preview/',
            router_key: "id",
            btn_type: "delete-btn",
            size: "25",
            color: 'red',
          },
        ]
      },
    ],
    dialog: {
      drug_table_id: null
    }

  }),
  mounted() {
    this.getDrugList()
  },
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
    },
    OpenDialog(id) {
      console.log("id",id)
      this.dialog.drug_table_id = id
      this.$refs.confirmation_dialog.$data.flag = true
    },
    deleteRecord() {
      console.log("delete records")
      var form = new URLSearchParams();
      form.append("drug_table_id", this.dialog.drug_table_id);
      const successHandler = (response) => {
        this.drug_list = this.drug_list.filter(item => item.id !== this.dialog.drug_table_id);
        this.showSnakeBar('success', "Record Deleted")
        this.$refs.confirmation_dialog.$data.flag = false
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.DRUGS_DELETE, form, successHandler, null, null, finallyHandler)

    }
  }
})
;
</script>
