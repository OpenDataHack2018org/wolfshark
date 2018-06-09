<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

export default {
    name: 'App',
};
</script>

<style>
body {
    background-color: #7addd4;
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
    background-color: #fff;
    color: #000;
}

.b-table {
    background-color: #fff;
}
</style>
