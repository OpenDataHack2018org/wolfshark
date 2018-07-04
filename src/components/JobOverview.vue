<template>
    <b-container>
        <b-row>
            <b-col>
                <LogoHeader>
                    <h4>Welcome back, {{ name }}!</h4>
                    <p>Here is a list of current jobs.</p>
                </LogoHeader>

                <b-table
                    ref="jobsTable"
                    v-bind:filter="filter"
                    v-bind:items="getJobs"
                    v-bind:fields="fields"
                    v-bind:current-page="currentPage"
                    v-bind:per-page="perPage"
                    v-bind:busy.sync="isBusy"
                    striped
                    hover
                    fixed
                    show-empty
                    no-provider-paging
                    no-provider-sorting
                    no-provider-filtering
                    v-on:row-clicked="showDetails"
                    v-on:filtered="onFiltered">
                    <template
                        slot="status"
                        slot-scope="data">
                        <span v-bind:title="statusCodesLookup[data.value].toLowerCase()">
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
                            v-if="data.item.status === statusCodes.COMPLETED"
                            variant="success"
                            size="sm"
                            block
                            v-on:click.stop="download(
                                `/static/videos/${data.item.job_id}.mp4`,
                                data.item.title,
                                data.item.format
                        )">
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
                                            <td>{{ data.item.theme ? 'dark' : 'light' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Speed</th>
                                            <td>{{ data.item.speed }} fps</td>
                                        </tr>
                                        <tr>
                                            <th>Output</th>
                                            <td>{{ outputCodesLookup[data.item.output] }}</td>
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
                                v-if="data.item.status === statusCodes.COMPLETED"
                                md="6">
                                <b-embed
                                    v-if="data.item.format === 'mp4'"
                                    type="video"
                                    controls>
                                    <source
                                        v-bind:src="`/static/videos/${data.item.job_id}.mp4`"
                                        type="video/mp4"/>
                                </b-embed>
                                <img
                                    v-else
                                    v-bind:src="`/static/videos/${data.item.job_id}.mp4`"
                                    width="100%"/>
                            </b-col>
                        </b-row>
                    </template>
                </b-table>

                <b-form-row>
                    <b-col md="6">
                        <b-button-group class="mb-5">
                            <b-button
                                to="/scheduling"
                                variant="primary">
                                <i class="fa fa-plus" />
                                Schedule
                            </b-button>
                            <b-button
                                v-on:click="$refs.jobsTable.refresh()"
                                variant="success">
                                <i
                                    class="fa fa-sync"
                                    v-bind:class="{ 'fa-spin': isBusy }" />
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
                    <b-col md="4" offset-md="2">
                        <b-form-group>
                            <b-input-group>
                                <b-form-input
                                    v-model="filter"
                                    placeholder="Filter" />
                                <b-input-group-append>
                                    <b-button
                                        v-bind:disabled="!filter"
                                        v-on:click="filter = ''">
                                        Clear
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-pagination
                            v-if="jobsLength > perPage"
                            v-bind:total-rows="jobsLength"
                            v-bind:per-page="perPage"
                            v-model="currentPage"
                            align="center" />
                    </b-col>
                </b-form-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { kebabCase } from 'lodash';
import api from '@/services/api';
import { mapGetters } from 'vuex';

export default {
    name: 'JobOverview',

    data () {
        return {
            ...api.host(),
            ...api.codes(),
            ...api.codeLookup(),
            setIntervalId: null,
            filter: '',
            isBusy: false,
            jobsLength: 0,
            currentPage: 1,
            perPage: 10,
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
        getJobs () {
            return api.getJobs().then((jobs) => {
                if (!jobs || !Array.isArray(jobs.data)) {
                    this.showError();
                    return [];
                }

                jobs.data.forEach((job) => {
                    /* eslint-disable-next-line no-param-reassign */
                    job._showDetails = false;
                });

                return jobs.data;
            });
        },

        api () {
            return api;
        },

        showError () {
            this.$bus.$emit('showAlert', {
                heading: 'Oops, something went wrong!',
                text: 'An error was encountered while processing your request. Please try again later.',
                variant: 'danger',
            });
        },

        getStatusIcon (status) {
            let icon;
            switch (status) {
                case this.statusCodes.PROCESSING:
                    icon = 'circle-notch';
                    break;
                case this.statusCodes.QUEUED:
                case this.statusCodes.COMPLETED:
                case this.statusCodes.ERROR:
                default:
                    icon = 'circle';
            }

            return icon;
        },

        getStatusColor (status) {
            let color;
            switch (status) {
                case `${this.statusCodes.PROCESSING}`:
                    color = '#ff6a00';
                    break;
                case `${this.statusCodes.COMPLETED}`:
                    color = '#00af17';
                    break;
                case `${this.statusCodes.ERROR}`:
                    color = '#d00000';
                    break;
                case `${this.statusCodes.QUEUED}`:
                default:
                    color = '#fa0';
            }

            return color;
        },

        getStatusAnimation (status) {
            let anim;
            switch (`${status}`) {
                case `${this.statusCodes.PROCESSING}`:
                    anim = true;
                    break;
                case `${this.statusCodes.QUEUED}`:
                case `${this.statusCodes.COMPLETED}`:
                case `${this.statusCodes.ERROR}`:
                default:
                    anim = false;
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

        download (href, title, format) {
            const filename = `${kebabCase(title)}.${format}`;
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('target', '_blank');
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },

        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering.
            this.jobsLength = filteredItems.length;
            this.currentPage = 1;
        },
    },

    created () {
        this.setIntervalId = setInterval(() => {
            this.$refs.jobsTable.refresh();
        }, 60000);
    },

    beforeDestroy () {
        clearInterval(this.setIntervalId);
    },
};
</script>

<style>
tbody tr:not(.b-table-details) {
    cursor: pointer;
}
</style>
