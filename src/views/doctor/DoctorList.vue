<template>
  <div>
    <v-row class="mb-2" justify="space-between">
      <v-col cols="12" md="2" >
        <router-link :to="{ name: 'add_doctor'}">
          <v-btn color="primary" prepend-icon="mdi-plus">{{ $lang.ADD_NEW }}</v-btn>
        </router-link>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
            v-model="search_query"
            :placeholder="$lang.DOCTOR_SEARCH"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            variant="outlined"
            @keyup="getDoctorList"
            density="compact"
            class="bg-white"
        ></v-text-field>
      </v-col>
    </v-row>


    <div>
      <data-table :items="doctor_list" :headers="headers"/>
      <v-divider/>
      <v-pagination
          class="mt-4"
          v-model="page_number"
          :length="total_page_count"
          :total-visible="8"
          density="comfortable"
          color="primary"
          @update:modelValue="getDoctorList"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import DataTable from "@/components/DataTable.vue"

export default defineComponent({
  name: 'DoctorListView',
  components: {DataTable},
  data: () => ({
    doctor_list: [],
    page_number: 1,
    total_page_count: 1,
    search_query: "",
    headers: [
      {title: "Name", value: "name", align: "", class: "fw-450", width: "", gender_icon: true},
      {title: "Contact info", value: ["mobile", "email"], multiline: true, align: "", class: "", width: ""},
      {title: "Medical reg", value: "medical_reg_no", align: "", class: "", width: ""},
      {title: "Degree", value: "degree", align: "", class: "", width: ""},
      {title: "Designation", value: "designation", align: "", class: "", width: ""},
      {
        title: "", type: "btn", class: "text-right", btn_list: [
          {btn_icon: "mdi-pencil", route_name: '/doctor/edit/', router_key: "doctor_table_id", color: 'primary'},
          {
            btn_icon: "mdi-chevron-right",
            route_name: '/doctor/profile/',
            router_key: "doctor_table_id",
            size: "25",
            color: 'primary'
          },
        ]
      },
    ]
  }),
  mounted() {
    this.getDoctorList()
  }
  ,
  methods: {
    getDoctorList() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.doctor_list = response.data.doctor_list
        this.total_page_count = response.data.total_page_count
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DOCTOR_LIST, params, successHandler, null, null, finallyHandler)
    }
  }
})
;
</script>
