<template>
    <b-container>
        <b-form v-on:submit.prevent="submit">
            <b-row>
                <b-col>
                    <LogoHeader>
                        <h4>Let's schedule a job :)</h4>
                        <p>Please provide values for all parameters below.</p>
                    </LogoHeader>

                    <b-form-group label="Title">
                        <b-form-input
                            required
                            placeholder="My Title"
                            autocomplete="on"
                            v-model.trim="title" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Dataset">
                        <b-form-select
                            required
                            v-model="dataset"
                            v-bind:options="datasetOptions" />
                    </b-form-group>

                    <b-form-group label="Area">
                        <b-form-select
                            required
                            v-model="area"
                            v-bind:options="areaOptions" />
                    </b-form-group>

                    <b-form-group label="Theme">
                        <b-form-select
                            required
                            v-model="theme"
                            v-bind:options="themeOptions" />
                    </b-form-group>

                    <b-form-group label="Output">
                        <b-form-select
                            required
                            v-model="output"
                            v-bind:options="outputOptions" />
                    </b-form-group>

                    <b-form-group label="Width">
                        <b-form-input
                            v-bind:disabled="output === 'globe'"
                            required
                            type="number"
                            v-model="width" />
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Start Date">
                        <b-form-row>
                            <b-col>
                                <b-form-input
                                    required
                                    type="date"
                                    v-model="startDate" />
                            </b-col>
                            <b-col>
                                <b-form-input
                                    required
                                    type="time"
                                    v-model="startTime" />
                            </b-col>
                        </b-form-row>
                    </b-form-group>

                    <b-form-group label="End Date">
                        <b-form-row>
                            <b-col>
                                <b-form-input
                                    required
                                    type="date"
                                    v-model="endDate" />
                            </b-col>
                            <b-col>
                                <b-form-input
                                    required
                                    type="time"
                                    v-model="endTime" />
                            </b-col>
                        </b-form-row>
                    </b-form-group>

                    <b-form-group label="Interval">
                        <b-form-select
                            required
                            v-model="interval"
                            v-bind:options="intervalOptions" />
                    </b-form-group>

                    <b-form-group label="Speed">
                        <b-form-select
                            required
                            v-model="speed"
                            v-bind:options="speedOptions" />
                    </b-form-group>

                    <b-form-group label="Format">
                        <b-form-select
                            required
                            v-model="format"
                            v-bind:options="formatOptions" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        label="Length (computed)"
                        v-bind:invalid-feedback="lengthFeedback"
                        v-bind:state="!Boolean(lengthFeedback.length)">
                        <b-form-input
                            plaintext
                            v-bind:value="length" />
                    </b-form-group>

                    <b-button-group class="mb-5">
                        <b-button
                            v-bind:disabled="Boolean(lengthFeedback.length)"
                            type="submit"
                            variant="primary">
                            <i class="fa fa-cloud-upload-alt" />
                            Submit
                        </b-button>

                        <b-button
                            to="/overview"
                            variant="danger">
                            <i class="fa fa-times" />
                            Cancel
                        </b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/services/api';
import moment from 'moment';

export default {
    name: 'JobScheduling',

    data () {
        return {
            title: '',
            dataset: 'ERA5 Geopotential on 1000 hPa',
            datasetOptions: [
                {
                    value: 'ERA5 Geopotential on 1000 hPa',
                    text: 'ERA5 Geopotential on 1000 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 925 hPa',
                    text: 'ERA5 Geopotential on 925 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 850 hPa',
                    text: 'ERA5 Geopotential on 850 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 700 hPa',
                    text: 'ERA5 Geopotential on 700 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 500 hPa',
                    text: 'ERA5 Geopotential on 500 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 400 hPa',
                    text: 'ERA5 Geopotential on 400 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 300 hPa',
                    text: 'ERA5 Geopotential on 300 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 200 hPa',
                    text: 'ERA5 Geopotential on 200 hPa',
                },
                {
                    value: 'ERA5 Geopotential on 100 hPa',
                    text: 'ERA5 Geopotential on 100 hPa',
                },
                {
                    value: 'ERA5 Temperature on 1000 hPa',
                    text: 'ERA5 Temperature on 1000 hPa',
                },
                {
                    value: 'ERA5 Temperature on 925 hPa',
                    text: 'ERA5 Temperature on 925 hPa',
                },
                {
                    value: 'ERA5 Temperature on 850 hPa',
                    text: 'ERA5 Temperature on 850 hPa',
                },
                {
                    value: 'ERA5 Temperature on 700 hPa',
                    text: 'ERA5 Temperature on 700 hPa',
                },
                {
                    value: 'ERA5 Temperature on 500 hPa',
                    text: 'ERA5 Temperature on 500 hPa',
                },
                {
                    value: 'ERA5 Temperature on 400 hPa',
                    text: 'ERA5 Temperature on 400 hPa',
                },
                {
                    value: 'ERA5 Temperature on 300 hPa',
                    text: 'ERA5 Temperature on 300 hPa',
                },
                {
                    value: 'ERA5 Temperature on 200 hPa',
                    text: 'ERA5 Temperature on 200 hPa',
                },
                {
                    value: 'ERA5 Temperature on 100 hPa',
                    text: 'ERA5 Temperature on 100 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 1000 hPa',
                    text: 'ERA5 Relative humidity on 1000 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 925 hPa',
                    text: 'ERA5 Relative humidity on 925 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 850 hPa',
                    text: 'ERA5 Relative humidity on 850 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 700 hPa',
                    text: 'ERA5 Relative humidity on 700 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 500 hPa',
                    text: 'ERA5 Relative humidity on 500 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 400 hPa',
                    text: 'ERA5 Relative humidity on 400 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 300 hPa',
                    text: 'ERA5 Relative humidity on 300 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 200 hPa',
                    text: 'ERA5 Relative humidity on 200 hPa',
                },
                {
                    value: 'ERA5 Relative humidity on 100 hPa',
                    text: 'ERA5 Relative humidity on 100 hPa',
                },
                {
                    value: 'ERA5 2m temperature',
                    text: 'ERA5 2m temperature',
                },
                {
                    value: 'ERA5 Cloud base height',
                    text: 'ERA5 Cloud base height',
                },
                {
                    value: 'ERA5 High cloud cover',
                    text: 'ERA5 High cloud cover',
                },
                {
                    value: 'ERA5 Low cloud cover',
                    text: 'ERA5 Low cloud cover',
                },
                {
                    value: 'ERA5 Mean sea level pressure',
                    text: 'ERA5 Mean sea level pressure',
                },
                {
                    value: 'ERA5 Sea surface temperature',
                    text: 'ERA5 Sea surface temperature',
                },
                {
                    value: 'ERA5 Total cloud cover',
                    text: 'ERA5 Total cloud cover',
                },
                {
                    value: 'ERA5 Total precipitation',
                    text: 'ERA5 Total precipitation',
                },
            ],
            area: 'WORLD',
            areaOptions: [
                {
                    value: 'WORLD',
                    text: 'Global',
                },
                {
                    value: 'EUROPE',
                    text: 'Europe',
                },
                {
                    value: 'N_AMERICA',
                    text: 'North America',
                },
                {
                    value: 'S_AMERICA',
                    text: 'South America',
                },
                {
                    value: 'ASIA',
                    text: 'Asia',
                },
                {
                    value: 'AUSTRALIA',
                    text: 'Australia',
                },
                {
                    value: 'AFRICA',
                    text: 'Africa',
                },
            ],
            theme: 'dark',
            themeOptions: [
                {
                    value: 'dark',
                    text: 'Dark',
                },
                {
                    value: 'light',
                    text: 'Light',
                },
            ],
            output: 'globe',
            outputOptions: [
                {
                    value: 'globe',
                    text: 'Weather Globe',
                },
                {
                    value: 'screen',
                    text: 'Screen',
                },
            ],
            format: 'mp4',
            formatOptions: [
                {
                    value: 'mp4',
                    text: 'MP4',
                },
                {
                    value: 'gif',
                    text: 'GIF',
                },
            ],
            width: 4000,
            startDate: '',
            startTime: '00:00',
            endDate: '',
            endTime: '00:00',
            interval: 24,
            intervalOptions: [
                {
                    value: 1,
                    text: '1 hour',
                },
                {
                    value: 3,
                    text: '3 hours',
                },
                {
                    value: 6,
                    text: '6 hours',
                },
                {
                    value: 12,
                    text: '12 hours',
                },
                {
                    value: 24,
                    text: '24 hours',
                },
            ],
            speed: 15,
            speedOptions: [
                {
                    value: 30,
                    text: '30 fps',
                },
                {
                    value: 15,
                    text: '15 fps',
                },
                {
                    value: 10,
                    text: '10 fps',
                },
                {
                    value: 6,
                    text: '6 fps',
                },
                {
                    value: 5,
                    text: '5 fps',
                },
                {
                    value: 3,
                    text: '3 fps',
                },
                {
                    value: 2,
                    text: '2 fps',
                },
                {
                    value: 1,
                    text: '1 fps',
                },
            ],
        };
    },

    computed: {
        startDateTime () {
            if (!this.startDate || !this.startTime) {
                return '';
            }

            // Consider input in UTC timezone.
            const startDateTime = moment.utc(`${this.startDate}T${this.startTime}`);

            // Set all minutes to zero, as API supports only full hours.
            startDateTime.minutes(0);

            return startDateTime;
        },

        endDateTime () {
            if (!this.endDate || !this.endTime) {
                return '';
            }

            // Consider input in UTC timezone.
            const endDateTime = moment.utc(`${this.endDate}T${this.endTime}`);

            // Set all minutes to zero, as API supports only full hours.
            endDateTime.minutes(0);

            return endDateTime;
        },

        lengthFeedback () {
            if (
                (
                    !this.startDateTime || !this.endDateTime
                )
                || !this.interval
                || !this.speed
            ) {
                return 'Please fill all relevant fields first.';
            }

            if (
                this.startDateTime > this.endDateTime
            ) {
                return 'Start time should not be after the end time!';
            }

            return '';
        },

        length () {
            if (
                !this.interval
                || !this.speed
                || (
                    !this.startDateTime || !this.endDateTime
                )
                || this.startDateTime > this.endDateTime
            ) {
                return 'unknown';
            }

            const hourDifference = this.endDateTime.diff(this.startDateTime, 'hours');
            const length = (hourDifference / this.interval) / this.speed;

            return '%s seconds'.replace('%s', length.toFixed(1));
        },
    },

    methods: {
        submit () {
            if (this.lengthFeedback.length) {
                return;
            }

            api.createJob({
                'user_name': this.$store.getters.name,
                'user_key': this.$store.getters.apiKey,
                'title': this.title,
                'dataset': this.dataset,
                'area': this.area,
                'start_date_time': this.startDateTime.toISOString(),
                'end_date_time': this.endDateTime.toISOString(),
                'interval': this.interval,
                'theme': this.theme,
                'speed': this.speed,
                'output': this.output,
                'format': this.format,
                'resolution': this.width,
            }).then((response) => {
                console.log(response);
                this.showSuccess();
            }).catch((error) => {
                console.error(error);
                this.showError();
            });

            this.$router.push('/overview');
        },

        showSuccess () {
            this.$bus.$emit('showAlert', {
                heading: 'Your job has been scheduled!',
                text: 'Please note that job processing takes some time. Check back here later.',
                variant: 'success',
            });
        },

        showError () {
            this.$bus.$emit('showAlert', {
                heading: 'Oops, something went wrong!',
                text: 'An error was encountered while processing your request. Please try again later.',
                variant: 'danger',
            });
        },
    },

    watch: {
        output (newValue) {
            if (newValue === 'globe') {
                this.width = 4000;
            }
        },

        width (newValue) {
            if (parseInt(newValue, 10) > 4000) {
                this.$nextTick(() => {
                    this.width = 4000;
                });
            }
            else if (parseInt(newValue, 10) < 320) {
                this.$nextTick(() => {
                    this.width = 320;
                });
            }
        },

        area () {
            if (this.area !== 'WORLD') {
                this.$set(this.outputOptions[0], 'disabled', true);
                this.output = 'screen';
            }
            else {
                this.$delete(this.outputOptions[0], 'disabled');
            }
        },

        startTime (newValue) {
            if (!/:00$/.test(newValue)) {
                this.$nextTick(() => {
                    this.startTime = newValue.replace(/:[0-9]+$/, ':00');
                });
            }
        },
    },
};
</script>

<style>

</style>
