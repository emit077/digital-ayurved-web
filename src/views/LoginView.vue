<style scoped lang="scss">
.underline-style {
  height: 3px;
  width: 25px;
  margin-left: 17px;
  margin-top: -5px;
}

.login-card {
  border: solid 1px lightgrey;
}
</style>

<template>
  <div>
    <v-row justify="center" no-gutters="">
      <v-col md="4" sm="12" class="h-100 mt-15 px-3">
        <v-card class="mx-auto login-card  py-8 "
                :class="!$vuetify.display.mobile?'elevation-5 px-4 mt-15':'elevation-0  '">
          <div class="">
            <h2 class="ml-4">{{ $lang.LOGIN }}</h2>
            <div class="underline-style bg-primary"></div>
          </div>
          <v-card-text class="mt-5">
            <v-form ref="login_form" v-model="valid" lazy-validation @submit.prevent="login()">
              <div>
                <label class="ml-1">{{ $lang.MOBILE_NUMBER }}</label>
                <v-text-field
                    v-model="mobile"
                    :label="$lang.MOBILE_NUMBER"
                    variant="outlined"
                    single-line
                    class="mt-1"
                    shaped
                    :rules="$rules.MOBILE"
                    maxlength="10"
                    required
                >
                </v-text-field>
              </div>
              <div>
                <label class="ml-1">{{ $lang.PASSWORD }}</label>
                <v-text-field
                    v-model="password"
                    :label="$lang.ENTER_YOUR_PASSWORD"
                    :rules="$rules.PASSWORD"
                    :type="show_password?'text':'password'"
                    variant="outlined"
                    single-line
                    shaped
                    hint="At least 8 characters"
                    class="mt-1"
                    maxlength="20"
                    required
                    :append-inner-icon="show_password?'mdi-eye-outline':'mdi-eye-off-outline'"
                    @click:append-inner="show_password=!show_password"
                >
                </v-text-field>
              </div>

              <div class="mt-4">
                <v-btn :loading="btn_loading" block class="register-action-btn" color="primary"
                       height="50px"
                       type="submit">
                  <span class="btn_text">{{ $lang.LOGIN_TO_CONTINUE }}</span>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      valid: true,
      mobile: "",
      password: "",
      show_password: false,
      btn_loading: false,
    }
  },
  methods: {
    login() {
      this.$refs.login_form.validate()
      if (!this.valid)
        return false
      this.btn_loading = true
      var form = new URLSearchParams();
      form.append("mobile", this.mobile);
      form.append("password", this.password);

      const successHandler = (response) => {
        localStorage.setItem("token", response.headers.token);
        localStorage.setItem("account_type", response.data.account_type);
        this.$store.dispatch("user/setUser", {name: response.data.name, account_type: response.data.account_type});
        this.$refs.login_form.reset()
        this.$router.push({name: 'dashboard'})
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_POST(this, this.$urls.LOGIN, form, successHandler, null, null, finallyHandler)

    }
  }
}
</script>
