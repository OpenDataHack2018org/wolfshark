import axios from 'axios';

const server = 'localhost';
let port = 5000;
if (process.env.NODE_ENV === 'development') {
    port = 8080;
}

const api = axios.create({
    baseURL: `http://${server}:${port}/api`,
});

export default {
    host () {
        return {
            host: `http://${server}:${port}`,
        };
    },

    codes () {
        return {
            statusCodes: {
                QUEUED: 1,
                PROCESSING: 2,
                COMPLETED: 3,
                ERROR: 4,
            },
            outputCodes: {
                SCREEN: 1,
                GLOBE: 2,
            },
            themeCodes: {
                DARK: 1,
                LIGHT: 2,
            },
        };
    },

    codeLookup () {
        return {
            statusCodesLookup: {
                1: 'QUEUED',
                2: 'PROCESSING',
                3: 'COMPLETED',
                4: 'ERROR',
            },
            outputCodesLookup: {
                1: 'SCREEN',
                2: 'GLOBE',
            },
            themeCodesLookup: {
                1: 'DARK',
                2: 'LIGHT',
            },
        };
    },

    getJobs () {
        return api.get('job');
    },

    createJob (job) {
        return api.post('job', job);
    },
};
