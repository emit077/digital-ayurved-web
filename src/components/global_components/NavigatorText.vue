<template>
  <div>
    <router-link :to="{name:router_name, params:router_params}" :target="target" class="navigation-text">
      {{ text }}
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.navigation-text{
  text-decoration: none;
}

</style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigatorText",
  props: {
    text: {
      type: String,
      required: true,
    },
    router_name: {
      type: String,
      required: true,
    },
    router_params: {
      type: Object,
      required: true,
    },
    target: {
      default: "_blank",
    },
  },
  data: () => ({
    flag: false,
  }),
  mounted(){
    console.log("router_params",this.router_params);
  },
  methods: {},
});
</script>
