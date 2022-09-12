<template>
  <v-btn @click="generateReport">Print</v-btn>

  <!--  <vue3-html2pdf-->
  <!--      :show-layout="false"-->
  <!--      :float-layout="true"-->
  <!--      :enable-download="true"-->
  <!--      :preview-modal="true"-->
  <!--      :paginate-elements-by-height="1400"-->
  <!--      filename="hee hee"-->
  <!--      :pdf-quality="2"-->
  <!--      :manual-pagination="false"-->
  <!--      pdf-format="a4"-->
  <!--      pdf-orientation="portrait"-->

  <!--      @progress="onProgress($event)"-->
  <!--      @hasStartedGeneration="hasStartedGeneration()"-->
  <!--      @hasGenerated="hasGenerated($event)"-->
  <!--      ref="html2Pdf"-->
  <!--  >-->
  <!--   <template  v-slot:pdf-content>-->
  <div style="padding: 30px">
    <div class="text-center mb-3">
      <h1>{{ org_name }}</h1>
      <p>{{ address }}</p>
    </div>
    <!--    <hr>-->
    <!-- doctor -->
    <div class="text-right label">
      <span class="float-left">{{ date }}</span>
      Dr. {{ doctor_name }} ({{ degree }})
    </div>
    <!-- patient -->
    <hr>
    <div>
      <b>Patient Details</b>: <br>
      <!--      <b>Patient ID: </b> {{ patient_id }},-->
      <span class="label">Name: </span> {{ patient_name }},
      <span class="label">Age: </span>{{ patient_age }}Y,
      <span class="label">Sex: </span>{{ patient_gender }},
      <span class="label">Contact number: </span>{{ patient_contact }},
      <span class="label">Address: </span>{{ patient_address }},
    </div>
    <hr>
    <div>
      <div>
        <span class="label">Pulse: </span>{{ pulse }} |
        <span class="label">BP: </span>{{ bp }} |
        <span class="label">Temp: </span>{{ temperature }} |
        <span class="label">Sugar: </span>{{ blood_sugar }} |
        <span class="label">Weight: </span>{{ weight }}
      </div>
      <div>
        <p><span class="label">Main Complain: </span> {{ main_complain }}</p>
        <p><span class="label">History of Complain: </span>{{ history_of_complain }}</p>
        <p><span class="label">Advise: </span>{{ advise }}</p>
      </div>
    </div>
    <hr>
    <div>
      <h2>Rx:</h2>
      <table class="prescription-table" style="width: 100%; text-align: left">
        <tr>
          <th style="width: 35%">Name</th>
          <th style="width: 15%">Dose</th>
          <th style="width: 20%">Frequency</th>
          <th style="width: 30%">Instruction</th>
        </tr>
        <tr>
          <td>Ahajshas</td>
          <td> 1 goli</td>
          <td> shubeh sham</td>
          <td> pata ni</td>
        </tr>
        <tr>
          <td>Ahajshas</td>
          <td> 1 goli</td>
          <td> shubeh sham</td>
          <td> pata ni</td>
        </tr>
      </table>
    </div>
  </div>
  <!--    </template>-->
  <!--  </vue3-html2pdf>-->
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
// import Vue3Html2pdf from 'vue3-html2pdf'

export default {
  components: {
    // Vue3Html2pdf
  },
  data: () => ({
    org_name: "ओम आयुर्वेद एर्वं योग केन्द्र",
    address: "pool road Shivrinarayan",
    date: new Date(),
    doctor_name: "Om vijay Sahu",
    degree: "BAMS",
    contact_number: "900000000",

    patient_id: "12333",
    patient_name: "Amit kumar Sahu",
    patient_age: "23",
    patient_gender: "Male",
    patient_address: "Bada ashok nagar Gudhiyari Raipur",
    patient_occupation: "Student",
    patient_contact: "8305050674",

    bp: "12",
    pulse: "123",
    temperature: "90",
    blood_sugar: "123",
    weight: "312",
    main_complain: "312",
    history_of_complain: "312",
    advise: "drink boiled Water",
  }),
  methods: {
    printPage() {
      print();
      // newWin.close();
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>