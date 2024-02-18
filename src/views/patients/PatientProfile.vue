<template>
  <div>
    <div class="patient-profile-card px-4" :class="$vuetify.display.mobile?'text-center':''">
      <v-row no-gutters>
        <v-col cols="12" md="8" :class="$vuetify.display.mobile?'':'py-4'">
          <p :class="$vuetify.display.mobile?'text-h6':'text-h4'">{{ first_name }} {{ last_name }} </p>
          <label class="text-medium-emphasis">{{ $lang.AGE }}: </label>
          <span class="text-subtitle-1">{{ age }}</span> <br>
          <label class="text-medium-emphasis"> {{ $lang.GENDER }}: </label>
          <span class="text-subtitle-1"> {{ gender }}</span>
        </v-col>
        <v-col cols="12" md="4" :class="$vuetify.display.mobile?'text-center':'pa-3 text-right'">
          <div class="position-relative h-100 pr-3">
            <p class="mb-1 "> Reg Id : <br v-if="!$vuetify.display.mobile"> <strong> {{ medical_reg_no }} </strong></p>

            <router-link :to="'/patient/edit/'+patient_table_id">
              <v-btn color="primary" size="small" prepend-icon="mdi-pencil"
                     :class="$vuetify.display.mobile?'text-center my-4':'edit-profile-btn'">{{ $lang.EDIT_PROFILE }}
              </v-btn>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </div>
    <!--  -->
    <router-link :to="'/prescription/'+patient_table_id" class="float-end mt-3">
      <v-btn color="primary" variant="outlined" prepend-icon="mdi-plus">{{ $lang.NEW_PRESCRIPTION }}
      </v-btn>
    </router-link>
    <!--    -->
    <v-tabs
        v-model="tab"
        color="primary"
    >
      <v-tab :value="1">Personal Info</v-tab>
      <v-tab :value="2">Treatment History</v-tab>
      <v-tab :value="3">Invoice History</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          :value="1">
        <v-card class="tab-card">
          <v-container fluid>
            <v-row no-gutters class="px-3 mt-5">
              <v-col cols="12" md="4">
                <label class="text-medium-emphasis">{{ $lang.MOBILE_NUMBER }}:</label>
                <p class="text-subtitle-1">{{ mobile }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <label class="text-medium-emphasis">{{ $lang.EMAIL }}:</label>
                <p class="text-subtitle-1">{{ email }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <label class="text-medium-emphasis">{{ $lang.OCCUPATION }}:</label>
                <p class="text-subtitle-1">{{ occupation }}</p>
              </v-col>

              <v-col cols="12" md="4">
                <label class="text-medium-emphasis">{{ $lang.ADDRESS }}:</label>
                <p class="text-subtitle-1">{{ address }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <label class="text-medium-emphasis">{{ $lang.CITY }}:</label>
                <p class="text-subtitle-1">{{ city }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-window-item>
      <v-window-item
          :value="2">
        <v-card class="tab-card">
          <v-container fluid>
            <data-table :items="treatment_history" :headers="headers" @delete="clickFunction"/>
            <v-divider></v-divider>
          </v-container>
        </v-card>
      </v-window-item>
      <v-window-item
          :value="3">
        <v-card class="tab-card">
          <v-container fluid>
            <data-table :items="treatment_history" :headers="headers" @delete="clickFunction"/>
            <v-divider></v-divider>
          </v-container>
        </v-card>
      </v-window-item>
    </v-window>
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
  name: ' PatientsProfileView',
  components: {DataTable, ConfirmationDialog},
  data: () => ({
    patient_table_id: null,
    name: '',
    first_name: '',
    last_name: '',
    age: '',
    occupation: '',
    gender: "",
    city: '',
    address: '',
    email: '',
    mobile: '',
    tab: null,
    treatment_history: [],
    headers: [
      {title: "Doctor", value: ['doctor_name','doctor_mobile'], multiline: true, class: "fw-450"},
      {title: "Doctor", value: "doctor_name", class: "fw-450"},
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
    if (this.$route.params.id) {
      this.patient_table_id = this.$route.params.id
      this.getPatientDetails()
    }
  },
  methods: {
    getPatientDetails() {
      var params = {
        patient_table_id: this.patient_table_id,
      }
      const successHandler = (response) => {
        this.name = response.data.name
        this.first_name = response.data.patient_first_name
        this.last_name = response.data.patient_last_name
        this.mobile = response.data.mobile
        this.email = response.data.email
        this.gender = response.data.gender
        this.age = response.data.age
        this.treatment_history = response.data.treatment_history
        this.occupation = response.data.occupation
        this.address = response.data.address
        this.city = response.data.city
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.PATIENT_DETAILS, params, successHandler, null, null, finallyHandler)
    },
    clickFunction(id) {
      this.dialog.treatment_table_id = id
      this.$refs.confirmation_dialog.$data.flag = true
    },
    deleteRecord() {
      console.log("delete records")
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
