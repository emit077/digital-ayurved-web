<template>
  <v-app>
    <!--    <v-main>-->
    <router-view/>
    <!--    </v-main>-->
    <snake-bar/>
  </v-app>
</template>
<style lang="scss">
@import "assets/css/style.scss";
</style>

<script>
// import SnakeBar from "@/components/dashboard-layout/SnackBar.vue"


export default {
  name: 'App',
  components: {
    // SnakeBar
  },
  data: () => ({
    //
  }),
}
</script>
