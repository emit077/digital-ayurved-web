<template>
  <v-card class="h-100 bg-white">
    <v-card-text class="pb-2">
      <div class="mt-n8 text-center title-container elevation-3 mx-5">
        <span class="text-h6">{{ title }}</span>
      </div>
      <div v-if="!drug_list || drug_list.length == 0" class="text-center mt-5 no-data">
        No data available
    </div>
      <div v-else>
        <v-divider class="mt-5"></v-divider>
        <v-table density="compact">
          <tbody>
            <tr
              class="v-align-middle text-caption bg-white"
              v-for="(item, i) in drug_list"
              :key="i"
            >
              <td class="pl-0">{{ item.drug_name }}</td>
              <td
                class="text-right v-align-middle"
                v-if="item.available_qty || parseInt(item.available_qty) == 0"
              >
                <small>{{ item.available_qty }}</small>
              </td>
              <td
                class="text-right v-align-middle text-small"
                v-if="item.expiry_date"
              >
                <small>{{ item.expiry_date }}</small>
              </td>

              <td
                class="text-right v-align-middle"
                v-if="item.quantity || parseInt(item.quantity) == 0"
              >
                <small>{{ item.quantity }}</small>
              </td>
              <td
                class="text-right v-align-middle text-small"
                v-if="item.amount || parseInt(item.amount) == 0"
              >
                <small>₹{{ parseInt(item.amount) }}</small>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="text-right pt-2" v-if="routerlink">
          <v-divider></v-divider>
          <small class="text-primary">See All</small>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>

.title-container {
  border-radius: 5px;
  padding: 5px;
  color: #fff;
  background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SalesCard",
  components: {},
  props: ["drug_list", "title", "routerlink"],
  data: () => ({}),
  methods: {},
});
</script>
