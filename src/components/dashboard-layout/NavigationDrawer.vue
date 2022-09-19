<template>
  <v-navigation-drawer
      v-model="this.$store.state.drawer.flag"
      app
      width="200"
      class="custom-drawer"
  >
    <div class="left-nav-bar">
      <div>
        <h3 class="text-center py-5">{{ $keys.ORG_NAME }}</h3>
      </div>
      <v-divider></v-divider>
      <v-list density="compact" nav dense class="pa-0 mt-2 bg-transparent">
        <v-list-item :to="item.url" class="py-1 my-1 my-0" link @click="setActiveTab(item)"
                     v-for="(item, i) in getDrawerItems"
                     :key="i"
                     :class="current_tab == item.url.name?'v-list-item--active':''">
          <v-list-item-avatar start class="ma-0">
            <v-icon :icon="item.icon" size="small"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-btn :ripple="false" class="logout-btn" color="primary" variant="outlined" @click="logout" width="90%">
        <v-icon size="17" class="mt-n1">mdi-logout</v-icon>
        {{ $lang.LOGOUT }}
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
<style lang="scss" media="screen" scoped>
.left-nav-bar {
  //background-color: #e4ebff;
  border-radius: 20px;
  height: 97.5%;
  padding: 30px 10px;
  position: relative;
}

.logout-btn {
  position: absolute;
  bottom: 20px;
}

.custom-drawer .v-list-item--active {
  background-color: rgb(var(--v-theme-primary),);

  .v-list-item-title {
    font-size: 15px;
    font-weight: bold;
    color: white;
  }

  .v-avatar {
    color: white;
  }
}
</style>
<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      drawer: true,
      warehouse: null,
      loading: false,
      mini: false,
      current_tab: "",
    }
  },
  computed: {
    ...mapGetters({
      getDrawerItems: 'drawer/getDrawerItems',
    })
  },
  created() {
    console.log()
    this.$store.dispatch("drawer/setFlag", !this.$vuetify.display.mobile);
    this.$store.dispatch('drawer/setActiveTab', localStorage.getItem("active-tab"))
  },
  methods: {
    setActiveTab(item) {
      this.current_tab = item.url.name
      this.$store.dispatch('drawer/setActiveTab', item.url.name)
    },
    logout() {
      localStorage.removeItem("active-tab");
      localStorage.clear();
      this.$router.push({name: 'login'})
    },
  }
}
</script>