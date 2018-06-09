import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: '',
        apiKey: '',
    },
    getters: {
        name (state) {
            return state.name;
        },
        apiKey (state) {
            return state.apiKey;
        },
    },
    mutations: {
        name (state, payload) {
            state.name = payload.name;
        },
        apiKey (state, payload) {
            state.apiKey = payload.apiKey;
        },
    },
    plugins: [
        createPersistedState({
            key: 'wolfshark',
            reducer: state => ({
                name: state.name,
                apiKey: state.apiKey,
            }),
        }),
    ],
});
