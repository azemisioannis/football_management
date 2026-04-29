import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5089/api' 
});

// Προσθήκη του Token σε κάθε κλήση
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Φέρνει τη λίγκα που ανήκει στον συγκεκριμένο χρήστη
export const getLeagueByUserId = (userId) => API.get(`/league/user/${userId}`);

export const deleteLeague = (id) => API.delete(`/league/${id}`);

// Συνάρτηση για Login
export const login = (formData) => API.post('/auth/login', formData);

// Συνάρτηση για Register
export const register = (formData) => API.post('/auth/register', formData);

// Παράδειγμα για League (θα το χρειαστούμε μετά)
export const createLeague = (leagueData) => API.post('/league', leagueData);

export default API;