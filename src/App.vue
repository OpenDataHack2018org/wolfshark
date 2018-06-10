<template>
    <div id="app">
        <NotificationAlert/>
        <router-view/>
    </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import NotificationAlert from '@/components/NotificationAlert';
import LogoHeader from '@/components/LogoHeader';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.component('LogoHeader', LogoHeader);

export default {
    name: 'App',

    components: {
        NotificationAlert,
    },
};
</script>

<style>
body {
    background-color: #7addd4 !important;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    margin-top: 60px;
}

a,
a:hover {
    color: #dc3545;
}

.alert a,
.alert a:hover {
    color: #000;
}

.alert-info {
    background-color: #fff !important;
    color: #000 !important;
}

.b-table {
    background-color: #fff !important;
}

.form-text.text-muted {
    color: #000 !important;
}
</style>
