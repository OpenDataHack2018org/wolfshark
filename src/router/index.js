import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomeRoute',
            beforeEnter (to, from, next) {
                if (store.getters.name) {
                    next('/overview');
                }
                else {
                    next('/config');
                }
            },
        },
        {
            path: '/config',
            name: 'UserConfig',
            component: () => import('@/components/UserConfig'),
        },
        {
            path: '/overview',
            name: 'JobOverview',
            component: () => import('@/components/JobOverview'),
            beforeEnter (to, from, next) {
                if (store.getters.name) {
                    next();
                }
                else {
                    next('/config');
                }
            },
        },
    ],
});
