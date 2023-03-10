import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import user from './modules/user';

const store=new Vuex.Store({
    state:{
        footerMapShow: false,
        theme: '004', //主题样式
		servertoken: '',
    },
    getters: {
        templates(state) {
            return state.theme;
        },
		servertoken: state => state.servertoken,
    },
    mutations: {
        templatesMu(state, val) {
            try{
                if (val) {
                    state.theme = val;
                }
            }catch(e){

            }
        },
		servertoken (state, val) {
			state.servertoken = val
		},
    },
    modules: {
        user
    }
})

export default store; 