<template>
  <div>
    <v-row no-gutters class="mb-4">
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.PATIENT }}:</label>
        <p class="text-subtitle-1" v-if="invoice_data.patient_table_id">
          <navigator-text
            :text="invoice_data.patient_name"
            :router_name="'patient_profile'"
            :router_params="{ id: invoice_data.patient_table_id }"
          >
          </navigator-text>
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <label class="text-medium-emphasis">{{ $lang.INVOICE_DATE }}:</label>
        <p class="text-subtitle-1">
          {{ invoice_data.invoice_date }}
        </p>
      </v-col>
    </v-row>
    <!-- order items -->
    <div>
      <table>
        <thead>
          <tr>
            <td >{{ $lang.DRUG }}</td>
            <td class="text-right" >{{ $lang.QTY }}</td>
            <td class="text-right" style="min-width: 15%" >{{ $lang.MRP }}</td>
            <td class="text-right" style="min-width: 20%">
              {{ $lang.TOTAL }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in invoice_items" :key="i">
            <td>{{ item.drug_name }}</td>
            <td class="text-right">{{ item.quantity }}</td>
            <td class="text-right">{{ item.mrp }}</td>
            <td class="text-right">{{ formateAmount(item.subtotal) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" rowspan="4"></td>
            <td colspan="1" class="text-right font-weight-bold py-2 pr-3">
              Grand Total
            </td>
            <td class="text-right font-weight-bold py-2">
              {{ invoice_data.item_total }}
            </td>
          </tr>
          <!-- discount row -->
          <tr>
            <td colspan="1" class="text-right font-weight-bold py-2 pr-3">
              Dicsount ({{ parseInt(invoice_data.discount_value) }}%)
            </td>
            <td class="text-right font-weight-bold py-2">
              -{{ invoice_data.discount_amount }}
            </td>
          </tr>
          <!-- Raounf off -->
          <tr>
            <td colspan="1" class="text-right font-weight-bold py-2 pr-3">
              Round off
            </td>
            <td class="text-right font-weight-bold py-2">
              {{ invoice_data.round_off }}
            </td>
          </tr>
          <!-- agrand total -->
          <tr>
            <td colspan="1" class="text-right font-weight-bold py-2 pr-3">
              Invoice Total
            </td>
            <td class="text-right font-weight-bold py-2">
              {{ invoice_data.invoice_total }}
            </td>
          </tr>
          <!-- end calc -->
        </tfoot>
      </table>
      <!--  -->
    </div>
    <!-- order item end -->
  </div>
</template>
<style lang="scss">
.custom-combobox input {
  width: 100%;
}
tfoot tr:nth-child(even),
tbody tr:nth-child(even) {
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
    background-color: #f2f2f2;
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

  tfoot tr {
    border: solid lightgray 1px;
    td {
      border-left: solid transparent 1px;
      border-right: solid transparent 1px;
    }
  }
  tfoot tr:last-child {
    border-bottom: solid transparent 1px;
  }
}
</style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InvoiceDetails",
  components: {},
  data: () => ({
    invoice_table_id: "",
    invoice_data: {},
    invoice_items: [],
  }),
  mounted() {
    if (this.$route.params.id) {
      this.invoice_table_id = this.$route.params.id;
      this.getInvoiceDetails();
    }
  },
  methods: {
    getInvoiceDetails() {
      var params = {
        invoice_table_id: this.invoice_table_id,
      };
      const successHandler = (response) => {
        this.invoice_data = response.data.invoice_data;
        this.invoice_items = response.data.invoice_items;
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
  },
});
</script>
