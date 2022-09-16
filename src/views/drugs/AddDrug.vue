<template>
  <div>
    <v-form ref="add_drug_form" lazy-validation @submit.prevent="addDoctor()">
      <v-row no-gutters>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.DRUG_NAME }}</label>
          <v-text-field
              v-model="form.drug_name"
              :label="$lang.DRUG_NAME"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.DRUG_NAME)]"
              maxlength="50"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.FORMULA }}</label>
          <v-text-field
              v-model="form.formula"
              :label="$lang.FORMULA"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.FORMULA)]"
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.FORMULATION_TYPE }}</label>
          <v-text-field
              v-model="form.formulation_type"
              :label="$lang.FORMULATION_TYPE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.FORMULATION_TYPE }}</label>
          <v-text-field
              v-model="form.formulation_type"
              :label="$lang.FORMULATION_TYPE"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.GENDER }}</label>
          <v-select
              v-model="form.gender"
              :label="$lang.GENDER"
              :items="['Male','Female','Transgender','Intersex','Non-Conforming','Other']"
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
              v-model="form.city"
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

          <label class="ml-1">{{ $lang.PASSWORD }}</label>
          <v-text-field
              v-model="form.name"
              :label="$lang.ENTER_YOUR_PASSWORD"
              :rules="$rules.PASSWORD"
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
    form: {
      drug_name: "",
      formula: "",
      formulation_type: "",
      dose_type: "",
      anupaan: "",
    },
    show_password: false,
    btn_loading: false,
  }),
  methods: {
    addDoctor() {

    }
  }

});
</script>
