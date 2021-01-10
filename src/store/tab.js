import { ADD_TAB, DELETE_TAB, SET_INDEX, CLEAR_TAB } from './mutations-type'
export default {
  nameSpace: true,
  state: {
    tabOptions: [{ route: '/', name: '首页' }],
    currentIndex: '/',
    breadcrumbList: []
  },
  mutations: {
    [ADD_TAB] (state, data) {
      state.tabOptions.push(data)
    },
    [DELETE_TAB] (state, route) {
      const index = state.tabOptions.findIndex(op => op.route === route)
      state.tabOptions.splice(index, 1)
    },
    [SET_INDEX] (state, index) {
      state.currentIndex = index
    },
    [CLEAR_TAB] (state) {
      state.tabOptions = []
    }
  },
  actions: {}
}
