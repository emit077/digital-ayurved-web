import {createStore} from 'vuex'


import * as snackbar from './modules/snackbar'
import * as drawer from './modules/drawer'

export default createStore({

  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    drawer,
    snackbar,
  }
})
