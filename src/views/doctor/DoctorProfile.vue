<style lang="scss">
.doctor-profile-card {
  border-radius: 20px;
  border: solid 1px lightgrey;
}

.edit-profile-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

</style>

<template>
  <div>
    <div class="doctor-profile-card" :class="$vuetify.display.mobile?'text-center':''">
      <v-row no-gutters>
        <v-col cols="12" md="2" class="pa-3">
          <v-avatar size="150" class="ma-4">
            <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="8" :class="$vuetify.display.mobile?'':'py-12'">
          <p :class="$vuetify.display.mobile?'text-h6':'text-h4'"> Dr. {{ name }} </p>
          <h4 class="mb-1"> +91 {{ mobile }}</h4>
          <h4 class="mb-1"> {{ email }} </h4>
        </v-col>
        <v-col cols="12" md="2" :class="$vuetify.display.mobile?'text-center':'pa-3 text-right'">
          <div class="position-relative h-100 pr-3">
            <p class="mb-1"> Reg Id : <br v-if="!$vuetify.display.mobile"> <strong> {{ medical_reg_no }} </strong></p>
            <router-link :to="'/doctor/edit/'+doctor_table_id">
              <v-btn color="primary" size="small" prepend-icon="mdi-pencil"
                     :class="$vuetify.display.mobile?'text-center my-4':'edit-profile-btn'">{{ $lang.EDIT_PROFILE }}
              </v-btn>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters class="px-3 mt-5">
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.DOB }}:</label>
        <p class="text-subtitle-1">{{ dob }}</p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.GENDER }}:</label>
        <p class="text-subtitle-1">{{ gender }}</p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.DESIGNATION }}:</label>
        <p class="text-subtitle-1">{{ designation }}</p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.DEGREE }}:</label>
        <p class="text-subtitle-1">{{ degree }}</p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.CITY }}:</label>
        <p class="text-subtitle-1">{{ city }}</p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.ADDRESS }}:</label>
        <p class="text-subtitle-1">{{ address }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddDoctorView',
  components: {},
  data: () => ({
    doctor_table_id: null,
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
  }),
  mounted() {
    this.doctor_table_id = this.$route.params.id || null
    if (this.doctor_table_id)
      this.getDoctorDetails()
  },
  methods: {
    getDoctorDetails() {
      var params = {
        doctor_table_id: this.doctor_table_id,
      }
      const successHandler = (response) => {
        this.name = response.data.name
        this.mobile = response.data.mobile
        this.email = response.data.email
        this.gender = response.data.gender
        this.dob = response.data.dob
        this.degree = response.data.degree
        this.medical_reg_no = response.data.medical_reg_no
        this.designation = response.data.designation
        this.address = response.data.address
        this.city = response.data.city
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DOCTOR_DETAILS, params, successHandler, null, null, finallyHandler)
    }
  }

});
</script>
