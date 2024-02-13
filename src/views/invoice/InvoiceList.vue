<template>
    <div>
      <!--  search  console   -->
      <v-row class="mb-2" justify="space-between">
        <v-col cols="12" md="2">
          <router-link :to="{ name: 'create_invoice'}">
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
              @keyup="getInvoiceList"
              density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
  
      <!--    -->
      <div>
        <data-table :items="invoice_list" :headers="headers" @delete="OpenDialog"/>
        <v-divider/>
        <v-pagination
            class="mt-4"
            v-model="page_number"
            :length="total_page_count"
            density="comfortable"
            color="primary"
            @update:modelValue="getInvoiceList"
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
    name: 'PurchaseOrderListView',
    components: {DataTable, ConfirmationDialog},
    data: () => ({
      invoice_list: [],
      page_number: 1,
      total_page_count: 1,
      search_query: "",
      headers: [
        {title: "Invoice Id", value: "invoice_id", class: "fw-450"},
        {title: "Patient", value: ["patient_name"]},
        {title: "Date", value: "invoice_total"},
        {title: "Amount", value: "invoice_total"},
        {
          title: "", type: "btn", class: "text-right", btn_list: [
          {btn_icon: "mdi-pencil", route_name: '/invoice/edit/', router_key: "invoice_table_id", color: 'primary'},
          {
            btn_icon: "mdi-chevron-right",
            route_name: '/invoice-details/',
            router_key: "id",
            size: "25",
            color: 'primary'
          },
            // {
            //   btn_icon: "mdi-delete-empty",
            //   route_name: '/purchase_order/',
            //   router_key: "id",
            //   btn_type: "delete-btn",
            //   size: "25",
            //   color: 'red',
            // },
          ]
        },
      ],
      dialog: {
        drug_table_id: null
      }
  
    }),
    mounted() {
      this.getInvoiceList()
    },
    methods: {
      getInvoiceList() {
        var params = {
          search_query: this.search_query,
          page_number: this.page_number,
        }
        const successHandler = (response) => {
          this.invoice_list = response.data.invoice_list
          this.total_page_count = response.data.total_page_count
        };
        const finallyHandler = () => {
          this.btn_loading = false
        };
        this.request_GET(this, this.$urls.LIST_INVOICE, params, successHandler, null, null, finallyHandler)
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
          this.invoice_list = this.invoice_list.filter(item => item.id !== this.dialog.drug_table_id);
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
  