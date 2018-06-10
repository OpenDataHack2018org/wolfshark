<template>
    <b-container>
        <b-row>
            <b-col>
                <template v-if="success">
                    <h4>{{ name }}, your job has been queued!</h4>
                    <p>Please note that job processing can take certain amount of time.</p>
                </template>
                <template v-else>
                    <h4>Welcome back, {{ name }}!</h4>
                    <p>Here is a list of current jobs.</p>
                </template>

                <b-table
                    v-bind:items="jobs"
                    v-bind:fields="fields"
                    v-bind:current-page="currentPage"
                    v-bind:per-page="perPage"
                    striped
                    hover
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
                        slot="download"
                        slot-scope="data">
                        <b-button
                            variant="success"
                            size="sm"
                            v-on:click.stop="download('http://techslides.com/demos/sample-videos/small.mp4')">
                            <i class="fa fa-download" />
                            Download
                        </b-button>
                    </template>
                    <template
                        slot="row-details"
                        slot-scope="data">
                        <b-row>
                            <b-col md="6">
                                <table class="table table-sm">
                                    <tbody>
                                        <tr>
                                            <th>Job ID</th>
                                            <td>{{ data.item.job_id }}</td>
                                        </tr>
                                        <tr>
                                            <th>Dataset</th>
                                            <td>{{ data.item.dataset }}</td>
                                        </tr>
                                        <tr>
                                            <th>Area</th>
                                            <td>{{ data.item.area }}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date</th>
                                            <td>{{ data.item.start_date_time }}</td>
                                        </tr>
                                        <tr>
                                            <th>End Date</th>
                                            <td>{{ data.item.end_date_time }}</td>
                                        </tr>
                                        <tr>
                                            <th>Interval</th>
                                            <td>{{ data.item.interval }} hour(s)</td>
                                        </tr>
                                        <tr>
                                            <th>Theme</th>
                                            <td>{{ data.item.theme }}</td>
                                        </tr>
                                        <tr>
                                            <th>Speed</th>
                                            <td>{{ data.item.speed }} fps</td>
                                        </tr>
                                        <tr>
                                            <th>Output</th>
                                            <td>{{ data.item.output }}</td>
                                        </tr>
                                        <tr>
                                            <th>Format</th>
                                            <td>{{ data.item.format }}</td>
                                        </tr>
                                        <tr>
                                            <th>Width</th>
                                            <td>{{ data.item.resolution }} px</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-col>
                            <b-col
                                v-if="data.item.result"
                                md="6">
                                <b-embed
                                    v-if="data.item.format === 'MP4'"
                                    type="video"
                                    controls>
                                    <source
                                        src="http://techslides.com/demos/sample-videos/small.mp4"
                                        type="video/mp4"/>
                                </b-embed>
                                <img
                                    v-else
                                    src="@/assets/news_18-02-13-ens_con_pv320_animaion.gif"
                                    width="100%"/>
                            </b-col>
                        </b-row>
                    </template>
                </b-table>

                <b-pagination
                    v-if="jobs.length > perPage"
                    v-bind:total-rows="jobs.length"
                    v-bind:per-page="perPage"
                    v-model="currentPage" />

                <b-button-group class="mb-5">
                    <b-button
                        to="/scheduling"
                        variant="primary">
                        <i class="fa fa-plus" />
                        Schedule
                    </b-button>
                    <b-button
                        v-on:click="refresh(true)"
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

    props: {
        showSuccess: {
            type: Boolean,
            default: false,
        },
    },

    data () {
        return {
            currentPage: 1,
            perPage: 10,
            jobs: [],
            success: this.showSuccess,
            fields: [
                {
                    key: 'title',
                    sortable: true,
                },
                {
                    key: 'user_name',
                    sortable: true,
                },
                {
                    key: 'status',
                    sortable: true,
                },
                {
                    key: 'download',
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
        refresh (reset) {
            if (reset) {
                this.success = false;
            }

            this.$set(this, 'jobs', [
                {
                    job_id: 3,
                    user_name: 'Toby',
                    title: 'Test job 4',
                    dataset: 'ERA5 Geopotential on 1000 hPa',
                    area: 'WORLD',
                    start_date_time: '2018-06-09 00:00',
                    end_date_time: '2018-06-10 00:00',
                    interval: '1',
                    theme: 'dark',
                    speed: 15,
                    output: 'globe',
                    format: 'MP4',
                    status: 'queued',
                    resolution: 4000,
                    _showDetails: false,
                },
                {
                    job_id: 2,
                    user_name: 'roger',
                    title: 'Test job 3',
                    dataset: 'ERA5 Geopotential on 1000 hPa',
                    area: 'WORLD',
                    start_date_time: '2018-06-09 00:00',
                    end_date_time: '2018-06-10 00:00',
                    interval: '1',
                    theme: 'dark',
                    speed: 15,
                    output: 'globe',
                    format: 'MP4',
                    status: 'processing',
                    resolution: 4000,
                    _showDetails: false,
                },
                {
                    job_id: 1,
                    user_name: 'Awen',
                    title: 'Test job 2',
                    dataset: 'ERA5 Geopotential on 1000 hPa',
                    area: 'WORLD',
                    start_date_time: '2018-06-09 00:00',
                    end_date_time: '2018-06-10 00:00',
                    interval: '1',
                    theme: 'dark',
                    speed: 15,
                    output: 'globe',
                    format: 'MP4',
                    status: 'error',
                    resolution: 4000,
                    result: 'out.mp4',
                    _showDetails: false,
                },
                {
                    job_id: 0,
                    user_name: 'milana',
                    title: 'Test job 1',
                    dataset: 'ERA5 Geopotential on 1000 hPa',
                    area: 'WORLD',
                    start_date_time: '2018-06-09 00:00',
                    end_date_time: '2018-06-10 00:00',
                    interval: '1',
                    theme: 'dark',
                    speed: 15,
                    output: 'globe',
                    format: 'GIF',
                    status: 'done',
                    resolution: 4000,
                    result: 'news_18-02-13-ens_con_pv320_animaion.gif',
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

        download (href) {
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('target', '_blank');
            link.setAttribute('download', true);
            document.body.appendChild(link);
            link.click();
            link.remove();
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
