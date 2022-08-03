<template>
  <v-snackbar v-model="getSnackbar.flag" :color="getSnackbar.color" :timeout="timeout"
              position="absolute" location="top right">
    <b class="text--white">
      {{ getSnackbar.text }}
    </b>

    <template v-slot:actions>
      <v-btn
          size="small"
          text
          fab
          icon="mdi-close"
          @click="getSnackbar.flag = !getSnackbar.flag">
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getSnackbar: 'snackbar/getSnackbar',
    })
  },
  data: () => ({
    timeout: 2000,
    snackbar: true
  }),

}
</script>