import axios from 'axios';
import config from "./AppSecrets.json";

const apiService = axios.create({
    baseURL: config.base_url,
    headers: {
        'projectId': config.projectId,
        'environmentId': config.environmentId,
    },
});

export const CosmoApi = () => {

    const getEmployees = async (endpoint, params) => {
        try {
            const response = await apiService.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const addEmployee = async (endpoint, data) => {
        try {
            const response = await apiService.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const getEmployee = async (endpoint, id) => {
        try {
            const response = await apiService.get(`${endpoint}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteEmployee = async (endpoint, id) => {
        try {
            const response = await apiService.delete(`${endpoint}/${id}`, { data: {} });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { getEmployees, addEmployee, getEmployee, deleteEmployee }
};



