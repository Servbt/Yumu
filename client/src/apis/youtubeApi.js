import axios from 'axios';
const KEY = 'AIzaSyCCB5k_U80mBg8RoYhVgFCJ3t3xjKQAr1w';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})