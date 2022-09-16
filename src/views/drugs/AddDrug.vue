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
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="10" class="text-center">
          <v-btn :loading="btn_loading" class="register-action-btn mx-2" color="primary"
                 height="50px" width="300px" type="submit">
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
