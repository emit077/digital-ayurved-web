<template>
  <div>
    <!--  search  console   -->
    <v-row class="mb-2" justify="space-between">
      <v-col cols="12" md="2">
                <router-link :to="{ name: 'add_patient'}">
                  <v-btn color="primary" prepend-icon="mdi-plus">{{ $lang.ADD_NEW }}</v-btn>
                </router-link>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
            v-model="search_query"
            :placeholder="$lang.PATIENT_SEARCH"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            variant="outlined"
            @keyup="getPatientList"
            density="compact"
            class="bg-white"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--    -->

    <div>
      <data-table :items="patient_list" :headers="headers"/>
      <v-divider/>
      <v-pagination
          class="mt-4"
          v-model="page_number"
          :length="total_page_count"
          :total-visible="8"
          density="comfortable"
          color="primary"
          @update:modelValue="getPatientList"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import DataTable from "@/components/DataTable.vue"

export default defineComponent({
  name: 'PatientListView',
  components: {DataTable},
  data: () => ({
    patient_list: [],
    page_number: 1,
    total_page_count: 1,
    search_query: "",
    headers: [
      {title: "Fist Name", value: "patient_first_name", class: "fw-450", gender_icon: true},
      {title: "Last Name", value: "patient_last_name", class: "fw-450"},
      {title: "Contact info", value: ["mobile", "email"], multiline: true, align: "", class: "", width: ""},
      {title: "City", value: 'city'},
      {
        title: "", type: "btn", class: "text-right", btn_list: [
          {btn_icon: "mdi-pencil", route_name: '/patient/edit/', router_key: "patient_table_id", color: 'primary'},
          {
            btn_icon: "mdi-chevron-right",
            route_name: '/patient/profile/',
            router_key: "patient_table_id",
            size: "25",
            color: 'primary'
          },
        ]
      },
    ]
  }),
  mounted() {
    this.getPatientList()
  }
  ,
  methods: {
    getPatientList() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.patient_list = response.data.patient_list
        this.total_page_count = response.data.total_page_count
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.PATIENT_LIST, params, successHandler, null, null, finallyHandler)
    }
  }
})
;
</script>
