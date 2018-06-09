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
    background-color: #42b983;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    margin-top: 60px;
}

a,
a:hover {
    color: #fff;
}

.alert a,
.alert a:hover {
    color: #000;
}

.alert-info {
    background-color: #fff;
    color: #000;
}
</style>
