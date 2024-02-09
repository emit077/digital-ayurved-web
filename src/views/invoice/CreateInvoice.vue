<template>
  <div>
    <v-form ref="purchase_order_form" v-model="valid" lazy-validation>
      <v-row no-gutters v-if="!$route.params.id">
        <v-col
          cols="12"
          md="5"
          class="py-2"
          :class="!$vuetify.display.mobile ? '' : ''"
        >
          <label class="ml-1">{{ $lang.VENDOR }}</label>
          <v-autocomplete
            v-model="vendor"
            v-model:search-input="vendor_search_query"
            :rules="[$rules.REQUIRED_FIELD('')]"
            :items="vendor_list"
            variant="outlined"
            density="compact"
            placeholder="Select Vendor"
            class="custom-combobox"
            hide-details
            @focus="getVendorList"
            @keydown="getVendorList"
            item-title="vendor_name"
            item-value="id"
          >
            <template v-slot:selection="data">
              <span>
                {{ data.item.raw.vendor_name }}
              </span>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-if="typeof item.raw !== 'object'"
                v-bind="props"
              ></v-list-item>
              <v-list-item
                v-else
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :title="item.raw.vendor_name"
                :subtitle="item.raw.contact_number"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <!-- order items -->
      <div>
        <table>
          <thead>
            <tr>
              <td style="min-width: 30%">{{ $lang.DRUG }}</td>
              <td style="min-width: 10%">{{ $lang.EXPIRY_DATE }}</td>
              <td style="min-width: 10%">{{ $lang.QTY }}</td>
              <td style="min-width: 10%">{{ $lang.UNIT_PRICE }}</td>
              <td class="text-right" style="min-width: 10%">
                {{ $lang.TOTAL }}
              </td>
              <td style="width: 3%"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in order_item_list" :key="i">
              <td>
                <v-autocomplete
                  v-model="item.drug"
                  v-model:search-input="item.drug_search_query"
                  :items="drug_list"
                  :rules="[$rules.REQUIRED_FIELD('')]"
                  placeholder="Drug"
                  variant="outlined"
                  density="compact"
                  class="custom-combobox mt-1"
                  hide-details
                  item-title="drug_name"
                  item-value="drug_table_id"
                  @focus="getDrugList"
                  @keydown="getDrugList"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-if="typeof item.raw !== 'object'"
                      v-bind="props"
                    ></v-list-item>
                    <v-list-item
                      v-else
                      v-bind="props"
                      :prepend-avatar="item.raw.avatar"
                      :title="item.raw.drug_name"
                      :subtitle="item.raw.brand"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </td>
              <td>
                <v-text-field
                  v-model="item.expiry_date"
                  :label="$lang.EXPIRY_DATE"
                  variant="outlined"
                  single-line
                  hide-details
                  class="mt-1"
                  type="date"
                  shaped
                  :rules="[$rules.REQUIRED_FIELD($lang.EXPIRY_DATE)]"
                  density="compact"
                >
                </v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="item.qty"
                  :placeholder="$lang.QTY"
                  variant="outlined"
                  single-line
                  class="mt-1"
                  shaped
                  :rules="[$rules.REQUIRED_FIELD('')]"
                  density="compact"
                  hide-details
                  maxlength="4"
                  @keydown="restrictChar($event)"
                >
                </v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="item.unit_price"
                  :placeholder="$lang.UNIT_PRICE"
                  variant="outlined"
                  single-line
                  class="mt-1"
                  shaped
                  :rules="[$rules.REQUIRED_FIELD('')]"
                  density="compact"
                  hide-details
                  maxlength="5"
                  @keydown="restrictChar($event)"
                >
                </v-text-field>
              </td>
              <td class="text-right">
                <span v-if="item.qty && item.unit_price">
                  {{ formateAmount(item.qty * item.unit_price) }}
                </span>
              </td>
              <td class="text-center">
                <v-icon
                  v-if="order_item_list.length > 1"
                  @click="removeRow(i)"
                  class="text-red"
                >
                  mdi-close
                </v-icon>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" rowspan="4"></td>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Total
              </td>
              <td class="text-right font-weight-bold py-2">
                {{ getOrderTotal() }}
              </td>
            </tr>
            <!-- discount row -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Dicsount
              </td>
              <td class="text-right font-weight-bold py-2">(-)</td>
            </tr>
            <!-- Raounf off -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Round off
              </td>
              <td class="text-right font-weight-bold py-2">(-)</td>
            </tr>
            <!-- agrand total -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Invoice Amount
              </td>
              <td class="text-right font-weight-bold py-2"></td>
            </tr>
            <!-- end calc -->
          </tfoot>
        </table>
        <!--  -->
        <div class="text-right pt-3">
          <v-btn
            class="text-capitalize ml-3"
            variant="outlined"
            color="primary"
            @click="appendNewEmptyRow"
          >
            Add More
          </v-btn>
        </div>
      </div>
      <!-- order item end -->

      <!--  Action Btn  -->
      <v-row no-gutters class="mt-5">
        <v-col cols="12" md="12" class="text-center">
          <v-btn
            :loading="btn_loading"
            class="register-action-btn mx-2"
            color="primary"
            height="50px"
            width="300px"
            @click="createPurchaseOrder()"
            :class="$vuetify.display.mobile ? 'mb-3' : ''"
          >
            <span class="btn_text">{{ $lang.SAVE }}</span>
          </v-btn>
          <v-btn
            :loading="btn_loading"
            class="register-action-btn mx-2"
            color="primary"
            height="50px"
            width="300px"
            variant="outlined"
            @click="$router.go(-1)"
          >
            <span class="btn_text">{{ $lang.CANCEL }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<style lang="scss">
.custom-combobox input {
  width: 100%;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
table {
  width: 100%;
  border-radius: 5px;
  padding: 20px 0px;
  border-collapse: collapse;
  overflow-x: scroll;
  thead tr td {
    padding: 10px 5px 5px;
    font-weight: 500;
  }
  tbody tr {
    border: solid lightgray 1px;
    td {
      border-left: solid transparent 1px;
      border-right: solid transparent 1px;
      padding: 10px 2px;
      min-width: max-content;
    }
  }
}
</style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddDrugView",
  components: {},
  data: () => ({
    valid: false, // form validation
    btn_loading: false,
    patient_list: [],
    vendor: "",
    vendor_search_query: "",
    vendor_list: [],
    drug_list: [],
    order_item_list: [
      {
        drug_search_query: "",
        loading: false,
        drug: null,
        expiry_date: "",
        unit_price: "",
        qty: "",
      },
    ],
    order_total: 0,
  }),
  mounted() {
    if (this.$route.params.id) this.patient_table_id = this.$route.params.id;
    else this.getVendorList();
  },
  methods: {
    getDrugList() {
      var params = {
        search_query: this.drug_search_query,
        page_number: this.page_number,
      };
      const successHandler = (response) => {
        this.drug_list = response.data.drug_list;
      };
      this.request_GET(
        this,
        this.$urls.DRUGS_LIST,
        params,
        successHandler,
        null,
        null
      );
    },
    getVendorList() {
      var params = {
        search_query: this.vendor_search_query,
        page_number: this.page_number,
      };
      const successHandler = (response) => {
        this.vendor_list = response.data.vendor_list;
      };
      this.request_GET(
        this,
        this.$urls.VENDOR_LIST,
        params,
        successHandler,
        null,
        null
      );
    },
    appendNewEmptyRow() {
      this.order_item_list.push({
        drug_search_query: "",
        loading: false,
        drug: null,
        dose: null,
        frequency: null,
        instruction: null,
        qty: null,
      });
    },
    removeRow(index) {
      console.log("index=", index);
      if (this.order_item_list.length > 1)
        this.order_item_list.splice(index, 1);
    },
    async createPurchaseOrder() {
      await this.$refs.purchase_order_form.validate();
      console.log("this.$refs.prescription_form.validate()==", this.valid);
      if (!this.valid) return false;
      this.btn_loading = true;

      console.log(this.patient);
      var form = new URLSearchParams();
      form.append("vendor_table_id", this.vendor);
      form.append("transaction_type", "Purchase Order");
      form.append("order_item_list", JSON.stringify(this.order_item_list));

      // dummy data
      form.append("patient_table_id", 1);
      form.append("discount_value", 10);
      form.append("patient_table_id", 1);

      const successHandler = (response) => {
        this.showSnakeBar(
          "success",
          this.purchase_order_table_id
            ? "Purchase Order Created"
            : "Purchase Order Updated"
        );
        this.$router.push({ name: "purchase_order" });
        this.$refs.prescription_form.reset();
      };
      const finallyHandler = () => {
        this.btn_loading = false;
      };
      this.request_POST(
        this,
        this.$urls.CREATE_PURCHASE_ORDER,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    // restrict the char inputs
    restrictChar(event) {
      let digitPeriodRegExp = new RegExp("\\d|\\.");
      if (
        event.ctrlKey || // (A)
        event.altKey || // (A)
        typeof event.key !== "string" || // (B)
        event.key.length !== 1
      ) {
        // (C)
        return;
      }
      if (!digitPeriodRegExp.test(event.key)) {
        event.preventDefault();
      }
    },
    getOrderTotal() {
      let total_amount = 0;
      this.order_item_list.forEach((obj) => {
        if (obj.qty && obj.unit_price) {
          total_amount += obj.qty * obj.unit_price;
        }
      });
      return this.formateAmount(total_amount);
    },
  },
});
</script>
