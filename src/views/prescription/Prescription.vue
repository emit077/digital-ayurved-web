<template>
  <div>
    <v-form ref="login_form" lazy-validation @submit.prevent="addDoctor()">
      <v-row no-gutters>
        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.PATIENT }}</label>
          <v-combobox
              v-model="drug"
              :items="drug_list"
              filled
              chips
              closable-chips
              label="Select"
              item-title="name"
              item-value="name"
              multiple
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                  v-bind="props"
                  :text="item.raw.name"
              ></v-chip>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
              <v-list-item
                  v-else
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :title="item.raw.name"
                  :subtitle="item.raw.mobile"
              ></v-list-item>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.BLOOD_SUGAR }}</label>
          <v-text-field
              v-model="blood_sugar"
              :label="$lang.BLOOD_SUGAR"
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
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.PLUS_RATE }}</label>
          <v-text-field
              v-model="plus_rate"
              :label="$lang.PLUS_RATE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              maxlength="5"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.TEMPERATURE }}</label>
          <v-text-field
              v-model="temperature"
              :label="$lang.TEMPERATURE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              maxlength="5"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.SPO2 }}</label>
          <v-text-field
              v-model="temperature"
              :label="$lang.SPO2"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD('')]"
              maxlength="10"
              density="compact"
              hide-details
          >
          </v-text-field>
        </v-col>


        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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

        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" class="py-2" :class="!$vuetify.display.mobile?'px-4':''">
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
      <v-row v-for="(item, i) in prescription_list" :key="i" justify="start" no-gutters="" class="mt-2">
        <v-col class="py-2" cols="10" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DRUG }}</label>
          <v-combobox
              v-model="drug"
              v-model:search-input="item.drug_search_query"
              :items="drug_list"
              filled
              chips
              closable-chips
              label="Select"
              item-title="name"
              item-value="name"
              variant="outlined"
              density="compact"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                  v-bind="props"
                  :text="item.raw.name"
              ></v-chip>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
              <v-list-item
                  v-else
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :title="item.raw.name"
                  :subtitle="item.raw.mobile"
              ></v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DOSE }}</label>
          <v-select
              v-model="item.dose"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
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
        <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.FREQUENCY }}</label>
          <v-select
              v-model="item.frequency"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
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
        <v-col class="py-2" cols="10" md="2" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.INSTRUCTION }}</label>
          <v-select
              v-model="item.instruction"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
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
      </v-row>

      <v-col cols="12" md="10">
        <div class="mt-4">
          <v-btn :loading="btn_loading" block class="register-action-btn" color="primary"
                 height="50px"
                 type="submit">
            <span class="btn_text">{{ $lang.SAVE }}</span>
          </v-btn>
        </div>
      </v-col>
    </v-form>

  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddDrugView',
  components: {},
  data: () => ({
    show_password: false,
    btn_loading: false,
    blood_pressure: "",
    blood_sugar: "",
    plus_rate: "",
    spo2: "",
    temperature: "",
    oe: "",
    required_test: "",
    advise: "",
    chief_complaint: "",
    history_of_chief_complaint: "",

    patient: null,
    patient_list: [],
    drug_list: [],
    prescription_list: [
      {
        drug_search_query: '',
        loading: false,

        drug: null,
        dose: null,
        frequency: null,
        instruction: null,
        qty: null,


      }
    ]
  }),
  mounted() {
    this.getPatientList()
  },
  methods: {
    createPrescription() {

      this.$refs.doctor_form.validate()
      if (!this.valid)
        return false
      this.btn_loading = true
      var form = new URLSearchParams();
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

      const successHandler = (response) => {
        this.$refs.doctor_form.reset()
        this.showSnakeBar('success', this.doctor_table_id ? "Profile Updated" : "Doctor Added")
        this.$router.push({name: 'doctor_profile', params: {id: response.data.doctor_table_id}})
      };
      const finallyHandler = () => {
        // this.btn_loading = false
      };
      this.request_POST(this, this.$urls.DOCTOR_ADD, form, successHandler, null, null, finallyHandler)


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
    }
  }

});
</script>
