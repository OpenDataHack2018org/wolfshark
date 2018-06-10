import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: '',
    },
    getters: {
        name (state) {
            return state.name;
        },
    },
    mutations: {
        name (state, payload) {
            state.name = payload.name;
        },
    },
    plugins: [
        createPersistedState({
            key: 'wolfshark',
            reducer: state => ({
                name: state.name,
            }),
        }),
    ],
});
