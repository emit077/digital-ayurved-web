<template>
  <div>
    <v-form ref="doctor_form" v-model="valid" lazy-validation @submit.prevent="addDoctor()">
      <v-row no-gutters>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.NAME }}</label>
          <v-text-field
              v-model="form.name"
              :label="$lang.NAME"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.NAME)]"
              maxlength="50"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DOB }}</label>
          <v-text-field
              v-model="form.dob"
              :label="$lang.DOB"
              variant="outlined"
              single-line
              class="mt-1"
              type="date"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.DOB)]"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DEGREE }}</label>
          <v-select
              v-model="form.degree"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
              :label="$lang.DEGREE"
              variant="outlined"
              single-line
              class="mt-1"
              :rules="[$rules.REQUIRED_FIELD($lang.DEGREE)]"
              density="compact"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DESIGNATION }}</label>
          <v-select
              v-model="form.designation"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
              :label="$lang.DESIGNATION"
              variant="outlined"
              single-line
              class="mt-1"
              :rules="[$rules.REQUIRED_FIELD($lang.DESIGNATION)]"
              density="compact"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.MEDICAL_REG_NUMBER }}</label>
          <v-text-field
              v-model="form.medical_reg_no"
              :label="$lang.MEDICAL_REG_NUMBER"
              variant="outlined"
              single-line
              class="mt-1"
              :rules="[$rules.REQUIRED_FIELD($lang.MEDICAL_REG_NUMBER)]"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
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
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <div>
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
          </div>
          <div>
            <label class="ml-1">{{ $lang.PASSWORD }}</label>
            <v-text-field
                v-model="form.password"
                :label="$lang.ENTER_YOUR_PASSWORD"
                :rules="!doctor_table_id?$rules.PASSWORD:true"
                :type="show_password?'text':'password'"
                variant="outlined"
                single-line
                shaped
                hint="At least 8 characters"
                class="mt-1"
                maxlength="20"
                density="compact"
                :append-inner-icon="show_password?'mdi-eye-outline':'mdi-eye-off-outline'"
                @click:append-inner="show_password=!show_password"
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">


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
  name: 'AddDoctorView',
  components: {},
  data: () => ({
    doctor_table_id: null,
    form: {
      name: "",
      mobile: "",
      email: "",
      gender: "",
      dob: "",
      designation: "",
      medical_reg_no: "",
      degree: "",
      city: "",
      address: "",
      password: "",
    },
    show_password: false,
    btn_loading: false,
    valid: false,
  }),
  mounted() {
    this.doctor_table_id = this.$route.params.id || null
    if (this.doctor_table_id)
      this.getDoctordetails()
  },
  methods: {
    addDoctor() {
      this.$refs.doctor_form.validate()
      if (!this.valid)
        return false
      this.btn_loading = true
      var form = new URLSearchParams();
      form.append("name", this.form.name);
      form.append("mobile", this.form.mobile);
      form.append("email", this.form.email);
      form.append("gender", this.form.gender);
      form.append("dob", this.form.dob);
      form.append("designation", this.form.designation);
      form.append("medical_reg_no", this.form.medical_reg_no);
      form.append("degree", this.form.degree);
      form.append("city", this.form.city);
      form.append("address", this.form.address);
      this.form.password ? form.append("password", this.form.password) : "";
      this.doctor_table_id ? form.append("doctor_table_id", this.doctor_table_id) : "";

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
    getDoctordetails() {
      var params = {
        doctor_table_id: this.doctor_table_id,
      }
      const successHandler = (response) => {
        this.form.name = response.data.name
        this.form.mobile = response.data.mobile
        this.form.email = response.data.email
        this.form.gender = response.data.gender
        this.form.dob = response.data.dob
        this.form.degree = response.data.degree
        this.form.medical_reg_no = response.data.medical_reg_no
        this.form.designation = response.data.designation
        this.form.address = response.data.address
        this.form.city = response.data.city
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DOCTOR_DETAILS, params, successHandler, null, null, finallyHandler)
    }
  }

});
</script>
