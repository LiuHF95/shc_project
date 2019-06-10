import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let shcPost = window.sessionStorage.getItem('domain')
const store = new Vuex.Store({
    state: {
        shcPost: shcPost,
        terminalid:""
    },
})
Vue.use(store)
export default store
