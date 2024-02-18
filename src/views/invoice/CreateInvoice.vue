<template>
  <div>
    <v-form ref="purchase_order_form" v-model="valid" lazy-validation>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="5"
          class="py-2"
          :class="!$vuetify.display.mobile ? '' : ''"
        >
          <label class="ml-1">{{ $lang.PATIENT }}</label>
          <v-autocomplete
            v-model="patient"
            v-model:search.sync="patient_search"
            :rules="[$rules.REQUIRED_FIELD('')]"
            :items="patient_list"
            variant="outlined"
            density="compact"
            placeholder="Select Patient"
            class="custom-combobox"
            item-title="patient_name"
            item-value="patient_table_id"
            hide-details
            return-object
            @focus="getPatientList"
            @keyup="getPatientList"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-if="typeof item.raw !== 'object'"
                v-bind="props"
              ></v-list-item>
              <v-list-item
                v-else
                v-bind="props"
                :title="
                  item.raw.patient_name + '(' + item.raw.patient_table_id + ')'
                "
                :subtitle="item.raw.mobile"
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
              <td style="min-width: 10%">{{ $lang.QTY }}</td>
              <td class="text-right" style="min-width: 5%">{{ $lang.MRP }}</td>
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
                  v-model:search.sync="item.drug_search_query"
                  :items="drug_list"
                  :rules="[$rules.REQUIRED_FIELD('')]"
                  item-title="drug_name"
                  item-value="order_items_table_id"
                  placeholder="Drug"
                  variant="outlined"
                  density="compact"
                  class="custom-combobox mt-1"
                  hide-details
                  return-object
                  @focus="getDrugList(item.drug_search_query)"
                  @keyup="getDrugList(item.drug_search_query)"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :title="
                        item.raw.drug_name +
                        '-' +
                        item.raw.brand_name +
                        ' |₹' +
                        item.raw.mrp
                      "
                      :subtitle="
                        item.raw.expiry_date + ' #' + item.raw.available_qty
                      "
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </td>
              <td>
                <v-text-field
                  v-model="item.qty"
                  :placeholder="$lang.QTY"
                  variant="outlined"
                  single-line
                  class="mt-1"
                  shaped
                  :rules="[
                    $rules.REQUIRED_FIELD('', 0, item.drug?.available_qty),
                  ]"
                  density="compact"
                  hide-details
                  maxlength="4"
                  @keydown="restrictChar($event)"
                >
                </v-text-field>
              </td>
              <td class="text-right">
                {{ item.drug?.mrp || 0 }}
              </td>
              <td class="text-right">
                <span>
                  {{ formateAmount(item.qty * item.drug?.mrp || 0) }}
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
              <td colspan="1" rowspan="4"></td>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Total
              </td>
              <td class="text-right font-weight-bold p-2">
                {{ formateAmount(order_total) }}
              </td>
              <td class="text-center">
                <v-btn
                  density="compact"
                  icon="mdi-plus"
                  variant="outlined"
                  color="primary"
                  flat=""
                  @click="appendNewEmptyRow"
                ></v-btn>
              </td>
            </tr>
            <!-- discount row -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Dicsount(
                <div class="discount-block">
                  <v-text-field
                    v-model="discount_value"
                    single-line
                    class="mt-1"
                    density="compact"
                    hide-details
                    maxlength="2"
                    @keydown="restrictChar($event)"
                  >
                  </v-text-field>
                </div>
                %)
              </td>
              <td class="text-right font-weight-bold py-2">
                -{{ formateAmount(discount_amount) }}
              </td>
              <td></td>
            </tr>
            <!-- Raounf off -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Round off
              </td>
              <td class="text-right font-weight-bold py-2">
                {{ formateAmount(roundoff_amount) }}
              </td>
              <td></td>
            </tr>
            <!-- agrand total -->
            <tr>
              <td colspan="2" class="text-right font-weight-bold py-2 pr-3">
                Invoice Total
              </td>
              <td class="text-right font-weight-bold py-2">
                {{ formateAmount(getInvoiceTotal()) }}
              </td>
              <td></td>
            </tr>
            <!-- end calc -->
          </tfoot>
        </table>
        <!--  -->
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
.discount-block {
  display: inline-block;
  width: 40px;
  position: relative;
  bottom: -10px;
}
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
    valid: false,
    invoice_table_id: "", // form validation
    btn_loading: false,
    patient_list: [],
    patient_search: "",
    patient: "",
    vendor: "",
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
    invoice_total: 0,
    roundoff_amount: 0,
    discount_value: 0,
    discount_amount: 0,
  }),
  created() {
    this.getPatientList();
    if (this.$route.params.id) {
      this.invoice_table_id = this.$route.params.id;
      this.getInvoiceDetails();
    }
  },
  methods: {
    getDrugList(drug_search_query = "") {
      var params = {
        search_query: drug_search_query,
        page_number: this.page_number,
      };
      const successHandler = (response) => {
        this.drug_list = response.data.drug_list;
      };
      this.request_GET(
        this,
        this.$urls.LIST_SALES_DRUGS,
        params,
        successHandler,
        null,
        null
      );
    },
    getPatientList() {
      var params = {
        search_query: this.patient_search,
        page_number: this.page_number,
      };
      const successHandler = (response) => {
        this.patient_list = response.data.patient_list;
      };
      const finallyHandler = () => {
        this.btn_loading = false;
      };
      this.request_GET(
        this,
        this.$urls.PATIENT_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    getInvoiceDetails() {
      var params = {
        invoice_table_id: this.invoice_table_id,
      };
      const successHandler = (response) => {
        this.order_item_list = [];
        let invoice_data = response.data.invoice_data;
        this.discount_value = invoice_data.discount_value;
        this.invoice_items = response.data.invoice_items;

        response.data.invoice_items.forEach((item) => {
          this.order_item_list.push({
            drug: {
              drug_name: item.drug_name,
              drug_table_id: item.drug_table_id,
              id: item.id,
              mrp: item.mrp,
              order_items_table_id: item.order_items_table_id,
            },
            expiry_date: item.expiry_date,
            qty: item.quantity,
          });
        });
        this.patient = {
          name: invoice_data.patient_name,
          patient_table_id: invoice_data.patient_table_id,
        };
      };
      this.request_GET(
        this,
        this.$urls.GET_INVOICE_DETAILS,
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
      if (!this.valid) return false;
      this.btn_loading = true;

      var form = new URLSearchParams();
      form.append("order_item_list", JSON.stringify(this.order_item_list));
      form.append(
        "discount_value",
        isNaN(this.discount_value) ? 0 : this.discount_value
      );
      form.append("patient_table_id", parseInt(this.patient.patient_table_id));
      if (this.invoice_table_id)
        form.append("invoice_table_id", parseInt(this.invoice_table_id));

      const successHandler = (response) => {
        this.showSnakeBar(
          "success",
          this.purchase_order_table_id ? "Invoice Created" : "Invoice Updated"
        );
        this.$router.push({ name: "invoice_list" });
        this.$refs.prescription_form.reset();
      };
      const finallyHandler = () => {
        this.btn_loading = false;
      };
      this.request_POST(
        this,
        this.$urls.CREATE_INVOICE,
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
    getInvoiceTotal() {
      let order_total = 0;
      this.order_item_list.forEach((obj) => {
        let mrp = obj.drug?.mrp;
        if (obj.qty && mrp) {
          order_total += obj.qty * mrp;
        }
      });
      this.order_total = order_total;
      //
      this.discount_amount = (order_total * this.discount_value) / 100;
      let subtotal = order_total - this.discount_amount;
      this.roundoff_amount =
        subtotal - parseInt(subtotal) > 0
          ? 1 - (subtotal - parseInt(subtotal))
          : 0;
      this.invoice_total = subtotal + this.roundoff_amount;
      return this.invoice_total;
    },
  },
});
</script>
