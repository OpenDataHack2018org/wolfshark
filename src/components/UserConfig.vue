<template>
    <div class="container">
        <template v-if="!isForgotten">
            <h4>Hello there!</h4>

            <p>Please provide your name and API key below.</p>

            <b-form
                class="user-config"
                v-on:submit.prevent="save">
                <b-form-group>
                    <b-form-input
                        required
                        placeholder="Your name"
                        autocomplete="name"
                        v-model.trim="name" />
                </b-form-group>

                <b-form-group>
                    <b-form-input
                        required
                        placeholder="Your API key (incl. UID)"
                        autocomplete="apiKey"
                        v-model.trim="apiKey" />
                </b-form-group>

                <b-button
                    type="submit"
                    variant="primary">
                    Save
                </b-button>

                <b-button
                    v-if="$store.getters.name && $store.getters.apiKey"
                    v-on:click="forget"
                    variant="secondary">
                    Forget me!
                </b-button>
            </b-form>
        </template>
        <template v-else>
            <h4>Sad to see you go :(</h4>

            <p>Come back again soon.</p>

            <b-button
                v-on:click="isForgotten = false"
                variant="secondary">
                OK, let's try again!
            </b-button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'UserConfig',

    data () {
        return {
            name: this.$store.getters.name,
            apiKey: this.$store.getters.apiKey,
            isForgotten: false,
        };
    },

    methods: {
        save () {
            this.$store.commit('name', {
                name: this.name,
            });
            this.$store.commit('apiKey', {
                apiKey: this.apiKey,
            });

            this.$router.replace('/overview');
        },

        forget () {
            this.$store.commit('name', {
                name: '',
            });
            this.$store.commit('apiKey', {
                apiKey: '',
            });

            this.name = '';
            this.apiKey = '';
            this.isForgotten = true;
        },
    },
};
</script>

<style>
.user-config {
    margin: 0 auto;
    width: 300px;
}
</style>
