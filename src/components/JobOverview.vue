<template>
    <b-container>
        <b-row>
            <b-col>
                <h4>Welcome back, {{ name }}!</h4>

                <p>Here is a list of current jobs.</p>

                <b-button
                    to="/config"
                    variant="secondary">
                    <i class="fa fa-cog" />
                    Preferences
                </b-button>
            </b-col>
        </b-row>
    </b-container>
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
