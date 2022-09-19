<template>
  <div>
    <!--  search  console   -->
    <v-row class="mb-2" justify="space-between">
      <v-col cols="12" md="2">
        <router-link :to="{ name: 'prescription'}">
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
            @keyup="getTreatmentHistory"
            density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--  -->
    <data-table :items="treatment_history" :headers="headers" @delete="clickFunction"/>
    <v-divider></v-divider>
    <v-pagination
        class="mt-4"
        v-model="page_number"
        :length="total_page_count"
        :total-visible="8"
        density="comfortable"
        color="primary"
        @update:modelValue="getPatientList"
    ></v-pagination>
    <confirmation-dialog ref="confirmation_dialog" @yes="deleteRecord"/>
  </div>
</template>
<style lang="scss" scoped>
.patient-profile-card {
  border-radius: 20px;
  border: solid 1px lightgrey;
}

.edit-profile-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.v-tab--selected {
  background-color: white !important;
}

</style>

<script>
import {defineComponent} from 'vue';
import DataTable from "@/components/DataTable.vue"
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default defineComponent({
  name: ' TreatmentHistory',
  components: {DataTable, ConfirmationDialog},
  data: () => ({
    page_number: 1,
    total_page_count: 1,
    search_query: '',
    treatment_history: [],
    headers: [
      {title: "Doctor", value: ["doctor_name", "doctor_mobile"], multiline: true, align: "", class: "", width: ""},
      {title: "Patient", value: ["patient_name", "patient_mobile"], multiline: true, align: "", class: "", width: ""},
      {title: "Date", value: "created", class: "",},
      {title: "Chief complaint", value: "chief_complaint"},
      {
        title: "", type: "btn", class: "text-right", btn_list: [
          {
            btn_icon: "mdi-delete-empty",
            route_name: '/prescription_preview/',
            router_key: "id",
            btn_type: "delete-btn",
            size: "25",
            color: 'red',
          },
          {
            btn_icon: "mdi-chevron-right",
            route_name: '/prescription_preview/',
            router_key: "id",
            size: "25",
            color: 'primary',
            target: '_blank'
          },
        ]
      },
    ],
    dialog: {
      treatment_table_id: null,
    }
  }),
  created() {
    this.getTreatmentHistory()
  },
  methods: {
    getTreatmentHistory() {
      var params = {
        page_number: this.page_number,
        search_query: this.search_query
      }
      const successHandler = (response) => {
        this.treatment_history = response.data.treatment_history
        this.total_page_count = response.data.total_page_count
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.TREATMENT_HISTORY, params, successHandler, null, null, finallyHandler)
    },
    clickFunction(id) {
      this.dialog.treatment_table_id = id
      this.$refs.confirmation_dialog.$data.flag = true
    },
    deleteRecord() {
      var form = new URLSearchParams();
      form.append("treatment_table_id", this.dialog.treatment_table_id);
      const successHandler = (response) => {
        this.treatment_history = this.treatment_history.filter(item => item.id !== this.dialog.treatment_table_id);
        this.showSnakeBar('success', "Record Deleted")
        this.$refs.confirmation_dialog.$data.flag = false
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.DELETE_TREATMENT_RECORD, form, successHandler, null, null, finallyHandler)

    }
  }
});
</script>
