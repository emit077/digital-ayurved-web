<template>
  <v-navigation-drawer
    v-model="this.$store.state.drawer.flag"
    app
    width="250"
    class="pl-4"
  >
    <div class="left-nav-bar" id="custom-drawer">
      <div>
        <h3 class="text-center py-5 text-white">{{ $keys.ORG_NAME }}</h3>
      </div>
      <v-divider></v-divider>
      <v-list density="compact" nav dense class="pa-0 mt-2 bg-transparent">
        <v-list-item
          :to="item.url"
          class="py-1 my-2 my-0 mx-1"
          link
          @click="setActiveTab(item)"
          v-for="(item, i) in getDrawerItems"
          :key="i"
          :class="
            current_tab == item.url.name
              ? 'v-list-item--active elevation-1'
              : ''
          "
        >
          <v-list-item-avatar start class="ma-0">
            <v-icon :icon="item.icon" color="#FFF" size="25"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-btn
        :ripple="false"
        class="logout-btn"
        color="surface"
        variant="text"
        @click="logout"
        width="100%"
      >
        {{ $lang.LOGOUT }}
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
<style lang="scss" media="screen" scoped>
#custom-drawer .v-list-item {
  cursor: pointer !important;
}
#custom-drawer .v-list-item-title {
  font-size: 15px;
  font-weight: 400;
  color: #ffffff !important;
  border-radius: 5px;
}


.v-list-item--active {
  background-color: rgb(var(--v-theme-primary));
  .v-list-item-title {
    font-size: 15px;
    font-weight: bold;
    color: #ffffff !important;
  }
}
.left-nav-bar {
  //background-color: #e4ebff;
  border-radius: 20px;
  height: 98%;
  padding: 30px 10px;
  position: relative;
}

.logout-btn {
  position: absolute;
  bottom: 15px;
}
</style>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      warehouse: null,
      loading: false,
      mini: false,
      current_tab: "",
    };
  },
  computed: {
    ...mapGetters({
      getDrawerItems: "drawer/getDrawerItems",
    }),
  },
  created() {
    this.current_tab = localStorage.getItem("active-tab");
    this.$store.dispatch("drawer/setFlag", !this.$vuetify.display.mobile);
    this.$store.dispatch(
      "drawer/setActiveTab",
      localStorage.getItem("active-tab")
    );
  },
  methods: {
    setActiveTab(item) {
      this.current_tab = item.url.name;
      this.$store.dispatch("drawer/setActiveTab", item.url.name);
    },
    logout() {
      localStorage.removeItem("active-tab");
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
