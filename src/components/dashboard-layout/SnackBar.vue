<template>

  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
  >
    Hello data table

  </v-snackbar>
  <!--  <v-snackbar :color="getSnakbar.color" top right :timeout="timeout">-->
  <!--    <b class="text&#45;&#45;white">-->
  <!--      {{ getSnakbar.text }}-->
  <!--    </b>-->
  <!--    <template v-slot:action="{ attrs }">-->
  <!--      <v-btn v-bind="attrs" class="float-right px-0" dark fab-->
  <!--             small-->
  <!--             text-->
  <!--             @click="getSnakbar.flag = !getSnakbar.flag">-->
  <!--        &lt;!&ndash; <b>close</b> &ndash;&gt;-->
  <!--        <v-icon>mdi-close-circle-outline</v-icon>-->
  <!--      </v-btn>-->
  <!--    </template>-->
  <!--  </v-snackbar>-->
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