<template>
  <div style="padding: 30px" class="prescription-pdf-temp">
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
      <!--      <b>Patient ID: </b> {{ patient_id }},-->
      <span class="label">Name: </span> {{ patient_name }},
      <span class="label">Age: </span>{{ patient_age }}Y,
      <span class="label">Sex: </span>{{ patient_gender }},
      <div>
        <span class="label">Contact number: </span>{{ patient_contact }},
        <span class="label">Occupation: </span>{{ patient_occupation }},
        <span class="label">Address: </span>{{ patient_address }},
      </div>
    </div>
    <hr>
    <div>
      <div>
        <span class="label">Pulse: </span>{{ pulse }}/min |
        <span class="label">BP: </span>{{ blood_pressure }} mmHg |
        <span class="label">Temp: </span>{{ temperature }}
        <v-icon size="14" class="mt-n1" color="#575656">mdi-temperature-fahrenheit</v-icon>
        |
        <span class="label">Sugar: </span>{{ blood_sugar }} mg/dl |
        <span class="label">Weight: </span>{{ weight }}kg
      </div>
      <div>
        <p><span class="label">Chief Complaints: </span> {{ chief_complaint }}</p>
        <p><span class="label">Medical history: </span>{{ history_of_chief_complaint }}</p>
        <p><span class="label">Systemic Examination: </span>{{ oe }}</p>
        <p><span class="label" v-if="required_test">Required Test: </span>{{ required_test }}</p>
        <p><span class="label" v-if="diet_exercise">Diet / Exercise: </span>{{ required_test }}</p>
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
          <th style="width: 30%">Qty</th>
        </tr>
        <tr v-for="(item,i) in prescription_list" :key="i">
          <td>{{ item.drug_name }}</td>
          <td>{{ item.dose }}</td>
          <td>{{ item.frequency }}</td>
          <td>{{ item.instruction }}</td>
          <td>{{ item.qty }}</td>
        </tr>
      </table>
    </div>
    <hr>
    <div>
      <p><span class="label">Diet/Exercise/Yoga: </span>{{ advise }}</p>
    </div>

  </div>
</template>
<style>
.prescription-pdf-temp {
  font-weight: normal;
  font-size: 13px;
}

hr {
  border: 0.5px solid lightgrey;
  margin: 10px 0px;
}

.label {
  font-weight: normal;
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
export default {
  data: () => ({
    org_name: "ओम आयुर्वेद एर्वं योग केन्द्र",
    address: "pool road Shivrinarayan",
    date: new Date(),

    doctor_name: "Om vijay Sahu",
    degree: "BAMS",

    //
    patient_id: "12333",
    patient_mobile: "900000000",
    patient_name: "Amit kumar Sahu",
    patient_age: "23",
    patient_gender: "Male",
    patient_address: "Bada ashok nagar Gudhiyari Raipur",
    patient_city: "Bada ashok nagar Gudhiyari Raipur",
    patient_occupation: "Student",
    patient_contact: "8305050674",

    pulse: "123",
    temperature: "90",
    blood_sugar: "123",
    weight: "312",
    chief_complaint: "312",
    history_of_chief_complaint: "312",
    advise: "drink boiled Water",
    prescription_list: [],
    required_test: "",
    diet_exercise: "",
  }),
  created() {
    if (this.$route.params.id)
      this.getTreatmentDetails(this.$route.params.id)
  },
  methods: {
    getTreatmentDetails(id) {
      var params = {
        "treatment_table_id": id,
      }
      const successHandler = (response) => {
        this.doctor_name = response.data.doctor_name;
        this.date = response.data.treatment_date
        //
        this.patient_name = response.data.patient_name;
        this.patient_mobile = response.data.patient_mobile;
        this.patient_email = response.data.patient_email;
        this.patient_gender = response.data.gender;
        this.patient_age = response.data.age;
        this.patient_occupation = response.data.occupation;
        this.patient_address = response.data.address;
        this.patient_city = response.data.city;
        //
        this.blood_pressure = response.data.blood_pressure;
        this.blood_sugar = response.data.blood_sugar;
        this.plus_rate = response.data.plus_rate;
        this.temperature = response.data.temperature;
        this.spo2 = response.data.spo2;
        this.weight = response.data.weight;
        this.diet_exercise = response.data.diet_exercise;
        //
        this.chief_complaint = response.data.chief_complaint;

        this.history_of_chief_complaint = response.data.history_of_chief_complaint;
        this.advise = response.data.advise;
        this.oe = response.data.oe;
        this.required_test = response.data.required_test;
        `//`
        this.prescription_list = response.data.prescription_list
      };
      const finallyHandler = () => {
        this.btn_loading = false
      };
      this.request_GET(this, this.$urls.GET_TREATMENT_DETAILS, params, successHandler, null, null, finallyHandler)
    }
  }
}
</script>