import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {requiresAuth: false, title: "Login", show_back_btn: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/prescription_preview/:id',
    name: 'prescription_preview',
    meta: {requiresAuth: true, title: "Prescription Preview", show_back_btn: false},
    component: () => import(/* webpackChunkName: "prescription-pdf" */ '../views/prescription/PrescriptionPreview')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/DashboardLayout'),
    redirect: '/overview',
    children: [

      {
        path: '/overview',
        name: 'overview',
        meta: {requiresAuth: true, title: "Overview", show_back_btn: false},
        component: () => import(/* webpackChunkName: "overview" */ '../views/overview/Overview.vue'),

      },
      // prescription
      {
        path: '/prescription',
        name: 'prescription',
        meta: {requiresAuth: true, title: "Prescription", show_back_btn: true},
        component: () => import(/* webpackChunkName: "prescription" */ '../views/prescription/Prescription.vue'),
      },
      {
        path: '/prescription/:id',
        name: 'patient_prescription',
        meta: {requiresAuth: true, title: "Prescription", show_back_btn: true},
        component: () => import(/* webpackChunkName: "prescription" */ '../views/prescription/Prescription.vue'),
      },
      {
        path: '/treatment-history/',
        name: 'treatment_history',
        meta: {requiresAuth: true, title: "Treatment history", show_back_btn: true},
        component: () => import(/* webpackChunkName: "prescription" */ '../views/prescription/TreatmentHistory.vue'),
      },
      //doctor
      {
        path: '/doctor',
        name: 'doctor_list',
        meta: {requiresAuth: true, title: "Doctors", show_back_btn: false},
        component: () => import(/* webpackChunkName: "login" */ '../views/doctor/DoctorList.vue'),

      },
      {
        path: '/doctor/profile/:id',
        name: 'doctor_profile',
        meta: {requiresAuth: true, title: "Doctor Profile", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/doctor/DoctorProfile.vue')
      },
      {
        path: '/doctor/add/',
        name: 'add_doctor',
        meta: {requiresAuth: true, title: "Add Doctor", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/doctor/AddDoctor.vue')
      },
      {
        path: '/doctor/edit/:id',
        name: 'edit_doctor',
        meta: {requiresAuth: true, title: "Edit Doctor profile", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/doctor/AddDoctor.vue')
      },

      // Patients
      {
        path: '/patients',
        name: 'patients_list',
        meta: {requiresAuth: true, title: "Patients", show_back_btn: false},
        component: () => import(/* webpackChunkName: "login" */ '../views/patients/PatientsList.vue')
      }, {
        path: '/patients/add/',
        name: 'add_patient',
        meta: {requiresAuth: true, title: "Add Patient", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/patients/AddPatient.vue')
      },
      {
        path: '/patient/edit/:id',
        name: 'patient_edit',
        meta: {requiresAuth: true, title: "Edit Patient Profile", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/patients/AddPatient')
      },
      {
        path: '/patient/profile/:id',
        name: 'patient_profile',
        meta: {requiresAuth: true, title: "Patients Profile", show_back_btn: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/patients/PatientProfile.vue')
      },
      // drugs
      {
        path: '/drugs',
        name: 'drug_list',
        meta: {requiresAuth: true, title: "Drugs", show_back_btn: false},
        component: () => import(/* webpackChunkName: "drug" */ '../views/drugs/DrugList.vue')
      },
      {
        path: '/drugs/add/',
        name: 'add_drug',
        meta: {requiresAuth: true, title: " Add Drugs", show_back_btn: true},
        component: () => import(/* webpackChunkName: "drug" */ '../views/drugs/AddDrug.vue')
      },
      {
        path: '/drugs/edit/:id',
        name: 'edit_drug',
        meta: {requiresAuth: true, title: " Add Drugs", show_back_btn: true},
        component: () => import(/* webpackChunkName: "drug" */ '../views/drugs/AddDrug.vue')
      },
      // purchase order
      {
        path: '/purchase-order/',
        name: 'purchase_order',
        meta: {requiresAuth: true, title: " Add Drugs", show_back_btn: true},
        component: () => import(/* webpackChunkName: "drug" */ '../views/purchase/CreatePurchaseOrder.vue')
      }


    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


/* redirecting to home page if access token is not provided*/
router.beforeEach((to, from, next) => {
  let access_token = localStorage.getItem("token")

  if (to.meta.requiresAuth == true && !access_token) {
    next({name: 'login'})
  } else if (to.meta.requiresAuth == false && access_token) {
    next({name: 'dashboard'})
  } else
    next()

  //setting the title
  if (to && to.meta && to.meta.title)
    window.document.title = "Digital Ayurved | " + to.meta.title;

});


export default router
