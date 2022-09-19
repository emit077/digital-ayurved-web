<template>
  <div>
    <v-form ref="add_drug_form" v-model="valid" lazy-validation @submit.prevent="addDrug()">
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
              density="compact"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" :class="!$vuetify.display.mobile?'px-4':''">
          <label class="ml-1">{{ $lang.BRAND }}</label>
          <v-text-field
              v-model="form.brand"
              :label="$lang.BRAND"
              variant="outlined"
              single-line
              class="mt-1"
              shaped
              :rules="[$rules.REQUIRED_FIELD($lang.BRAND)]"
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
              v-model="form.formulation"
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
          <label class="ml-1">{{ $lang.ANUPAAN }}</label>
          <v-text-field
              v-model="form.anupaan"
              :label="$lang.ANUPAAN"
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
          <v-btn class="register-action-btn mx-2" color="primary"
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
    drug_table_id: null,
    valid: false,
    form: {
      drug_name: "",
      brand: "",
      formula: "",
      formulation: "",
      anupaan: "",
    },
    show_password: false,
    btn_loading: false,
  }),
  created() {
    if (this.$route.params.id) {
      this.drug_table_id = this.$route.params.id
      this.getDrugDetails()
    }
  },
  methods: {
    async addDrug() {
      await this.$refs.add_drug_form.validate()
      console.log(this.valid)
      if (!this.valid)
        return false
      this.btn_loading = true
      var form = new URLSearchParams();

      this.drug_table_id ? form.append("drug_table_id", this.drug_table_id) : ''

      form.append("drug_name", this.form.drug_name);
      form.append("brand", this.form.brand);
      form.append("formula", this.form.formula);
      form.append("formulation", this.form.formulation);
      form.append("anupaan", this.form.anupaan);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.add_drug_form.reset()
          this.showSnakeBar('success', this.drug_table_id ? "Updated Successfully" : "Added Successfully")
          this.$router.push({name: 'drug_list'})
        }
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.DRUGS_ADD, form, successHandler, null, null, finallyHandler)

    },
    getDrugDetails() {
      var params = {
        drug_table_id: this.drug_table_id,
      }
      const successHandler = (response) => {
        this.form = response.data
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DRUGS_DETAILS, params, successHandler, null, null, finallyHandler)
    }
  }

});
</script>
