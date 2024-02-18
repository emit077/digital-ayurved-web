<template>
  <v-card class="h-100">
    <v-card-text class="pb-2">
      <span class="text-h6">{{ title }}</span>
      <v-table class="mt-1" density="compact">
        <tbody>
          <tr
            class="v-align-middle text-caption"
            v-for="(item, i) in drug_list"
            :key="i"
          >
            <td class="pl-0">{{ item.drug_name }}</td>
            <td
              class="text-right pr-0 v-align-middle"
              v-if="
                item.available_qty !== null || item.available_qty !== undefind
              "
            >
              <small>{{ item.available_qty }}</small>
            </td>
            <td
              class="text-right pr-0 v-align-middle text-small"
              v-if="item.expiry_date"
            >
              <small>{{ item.expiry_date }}</small>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="text-right pt-2">
        <small class="text-primary">See All</small>
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped></style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SalesCard",
  components: {},
  props: ["drug_list", "title"],
  data: () => ({}),
  methods: {},
});
</script>
