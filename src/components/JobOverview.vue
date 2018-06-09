<template>
    <b-container>
        <b-row>
            <b-col>
                <h4>Welcome back, {{ name }}!</h4>

                <p>Here is a list of current jobs.</p>

                <b-table
                    v-bind:items="jobs"
                    v-bind:fields="fields"
                    v-bind:current-page="currentPage"
                    v-bind:per-page="perPage"
                    striped
                    hover
                    small
                    fixed
                    v-on:row-clicked="showDetails">
                    <template
                        slot="status"
                        slot-scope="data">
                        <span v-bind:title="data.value">
                            <i
                                class="fa"
                                v-bind:class="getStatusClasses(data.value)"
                                v-bind:style="{ color: getStatusColor(data.value) }" />
                        </span>
                    </template>
                    <template
                        slot="row-details"
                        slot-scope="data">
                        details
                    </template>
                </b-table>

                <b-pagination
                    v-if="jobs.length > perPage"
                    v-bind:total-rows="jobs.length"
                    v-bind:per-page="perPage"
                    v-model="currentPage" />

                <b-button-group>
                    <b-button
                        to="/scheduling"
                        variant="primary">
                        <i class="fa fa-plus" />
                        Schedule
                    </b-button>
                    <b-button
                        v-on:click="refresh"
                        variant="success">
                        <i class="fa fa-sync" />
                        Refresh
                    </b-button>
                    <b-button
                        to="/config"
                        variant="secondary">
                        <i class="fa fa-cog" />
                        Preferences
                    </b-button>
                </b-button-group>
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
            currentPage: 1,
            perPage: 25,
            jobs: [],
            fields: [
                {
                    key: 'title',
                    sortable: true,
                },
                {
                    key: 'user',
                    sortable: true,
                },
                {
                    key: 'status',
                    sortable: true,
                },
            ],
        };
    },

    computed: {
        ...mapGetters([
            'name',
        ]),
    },

    methods: {
        refresh () {
            this.$set(this, 'jobs', [
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
            ]);
        },

        getStatusIcon (status) {
            let icon;
            switch (status) {
                case 'processing':
                    icon = 'circle-notch';
                    break;
                case 'queued':
                case 'done':
                case 'error':
                default:
                    icon = 'circle';
            }

            return icon;
        },

        getStatusColor (status) {
            let color;
            switch (status) {
                case 'processing':
                    color = '#ff6a00';
                    break;
                case 'done':
                    color = '#00af17';
                    break;
                case 'error':
                    color = '#d00000';
                    break;
                case 'queued':
                default:
                    color = '#fa0';
            }

            return color;
        },

        getStatusAnimation (status) {
            let anim;
            switch (status) {
                case 'processing':
                    anim = 'spin';
                    break;
                case 'queued':
                case 'done':
                case 'error':
                default:
                    anim = '';
            }

            return anim;
        },

        getStatusClasses (status) {
            const iconClass = `fa-${this.getStatusIcon(status)}`;
            const animClass = this.getStatusAnimation(status) ? 'fa-spin' : '';

            return [
                iconClass,
                animClass,
            ];
        },

        showDetails (item) {
            /* eslint-disable-next-line no-param-reassign */
            item._showDetails = !item._showDetails;
        },
    },

    mounted () {
        this.refresh();
    },
};
</script>

<style>
tbody tr:not(.b-table-details) {
    cursor: pointer;
}
</style>
