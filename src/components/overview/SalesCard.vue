<template>
  <div>
    <v-card class="pa-0">
      <v-card-text>
        <div class="icon-container pa-4 mt-n9 float-left">
          <v-icon color="#fff" size="25">{{ sales_data.icon }}</v-icon>
        </div>
        <div class="text-right">
          <span class="text-subtitle-2">{{ sales_data.title }}</span>
          <p class="text-h4 font-weight-bold">{{ sales_data.value }}</p>
        </div>
        <!-- <v-divider class="mt-3"></v-divider>
        <div class="text-right pt-2">
          <span class="text-green">{{ sales_data.analatical_value }}% </span>
          <span>than last week</span>
        </div> -->
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.icon-container {
  border-radius: 5px;
  width: min-content;
  background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SalesCard",
  props: ["sales_data"],
  components: {},
  data: () => ({}),
  methods: {},
});
</script>
