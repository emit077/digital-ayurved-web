<style lang="scss" scoped>
thead tr th,
tbody tr td {
  padding: 7px 10px !important;
}

th {
  background-color: #3e3e3e;
  color: white;
}

thead tr th:first-child {
  border-top-left-radius: 5px;
}

thead tr th:last-child {
  border-top-right-radius: 5px;
}
</style>
<template>
  <v-table>
    <thead>
    <tr>
      <th v-for="(header,i) in headers" class="text-subtitle-2" :key="i">
        {{ header.title }}
      </th>
    </tr>
    </thead>
    <tbody v-if="items.length>0">
    <tr v-for="(item, i) in items" :key="i">
      <td v-for="(header, j) in headers" :key="j">
        <div v-if="header.type=='btn'" :class="header.class">
          <span v-for="(btn,k) in header.btn_list" :key="k">
            <span v-if="btn.btn_type=='delete-btn'">
              <v-btn size="x-small" icon="" variant="text" :color="btn.color?btn.color:'#000'"
                     @click="$emit('delete', item.id)">
                <v-icon :size="btn.size ? btn.size:20">{{ btn.btn_icon }}</v-icon>
              </v-btn>
            </span>
            <router-link :to="btn.route_name+item[btn.router_key]"
                         :target="btn.target" v-else>
              <v-btn size="x-small" icon="" variant="text" :color="btn.color?btn.color:'#000'">
                <v-icon :size="btn.size ? btn.size:20">{{ btn.btn_icon }}</v-icon>
              </v-btn>
            </router-link>
          </span>

        </div>
        <div v-else>
          <div class="d-inline-flex v-align-middle mr-2" v-if="header.gender_icon">
            <v-icon v-if="item.gender=='Male'">mdi-gender-female</v-icon>
            <v-icon v-else-if="item.gender=='Female'">mdi-gender-male</v-icon>
            <v-icon v-else-if="item.gender=='Transgender'">mdi-gender-transgender</v-icon>
            <v-icon v-else>mdi-gender-non-binary</v-icon>
          </div>
          <div class="d-inline-flex v-align-middle" :class="header.class">
            <div v-if="Array.isArray(header.value)">
              <p v-for="(el, k) in header.value" :key="k">{{ item[el] }}</p>
            </div>
            <div v-else>
              {{ item[header.value] }}
            </div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
    <tbody v-else>
    <tr>
      <td :colspan="headers.length" class="text-center">
        No Record Found
      </td>
    </tr>
    </tbody>
  </v-table>
</template>


<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    config: {
      type: Object
    }
  },
  components: {},
  data: () => ({}),
  methods: {}
});
</script>
