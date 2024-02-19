<template>
  <v-navigation-drawer
    v-model="this.$store.state.drawer.flag"
    app
    width="250"
    class="pl-3"
  >
    <div class="left-nav-bar" id="custom-drawer">
      <div>
        <h3 class="text-center py-5 text-white">{{ $keys.ORG_NAME }}</h3>
      </div>
      <v-divider></v-divider>

      <v-list v-model:opened="open">
        <span v-for="(item, i) in getDrawerItems" :key="i">
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.title"
            :to="item.url"
            class="my-3 mx-1"
            link
            @click="setActiveTab(item)"
            v-if="!item.childs"
          ></v-list-item>

          <v-list-group
            v-else
            :value="item.title"
            color="#fff"
            active-color="#fff"
            :class="item.title==current_tab?'v-list-group--open':''"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="my-3 mx-1"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(obj, i) in item.childs"
              :key="i"
              :prepend-icon="obj.icon"
              :title="obj.title"
              :value="obj.title"
              :to="obj.url"
              class="my-3 mx-1"
              link
              @click="setActiveTab(item)"
            ></v-list-item>
          </v-list-group>
        </span>
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
a.v-list-item--active {
  background-color: rgb(var(--v-theme-primary)) !important;
  border-radius: 8px;
  .v-list-item-title {
    font-size: 15px;
    font-weight: bold;
    color: #ffffff !important;
  }
}
.left-nav-bar {
  //background-color: #e4ebff;
  border-radius: 20px;
  height: 99.5%;
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
      open: ["Users"]
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
      this.current_tab = item.title;
      this.$store.dispatch("drawer/setActiveTab", item.title);
    },
    logout() {
      localStorage.removeItem("active-tab");
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
