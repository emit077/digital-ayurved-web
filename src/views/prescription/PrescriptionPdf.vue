<template>
  <div style="padding: 20px">
    <v-btn @click="printPage">Print</v-btn>
    <table style="width:100%">
      <tr>
        <td class="text-center" colspan="2">
          <h1>{{ org_name }}</h1>
          <p>{{ address }}</p>
        </td>
      </tr>
      <!-- doctor -->
      <tr>
        <td>
          <p>Name:</p>
          <p>{{ degree }}</p>
        </td>
        <td>
          <p>{{ contact_number }}</p>
        </td>
      </tr>
      <!-- patient -->
    </table>
    <table style="width:100%">
      <tr>
        <td>
          <p>Name</p>
          <p>{{ patient_name }}</p>
        </td>
        <td>
          <p>Age</p>
          <p>{{ patient_age }}</p>
        </td>
        <td>
          <p>Sex</p>
          <p>{{ patient_gender }}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>Contact number</p>
          <p>{{ patient_contact }}</p>
        </td>
        <td>
          <p>Occupation</p>
          <p>{{ patient_occupation }}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>Address</p>
          <p>{{ patient_address }}</p>
        </td>
      </tr>
    </table>
    <hr>
    <div>
      <div style="display: inline-block; width: 25%;padding-right: 15px;">
        <table style="width:100%; vertical-align: top">
          <tr>
            <td>BP:</td>
            <td>-</td>
            <td>{{ bp }}</td>
          </tr>
          <tr>
            <td>Pulse</td>
            <td>-</td>
            <td> {{ pulse }}</td>
          </tr>
          <tr>
            <td>Temp</td>
            <td>-</td>
            <td>{{ temperature }}</td>
          </tr>
          <tr>
            <td>B Sugar</td>
            <td>-</td>
            <td>{{ blood_sugar }}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>-</td>
            <td>{{ weight }}</td>
          </tr>
          <tr>
            <td>Advise:</td>
          </tr>
          <tr>
            <td>{{ advise }}</td>
          </tr>
        </table>

      </div>
      <div
          style="display: inline-block; width: 74%; vertical-align: top; padding-left: 15px; border-left: solid 1px lightgrey; height: 100%">
        <table style="width:100%">
          <tr>
            <td>
              <p>Main Complain</p>
              <p>{{ main_complain }}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>History of Complain</p>
              <p>{{ history_of_complain }}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
    org_name: "ओम आयुर्वेद एर्वं योग केन्द्र",
    address: "pool road Shivrinarayan",
    doctor_name: "Om vijay Sahu",
    degree: "BAMS",
    contact_number: "900000000",

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
    advise: "drink boiled water",
  }),
  methods: {
    printPage() {
      print();
      // newWin.close();
    }
  }
}
</script>