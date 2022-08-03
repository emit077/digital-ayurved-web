<style lang="scss" media="screen" scoped>

</style>

<template>
  <v-navigation-drawer
      v-model="this.$store.state.drawer.flag"
      app
      width="200"
  >
    <div>
      <h3 class="text-center py-5">{{ $keys.ORG_NAME }}</h3>
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav dense class="pa-0 mt-2">
      <v-list-item :to="item.url" class="py-1 my-0" link @click="setActiveTab(item)" v-for="(item, i) in getDrawerItems"
                   :key="i">
        <v-list-item-avatar start class="ma-0">
          <v-icon :icon="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2 text-right">
        <v-btn :ripple="false" block color="primary" variant="outlined" @click="logout">
          <v-icon size="17" class="mt-n1">mdi-logout</v-icon>
          <span>{{ $lang.LOGOUT }}</span>

        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

</template>
<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      drawer: true,
      warehouse: null,
      loading: false,
      mini: false,
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
  }
  ,
  methods: {
    setActiveTab(item) {
      console.log(item)
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