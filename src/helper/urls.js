export default {
  BASE_URL: "http://localhost:8000/api",


  LOGIN: "/users/login/",
  FORGOT_PASSWORD: "/users/forget-password/",
  RESEND_OTP: "/users/resend-otp/",
  VERIFY_OTP: "/users/verify-otp/",
  RESET_PASSWORD: "/users/reset-password/",
  TOGGLE_ACCOUNT_STATUS: "/users/toggle-account-status/",

  //doctor api
  DOCTOR_LIST: "/doctor/list/",
  DOCTOR_ADD: "/doctor/add/",
  DOCTOR_DETAILS: "/doctor/details/",

  //drugs api
  DRUGS_LIST: "/drugs/list/",
  DRUGS_ADD: "/drugs/add/",
  DRUGS_DETAILS: "/drugs/details/",

  //patients api
  PATIENT_LIST: "/patient/list/",
  PATIENT_DETAILS: "/patient/details/",
  ADD_PRESCRIPTION: "/patient/add/prescription/",
  GET_TREATMENT_DETAILS: "/patient/get/treatment-details/",
  GET_PRESCRIPTION_SUPPORTING_DATA: "/patient/get/prescription-supporting-data/",

}

