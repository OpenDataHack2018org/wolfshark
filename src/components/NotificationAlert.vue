<template>
    <b-container>
        <b-alert
            v-for="alert in alerts"
            v-bind:key="alert.id"
            v-bind:variant="alert.variant"
            class="mt-3"
            dismissible
            fade
            v-bind:show="dismissCountDown"
            v-on:dismissed="dismissCountDown=0"
            v-on:dismiss-count-down="countDownChanged">
            <h4
                v-if="alert.heading"
                class="alert-heading">
                {{ alert.heading }}
            </h4>
            {{ alert.text }}
            <b-progress
                v-bind:variant="alert.variant"
                v-bind:max="dismissSecs"
                v-bind:value="dismissCountDown"
                class="mt-3"
                height="4px" />
        </b-alert>
    </b-container>
</template>

<script>
export default {
    name: 'NotificationAlert',

    data () {
        return {
            alertCount: 0,
            alerts: {},
            dismissSecs: 6,
            dismissCountDown: 0,
        };
    },

    created () {
        this.$bus.$on('showAlert', this.showAlert);

        // Clear all notifications after route update.
        this.$router.afterEach(this.clearAlerts);
    },

    beforeDestroy () {
        // Explicitly release event listener in component destructor. Because the
        //   events are bound to a separate Vue instance they don't get released
        //   automatically.
        this.$bus.$off('showAlert', this.showAlert);
    },

    methods: {
        countDownChanged (dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },

        showAlert (alertSchema) {
            const alert = alertSchema;

            // Create auto-generated ID for the alert if not supplied.
            alert.id = alert.id || `aid_${this.alertCount++}`;

            // Use instance method to delete existing alert from the local property,
            //   since Vue cannot detect property removal directly.
            this.$delete(this.alerts, alert.id);

            // After DOM has been updated, display the alert.
            this.$nextTick(() => {
                this.$set(this.alerts, alert.id, alert);
                this.dismissCountDown = this.dismissSecs;
            });
        },

        clearAlerts () {
            this.alerts = {};
        },
    },
};
</script>

<style>

</style>
