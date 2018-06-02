import axios from 'axios';

export default () => axios.create({
    baseURL: `http://${window.location.hostname}:8081`,
});
