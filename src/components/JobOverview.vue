<template>
    <div class="container">
        <h4>Welcome back, {{ name }}!</h4>

        <p>Here is a list of current jobs.</p>

        <b-button
            to="/config"
            variant="secondary">
            Preferences
        </b-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'JobOverview',

    data () {
        return {
        };
    },

    computed: {
        ...mapGetters([
            'name',
        ]),
    },

    methods: {
    },
};
</script>

<style>
</style>
