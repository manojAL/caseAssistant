// src/config/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend runs on different port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;