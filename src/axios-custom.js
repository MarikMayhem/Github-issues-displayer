import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { 'Authorization': `Token ${process.env.REACT_APP_GITHUB_API_TOKEN}` }
});

export default instance;