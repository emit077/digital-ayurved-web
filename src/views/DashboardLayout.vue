<template>
  <!-- App.vue -->
  <!--  <v-app>-->
  <!-- drawer -->
  <navigation-drawer/>
  <!-- nav -->
  <app-bar/>
  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>
  <!--  </v-app>-->
</template>

<script>
import AppBar from "@/components/dashboard-layout/AppBar.vue"
import NavigationDrawer from "@/components/dashboard-layout/NavigationDrawer.vue"

export default {
  components: {
    NavigationDrawer,
    AppBar,
  },
  methods: {}
}
</script>