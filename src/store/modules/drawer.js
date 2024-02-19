export const namespaced = true;
// import keys from "@/helper/keys"

export const state = {
  flag: true,
  items: [
    {
      title: "Overview",
      url: { name: "overview" },
      is_active_tab: false,
      icon: "mdi-view-dashboard",
      // access_by: [keys.ACCOUNT_ADMIN, keys.ACCOUNT_SUPER_ADMIN],
    },
    {
      title: "Inventory",
      url: { name: "inventory" },
      is_active_tab: false,
      icon: "mdi-shopping-search",
      // access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Invoice",
      url: { name: "invoice_list" },
      is_active_tab: false,
      icon: "mdi-file-document-outline",
      // access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Treatments",
      url: { name: "treatment_history" },
      is_active_tab: false,
      icon: "mdi-medical-bag",
      // access_by: [keys.ACCOUNT_ADMIN, keys.ACCOUNT_SUPER_ADMIN],
    },
    {
      title: "Doctors",
      url: { name: "doctor_list" },
      is_active_tab: false,
      icon: "mdi-doctor",
      // access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Patients",
      url: { name: "patients_list" },
      is_active_tab: false,
      icon: "mdi-bed",
      // access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Drugs",
      url: { name: "drug_list" },
      is_active_tab: false,
      icon: "mdi-bottle-tonic-plus",
      // access_by: [keys.ACCOUNT_STUDENT],
    },
  ],
};

export const mutations = {
  SET_ACTIVE_TAB(state, index) {
    localStorage.setItem("active-tab", index);
    for (let i = 0; i < state.items.length; i++) {
      state.items[i].is_active_tab = false;
    }
  },
  SET_FLAG(state, value) {
    state.flag = value;
  },
};

export const actions = {
  setActiveTab({ commit }, index) {
    commit("SET_ACTIVE_TAB", index);
  },
  setFlag({ commit }, value) {
    commit("SET_FLAG", value);
  },
};
export const getters = {
  getDrawerItems: (state) => {
    return state.items;
  },
  getFlag: (state) => {
    return state.flag;
  },
};
