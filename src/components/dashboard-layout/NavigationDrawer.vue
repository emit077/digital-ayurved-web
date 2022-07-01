<style lang="scss" media="screen" scoped>


.tab-border {
  border-bottom: 0.5px solid #99A5CA73 !important;
}

.tab-border-t {
  border-top: 0.5px solid #99A5CA73 !important;
}


.drawer-icons {
  height: 14px;
  width: 14px;
}

.drawer-text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 19px;
  color: #FFFFFF;
  //color: #32345F;
}


.drawer_list .v-list-item--link::before {
  background-color: #32345F !important;
}

.drawer_list .v-list-item--active {
  background-color: #32345F;

}

.drawer_list .v-list-item--active .drawer-text {
  color: #32345F !important;
}

a.v-list-item--active {
  background: yellow !important;
  width: 95%;
  color: white !important;
  border-top-right-radius: 20%;
  border-bottom-right-radius: 80%;
  //border-bottom-right-radius: 200px;
  //border-left: 5px solid #FFF200 !important;

}

.v-list-item {
  //border-left: 5px solid transparent;

}
</style>

<template>
  <v-card>
    <v-navigation-drawer
        v-model="$store.state.drawer.drawer"
        app
        class="elevation-0"
        color="primary"
        width="200"

    >
      <v-list-item class="px-2 py-2 text-center">
        <!--                <v-list-item-avatar>-->
        <!--                  <v-img v-if="mini" src="@/assets/logo/dashboard.svg"></v-img>-->
        <!--                </v-list-item-avatar>-->
        <v-list-item-title class="text-center">
          <div class="text-center">
            <v-img class="mt-2 ml-7" src="@/assets/logo/logo.svg" width="110px"></v-img>
          </div>
        </v-list-item-title>
        <!--        <v-btn-->
        <!--            icon-->
        <!--            @click.stop="mini = !mini">-->
        <!--          <v-icon>mdi-chevron-left</v-icon>-->
        <!--        </v-btn>-->
      </v-list-item>
      <v-list class="pa-0 drawer_list" dense nav>
        <div v-for="(item, i) in getDrawerItems" :key="i">
          <v-list-item v-if="item.access_by.includes(getUser.account_type)"
                       :to="item.url" class="py-1" link
                       @click="setActiveTab(item)">
            <!--            <v-list-item-icon class="my-3 mx-2">-->
            <!--              <img :src="item.is_active_tab?item.src_active:item.src" alt="">-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content>
              <v-list-item-title class="drawer-text pl-2">
                <!-- <a class="drawer-text"> -->
                {{ item.title }}
                <!-- </a> -->
              </v-list-item-title>

            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <!--    logout btn    -->
      <template v-slot:append>
        <div class="pa-2 text-right">
          <v-btn :ripple="false" block color="theme_yellow" @click="logout">
            <!--                        <img alt="" class="mr-2" src="@/assets/drawer-assets/logout.svg">-->
            <span>{{ $lang.LOGOUT }}</span>
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>

  </v-card>
</template>
<script>

import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      warehouse: null,
      loading: false,
      mini: false,
    }
  },
  computed: mapGetters({
    getDrawerItems: 'drawer/getDrawerItems',
    getManageTab: 'drawer/getManageTab',
  }),
  created() {
    // console.log('$store.state.primary_drawer')
    // console.log(this.$store.state.drawer.primary_drawer)
    this.$store.state.drawer.drawer = !this.$store.state.is_mobile
    this.$store.dispatch('drawer/setActiveTab', localStorage.getItem("active-tab"))
  },
  methods: {
    setActiveTab(item) {
      console.log(item)
      this.$store.dispatch('drawer/setActiveTab', item.url.name)
    },
    logout() {
      localStorage.removeItem("active-tab");
      // localStorage.removeItem("token");
      localStorage.clear();
      this.$router.push({name: 'login'})
    },

  }
}
</script>