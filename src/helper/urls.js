export default {
  BASE_URL: "http://localhost:8888/api",
  // BASE_URL: "https://api.digitalayurved.in/api",

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
  DRUGS_DELETE: "/drugs/delete/",

  // inventory
  CREATE_PURCHASE_ORDER: "/inventory/create-purchase-order/",
  LIST_PURCHASE_ORDER: "/inventory/list-purchase-order/",
  LIST_SALES_DRUGS: "/inventory/list-sales-drugs/",

  LIST_INVOICE: "/inventory/list-invoice/",
  CREATE_INVOICE: "/inventory/create-invoice/",
  GET_INVOICE_DETAILS: "/inventory/get-invoice-details/",

  //patients api
  PATIENT_LIST: "/patient/list/",
  PATIENT_DETAILS: "/patient/details/",
  PATIENT_ADD: "/patient/add/",
  ADD_PRESCRIPTION: "/patient/add/prescription/",
  TREATMENT_HISTORY: "/patient/treatment-history/",
  GET_TREATMENT_DETAILS: "/patient/get/treatment-details/",
  DELETE_TREATMENT_RECORD: "/patient/delete/treatment-record/",
  GET_PRESCRIPTION_SUPPORTING_DATA:
    "/patient/get/prescription-supporting-data/",

  // MASTER api
  VENDOR_LIST: "/master/vendor-list/",
};
