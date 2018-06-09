import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: '',
        apiKey: '',
        jobs: [],
    },
    getters: {
        name (state) {
            return state.name;
        },
        apiKey (state) {
            return state.apiKey;
        },
        jobs (state) {
            return state.jobs;
        },
    },
    mutations: {
        name (state, payload) {
            state.name = payload.name;
        },
        apiKey (state, payload) {
            state.apiKey = payload.apiKey;
        },
        jobs (state, payload) {
            state.jobs = payload.jobs;
        },
    },
    actions: {
        getJobs ({ commit }) {
            commit('jobs', {
                jobs: [
                    {
                        job_id: 3,
                        title: 'Test job 2',
                        user: 'Toby',
                        status: 'queued',
                        _showDetails: false,
                    },
                    {
                        job_id: 2,
                        title: 'Test job 2',
                        user: 'roger',
                        status: 'processing',
                        _showDetails: false,
                    },
                    {
                        job_id: 1,
                        title: 'Test job 2',
                        user: 'Awen',
                        status: 'error',
                        _showDetails: false,
                    },
                    {
                        job_id: 0,
                        title: 'Test job 1',
                        user: 'milana',
                        status: 'done',
                        _showDetails: false,
                    },
                ],
            });
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
