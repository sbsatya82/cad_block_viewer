import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api', // Change port if needed
});

export default axiosAPI;