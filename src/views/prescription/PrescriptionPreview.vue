<template>
  <div class="text-right mb-n10">
    <v-btn color="primary" width="120" class=" mt-3 mr-3" @click="generateReport">Print</v-btn>
  </div>

  <PrescriptionPdf/>
  <vue3-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
  >
    <template v-slot:pdf-content>
      <PrescriptionPdf/>
    </template>
  </vue3-html2pdf>
</template>
<style>
hr {
  border: 0.5px solid lightgrey;
  margin: 10px 0px;
}

.label {
  font-weight: bold;
  color: #575656;
}

table,
table tr,
table th,
table td {
  border-collapse: collapse;
  padding: 8px;
  font-size: 13px;
}

.prescription-table th {
  background-color: #eee;
  color: #575656;
}

.prescription-table tr:nth-child(odd) {
  background-color: #eeeeee80;
}
</style>

<script>
import Vue3Html2pdf from 'vue3-html2pdf'
import PrescriptionPdf from "@/components/pdf-templates/PrescriptionPdf";

export default {
  components: {
    Vue3Html2pdf,
    PrescriptionPdf
  },
  data: () => ({}),
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>