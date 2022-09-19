<template>
  <div>
    <v-form ref="patient_form" v-model="valid" lazy-validation @submit.prevent="addPatient()">
      <v-row no-gutters>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.FIRST_NAME }}</label>
          <v-text-field
              v-model="form.first_name"
              :label="$lang.FIRST_NAME"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD( $lang.FIRST_NAME)]"
              maxlength="50"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.LAST_NAME }}</label>
          <v-text-field
              v-model="form.last_name"
              :label="$lang.LAST_NAME"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.LAST_NAME)]"
              maxlength="50"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-2':''">
          <label class="ml-1">{{ $lang.MOBILE_NUMBER }}</label>
          <v-text-field
              v-model="form.mobile"
              :label="$lang.MOBILE_NUMBER"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="$rules.MOBILE"
              maxlength="10"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.EMAIL }}</label>
          <v-text-field
              v-model="form.email"
              :label="$lang.EMAIL"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="$rules.EMAIL"
              maxlength="60"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.GENDER }}</label>
          <v-select
              v-model="form.gender"
              :label="$lang.GENDER"
              :items="['Male','Female','Transgender','Other']"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.GENDER)]"
              maxlength="60"
              density="compact"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.OCCUPATION }}</label>
          <v-text-field
              v-model="form.occupation"
              :label="$lang.OCCUPATION"
              variant="outlined"
              single-line
              class="mt-1"
              :rules="[$rules.REQUIRED_FIELD( $lang.OCCUPATION)]"
              density="compact"
          >
          </v-text-field>


        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.AGE }}</label>
          <v-text-field
              v-model="form.age"
              :label="$lang.AGE"
              variant="outlined"
              single-line
              class="mt-1"
              :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
              density="compact"
          >
          </v-text-field>
          <label class="ml-1">{{ $lang.CITY }}</label>
          <v-text-field
              v-model="form.city"
              :label="$lang.CITY"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.CITY)]"
              maxlength="50"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.ADDRESS }}</label>
          <v-textarea
              v-model="form.address"
              :label="$lang.ADDRESS"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.ADDRESS)]"
              maxlength="120"
              density="compact"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <!--  Action Btn    -->
      <v-row no-gutters class="mt-7">
        <v-col cols="12" md="12" class="text-center">
          <v-btn :loading="btn_loading" class="register-action-btn mx-2" color="primary"
                 height="50px" width="300px" type="submit">
            <span class="btn_text">{{ $lang.SAVE }}</span>
          </v-btn>
          <v-btn class="register-action-btn mx-2" color="primary"
                 height="50px" width="300px" variant="outlined" @click="flag=false">
            <span class="btn_text">{{ $lang.CANCEL }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddPatient',
  components: {},
  data: () => ({
    flag: false,
    patient_table_id: null,
    form: {
      first_name: "Hello",
      last_name: "sahu",
      mobile: "9000900099",
      email: "hello@gmail.com",
      gender: "Male",
      age: "19",
      occupation: "Farmer",
      city: "Raipur",
      address: "Gudhiyari",
    },
    show_password: false,
    btn_loading: false,
    valid: false,
  }),
  mounted() {
    this.patient_table_id = this.$route.params.id || null
    if (this.patient_table_id)
      this.getPatientDetails()
  },
  methods: {
    addPatient() {
      this.$refs.patient_form.validate()
      if (!this.valid)
        return false
      this.btn_loading = true
      var form = new URLSearchParams();
      form.append("patient_first_name", this.form.first_name);
      form.append("patient_last_name", this.form.last_name);
      form.append("mobile", this.form.mobile);
      form.append("email", this.form.email);
      form.append("gender", this.form.gender);
      form.append("age", this.form.age);
      form.append("occupation", this.form.occupation);
      form.append("city", this.form.city);
      form.append("address", this.form.address);
      this.patient_table_id ? form.append("patient_table_id", this.patient_table_id) : "";

      const successHandler = (response) => {
        this.$refs.patient_form.reset()
        this.showSnakeBar('success', this.patient_table_id ? "Profile Updated" : "Patient Added")
        this.$router.push({name: 'patient_profile', params: {id: response.data.patient_table_id}})
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.PATIENT_ADD, form, successHandler, null, null, finallyHandler)

    },
    getPatientDetails() {
      var params = {
        patient_table_id: this.patient_table_id,
      }
      const successHandler = (response) => {
        this.form.first_name = response.data.patient_first_name
        this.form.last_name = response.data.patient_last_name
        this.form.mobile = response.data.mobile
        this.form.email = response.data.email
        this.form.gender = response.data.gender
        this.form.age = response.data.age
        this.form.occupation = response.data.occupation
        this.form.address = response.data.address
        this.form.city = response.data.city
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.PATIENT_DETAILS, params, successHandler, null, null, finallyHandler)
    }
  }

});
</script>
