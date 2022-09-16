<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="12" md="3" xl="4" class="overview-card">
        <router-link :to="{ name: 'prescription'}" class="router-text-decoration">
          <div class="border h-100 d-flex align-center justify-center">
            <div class="text-center">
              <v-icon > mdi-plus</v-icon>
              <p>New Prescription</p>
            </div>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.overview-card {
  height: 200px;
  text-decoration: none !important;
  color: rgb(var(--v-theme-primary));
}
.overview-card :hover{
  background-color: rgb(var(--v-theme-primary),0.1);
}
</style>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'OverviewVue',
  data: () => ({}),
  mounted() {
    this.getDrugList()
  }
  ,
  methods: {
    getDrugList() {
      var params = {
        search_query: this.search_query,
        page_number: this.page_number,
      }
      const successHandler = (response) => {
        this.drug_list = response.data.drug_list
        this.total_page_count = response.data.total_page_count
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.DRUGS_LIST, params, successHandler, null, null, finallyHandler)
    }
  }
})
;
</script>
