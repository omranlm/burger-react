import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://burger-builder-279ae-default-rtdb.firebaseio.com/'
    }
);

export default instance;