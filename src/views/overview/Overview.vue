<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="12" md="6" xl="4">
        <router-link :to="{ name: 'prescription'}">
          <v-btn color="primary">
            New Prescription
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

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
