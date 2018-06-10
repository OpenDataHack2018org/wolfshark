<template>
    <b-container>
        <b-row>
            <b-col v-if="!isForgotten">
                <LogoHeader>
                    <h4>Hello there!</h4>
                    <p>Please provide your name and API key below.</p>
                </LogoHeader>
            </b-col>
        </b-row>
        <b-row>
            <b-col
                v-if="!isForgotten"
                md="6">
                <b-form
                    v-on:submit.prevent="save">
                    <b-form-group>
                        <b-form-input
                            required
                            placeholder="Your name"
                            autocomplete="on"
                            v-model.trim="name" />
                    </b-form-group>

                    <b-form-group>
                        <b-form-input
                            required
                            placeholder="Your API key (incl. UID)"
                            autocomplete="on"
                            v-model.trim="apiKey" />
                    </b-form-group>

                    <b-button-group>
                        <b-button
                            type="submit"
                            variant="primary">
                            <i class="fa fa-save" />
                            Save
                        </b-button>

                        <b-button
                            v-if="$store.getters.name && $store.getters.apiKey"
                            v-on:click="forget"
                            variant="danger">
                            <i class="fa fa-times" />
                            Forget me!
                        </b-button>
                    </b-button-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="!isForgotten">
                <b-alert class="mt-5" show>
                    <h5 class="alert-heading">
                        Did you accept all the licenses under your account?
                    </h5>
                    <p>
                        Please make sure, prior to using this app, to accept all relevant
                        dataset licenses under your account, so your API key can be immediately
                        used. Please find (possibly incomplete list) below:
                    </p>
                    <hr>
                    <p class="mb-0">
                        <ul>
                            <li
                                v-for="link in licenseLinks"
                                v-bind:key="link.url">
                                <b-link
                                    v-bind:href="link.url"
                                    target="_blank">
                                    {{ link.name }}
                                    <i class="fa fa-external-link-alt" />
                                </b-link>
                            </li>
                        </ul>
                    </p>
                </b-alert>
            </b-col>
            <b-col v-else>
                <LogoHeader>
                    <h4>Sad to see you go :(</h4>
                    <p>Come back again soon.</p>
                </LogoHeader>

                <b-button
                    v-on:click="isForgotten = false"
                    variant="primary">
                    <i class="fa fa-sync" />
                    OK, let's try again!
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'UserConfig',

    data () {
        return {
            name: this.$store.getters.name,
            apiKey: this.$store.getters.apiKey,
            isForgotten: false,
            licenseLinks: [
                {
                    name: 'UZH Glaciers licence',
                    url: 'https://cds.climate.copernicus.eu/cdsapp/#!/terms/uhz-glaciers',
                },
                {
                    name: 'GHG-CCI Licence',
                    url: 'https://cds.climate.copernicus.eu/cdsapp/#!/terms/ghg-cci',
                },
                {
                    name: 'EUMETSAT OSI SAF products licence',
                    url: 'https://cds.climate.copernicus.eu/cdsapp/#!/terms/eumetsat-osi-saf',
                },
                {
                    name: 'Licence to Use Copernicus Products',
                    url: 'https://cds.climate.copernicus.eu/cdsapp/#!/terms/licence-to-use-copernicus-products',
                },
            ],
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

            this.showSuccess();

            this.$router.replace('/overview');
        },

        showSuccess () {
            this.$bus.$emit('showAlert', {
                heading: 'Your preferences have been saved!',
                text: 'Please note that this information is stored only in your browser session.',
                variant: 'success',
            });
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

</style>
