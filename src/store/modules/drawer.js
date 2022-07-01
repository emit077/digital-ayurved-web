export const namespaced = true
// import keys from "@/helper/keys"

export const state = {
  drawer: false,
  primary_drawer: true,
  items: [
    {
      title: "Overview",
      url: {name: 'overview'},
      // src_active: require('@/assets/images/customer-active.svg'),
      is_active_tab: false,
      // access_by: [keys.ACCOUNT_ADMIN, keys.ACCOUNT_SUPER_ADMIN],
    },
    {
      title: "Profile",
      url: {name: 'student_profile'},
      // src_active: require('@/assets/images/customer-active.svg'),
      is_active_tab: false,
      // access_by: [keys.ACCOUNT_STUDENT],
    },
  ],
}

export const mutations = {
  SET_ACTIVE_TAB(state, index) {
    localStorage.setItem("active-tab", index);

    for (let i = 0; i < state.items.length; i++) {
      state.items[i].is_active_tab = false;
    }
  },
  SET_PRIMARY_DRAWER(state, value) {
    state.primary_drawer = value;
  },

}

export const actions = {
  setActiveTab({commit}, index) {
    commit('SET_ACTIVE_TAB', index)
  },
  setPrimaryDrawer({commit}, value) {
    commit('SET_PRIMARY_DRAWER', value)
  },
}
export const getters = {
  getDrawerItems: state => {
    return state.items;
  },
  getManageTab: state => {
    return state.items[9];
  },
}