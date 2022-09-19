<template>
  <div>
    <v-form ref="prescription_form" v-model="valid" lazy-validation>
      <v-row no-gutters v-if="!$route.params.id">
        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.PATIENT }}</label>
          <v-combobox
              v-model="patient"
              v-model:search-input="patient_search"
              :rules="[$rules.REQUIRED_FIELD('')]"
              :items="patient_list"
              variant="outlined"
              density="compact"
              placeholder="Select Patient"
              class="custom-combobox"
              hide-details
              @focus="getPatientList"
              @keydown="getPatientList"
          >
            <template v-slot:selection="data">
              <span>
                {{ data.item.raw.name }}
              </span>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
              <v-list-item
                  v-else
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :title="item.raw.name+ '('+item.raw.patient_table_id+')'"
                  :subtitle="item.raw.mobile"
              ></v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="12" md="1" class="py-2 " style="">
          <div class="d-flex h-100 align-end justify-end">
            <v-btn class="text-capitalize mr-8" color="secondary" icon="mdi-plus" @click="openDialog"></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.BLOOD_PRESSURE }}</label>
          <v-text-field
              v-model="blood_pressure"
              :label="$lang.NAME"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              maxlength="50"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.BLOOD_SUGAR }}</label>
          <v-text-field
              v-model="blood_sugar"
              :label="$lang.BLOOD_SUGAR"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
              @keydown="restrictChar($event)"
              maxlength="6"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.PLUS_RATE }}</label>
          <v-text-field
              v-model="plus_rate"
              :label="$lang.PLUS_RATE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
              @keydown="restrictChar($event)"
              maxlength="5"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.TEMPERATURE }}</label>
          <v-text-field
              v-model="temperature"
              :label="$lang.TEMPERATURE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
              @keydown="restrictChar($event)"
              maxlength="5"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.SPO2 }}</label>
          <v-text-field
              v-model="temperature"
              :label="$lang.SPO2"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
              @keydown="restrictChar($event)"
              maxlength="10"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.CHIEF_COMPLAINT }}</label>
          <v-textarea
              v-model="chief_complaint"
              :label="$lang.CHIEF_COMPLAINT"
              variant="outlined"
              single-line
              class="mt-1"
              rows="3"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              density="compact"
              hide-details
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="4" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.HISTORY_OF_CHIEF_COMPLAINT }}</label>
          <v-textarea
              v-model="history_of_chief_complaint"
              :label="$lang.HISTORY_OF_CHIEF_COMPLAINT"
              variant="outlined"
              single-line
              class="mt-1"
              rows="3"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              density="compact"
              hide-details
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="4" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.ADVISE }}</label>
          <v-textarea
              v-model="advise"
              :label="$lang.ADVISE"
              variant="outlined"
              single-line
              class="mt-1"
              hide-details
              rows="3"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              density="compact"
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="4" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.OE }}</label>
          <v-textarea
              v-model="oe"
              :label="$lang.OE"
              variant="outlined"
              single-line
              hide-details
              class="mt-1"
              rows="3"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              density="compact"
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="4" class="py-2" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.REQUIRED_TEST }}</label>
          <v-textarea
              v-model="required_test"
              :label="$lang.REQUIRED_TEST"
              variant="outlined"
              single-line
              hide-details
              class="mt-1"
              rows="3"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              density="compact"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <!--   prescription   -->
      <div class="border py-3 mt-3">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="py-2">
            <p class="pl-4 font-weight-bold"> Add Prescription </p>
          </v-col>
          <v-col cols="12" md="6" class="text-right pr-4">
            <v-btn class="text-capitalize" color="secondary" @click="appendNewEmptyRow">
              Add More
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-for="(item, i) in prescription_list" :key="i" justify="start" no-gutters="" class="">
          <v-col class="py-2" cols="10" md="3" :class="!$vuetify.display.mobile?'pl-4 pr-2':''">
            <label class="ml-1">{{ $lang.DRUG }}</label>
            <v-autocomplete
                v-model="item.drug"
                v-model:search-input="item.drug_search_query"
                :items="drug_list"
                :rules="[$rules.REQUIRED_FIELD('')]"
                placeholder="Drug"
                variant="outlined"
                density="compact"
                class="custom-combobox mt-1"
                hide-details
                item-title="drug_name"
                item-value="drug_table_id"
                @focus="getDrugList(item.drug_search_query)"
                @keydown="getDrugList(item.drug_search_query)"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
                <v-list-item
                    v-else
                    v-bind="props"
                    :prepend-avatar="item.raw.avatar"
                    :title="item.raw.drug_name"
                    :subtitle="item.raw.brand"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-2':''">
            <label class="ml-1">{{ $lang.DOSE }}</label>
            <v-select
                v-model="item.dose"
                :items="dose_list"
                :label="$lang.DOSE"
                variant="outlined"
                single-line
                class="mt-1"
                :rules="[$rules.REQUIRED_FIELD('')]"
                density="compact"
                hide-details
            >
            </v-select>
          </v-col>
          <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-2':''">
            <label class="ml-1">{{ $lang.FREQUENCY }}</label>
            <v-select
                v-model="item.frequency"
                :items="frequency_list"
                :label="$lang.FREQUENCY"
                variant="outlined"
                single-line
                class="mt-1"
                :rules="[$rules.REQUIRED_FIELD('')]"
                density="compact"
                hide-details
            >
            </v-select>
          </v-col>
          <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-2':''">
            <label class="ml-1">{{ $lang.INSTRUCTION }}</label>
            <v-select
                v-model="item.instruction"
                :items="instruction_list"
                :label="$lang.INSTRUCTION"
                variant="outlined"
                single-line
                class="mt-1"
                :rules="[$rules.REQUIRED_FIELD('')]"
                density="compact"
                hide-details
            >
            </v-select>
          </v-col>
          <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-2':''">
            <label class="ml-1">{{ $lang.QTY }}</label>
            <v-text-field
                v-model="item.qty"
                :placeholder="$lang.QTY"
                variant="outlined"
                single-line
                class="mt-1"
                shaped
                :rules="[$rules.REQUIRED_FIELD('')]"
                density="compact"
                hide-details
            >
            </v-text-field>
          </v-col>
          <v-col class="py-2 " cols="10" md="1" :class="!$vuetify.display.mobile?'px-2':''">
            <v-icon v-if="prescription_list.length>1" @click="removeRow(i)" class="mt-8">mdi-close</v-icon>
          </v-col>
        </v-row>
      </div>
      <!--  Action Btn    -->
      <v-row no-gutters class="mt-7">
        <v-col cols="12" md="12" class="text-center">
          <v-btn :loading="btn_loading" class="register-action-btn mx-2" color="primary"
                 height="50px" width="300px" @click="createPrescription()">
            <span class="btn_text">{{ $lang.SAVE }}</span>
          </v-btn>
          <v-btn :loading="btn_loading" class="register-action-btn mx-2" color="primary"
                 height="50px" width="300px" variant="outlined" @click="$router.go(-1)">
            <span class="btn_text">{{ $lang.CANCEL }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<style>
.custom-combobox input {
  width: 100%;
}
</style>
<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddDrugView',
  components: {},
  data: () => ({
    valid: false,// form validation
    show_password: false,
    btn_loading: false,
    blood_pressure: 10,
    blood_sugar: 11,
    plus_rate: 12,
    spo2: 13,
    temperature: 14,
    oe: 15,
    required_test: "dsa",
    advise: "adasdas",
    chief_complaint: "dasda",
    history_of_chief_complaint: "dasdas",

    patient: null,
    patient_list: [],
    patient_search: "",
    drug_list: [],
    prescription_list: [
      {
        drug_search_query: '',
        loading: false,
        drug: null,
        dose: "other",
        frequency: "other",
        instruction: "other",
        qty: "other",
      }
    ],
    dose_list: [],
    instruction_list: [],
    frequency_list: [],
  }),
  mounted() {
    if (this.$route.params.id)
      this.patient_table_id = this.$route.params.id
    else
      this.getPatientList()
    this.getPrescriptionSupportingData()
  },
  methods: {
    getDrugList(search_query) {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.drug_list = response.data.drug_list
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DRUGS_LIST, params, successHandler, null, null, finallyHandler)

    },
    getPatientList() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.patient_list = response.data.patient_list
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.PATIENT_LIST, params, successHandler, null, null, finallyHandler)
    },
    getPrescriptionSupportingData() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.dose_list = response.data.dose_list
        this.instruction_list = response.data.instruction_list
        this.frequency_list = response.data.frequency_list
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.GET_PRESCRIPTION_SUPPORTING_DATA, params, successHandler, null, null, finallyHandler)
    },
    appendNewEmptyRow() {
      this.prescription_list.push({
        drug_search_query: '',
        loading: false,
        drug: null,
        dose: null,
        frequency: null,
        instruction: null,
        qty: null,
      })
    },
    removeRow(index) {
      console.log("index=", index)
      if (this.prescription_list.length > 1)
        this.prescription_list.splice(index, 1)
    },
    async createPrescription() {
      await this.$refs.prescription_form.validate()
      console.log("this.$refs.prescription_form.validate()==", this.valid)
      if (!this.valid)
        return false
      this.btn_loading = true

      console.log(this.patient)
      console.log(this.prescription_list)
      var form = new URLSearchParams();
      form.append("patient_table_id", this.patient_table_id ? this.patient_table_id : this.patient.patient_table_id);
      form.append("blood_pressure", this.blood_pressure);
      form.append("blood_sugar", this.blood_sugar);
      form.append("plus_rate", this.plus_rate);
      form.append("spo2", this.spo2);
      form.append("temperature", this.temperature);
      form.append("oe", this.oe);
      form.append("required_test", this.required_test);
      form.append("advise", this.advise);
      form.append("chief_complaint", this.chief_complaint);
      form.append("history_of_chief_complaint", this.history_of_chief_complaint);
      form.append("prescription_list", JSON.stringify(this.prescription_list));

      const successHandler = (response) => {
        this.$refs.prescription_form.reset()
        this.showSnakeBar('success', this.doctor_table_id ? "Profile Updated" : "Doctor Added")
        // open prescription pdf in new tab
        let routeData = this.$router.resolve({
          name: 'prescription_preview',
          params: {id: response.data.treatment_table_id}
        });
        window.open(routeData.href, '_blank');
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.ADD_PRESCRIPTION, form, successHandler, null, null, finallyHandler)
    },
    // restrict the char input
    restrictChar(event) {
      let digitPeriodRegExp = new RegExp('\\d|\\.');
      if (event.ctrlKey // (A)
          || event.altKey // (A)
          || typeof event.key !== 'string' // (B)
          || event.key.length !== 1) { // (C)
        return;
      }
      if (!digitPeriodRegExp.test(event.key)) {
        event.preventDefault();
      }
    },
  }
});
</script>
