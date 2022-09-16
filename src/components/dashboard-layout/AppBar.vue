<style lang="scss" scoped>
.btn-box {
  width: 35px;
  background-color: transparent;
  display: inline-block;
}

@media screen and (max-width: 1260px) {
  .btn-box {
    width: 30px;
    background-color: transparent;
    display: inline-block;
    //margin-left: 20px;
  }
}

.page-title-text {
  font-style: normal;
  font-weight: bold;
  line-height: 26px;
  color: #32345F;
}
</style>
<template>
  <v-app-bar app color="rgb(250, 251, 253)" class="elevation-0">
    <div class="btn-box">
      <v-btn color="primary" size="35" icon="" text depressed fab class="pa-0" v-if="$route.meta.show_back_btn"
             @click="$router.go(-1)">
        <v-icon color="primary" :size="($vuetify.display.mobile)? 25 :30">mdi-chevron-left
        </v-icon>
      </v-btn>
    </div>

    <v-toolbar-title class="page-title-text"
                     :class="$vuetify.display.mobile? 'fs-14' : 'fs-18'">
      {{ $route.meta.title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="$vuetify.display.mobile" icon size="small"
           @click="$store.dispatch('drawer/setFlag', true);">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>