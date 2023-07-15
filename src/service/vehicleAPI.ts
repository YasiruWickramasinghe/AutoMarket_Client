import axios, { AxiosResponse } from 'axios';
import { Vehicle } from '../types/vehicleTypes';

const BASE_URL = 'http://localhost:3000';

const vehicleAPI = axios.create({
    baseURL: BASE_URL,
});

// Add an interceptor to include the authorization accessToken in the headers
vehicleAPI.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken'); // Retrieve the accessToken from localStorage or wherever you store it
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

interface GetVehiclesOptions {
    page?: number;
    limit?: number;
    sort?: Record<string, number>;
    filter?: Record<string, any>;
    search?: string;
}

export const getVehicles = async ({
    page = 1,
    limit = 6,
    sort = {},
    filter = {},
    search = '',
}: GetVehiclesOptions = {}): Promise<{ data: Vehicle[]; totalCount: number; currentPage: number; totalPages: number, limit: number; }> => {
    try {
        const response: AxiosResponse<{ data: Vehicle[]; totalCount: number; currentPage: number; totalPages: number }> = await vehicleAPI.get('/vehicles', {
            params: {
                page,
                limit,
                sort: JSON.stringify(sort),
                filter: JSON.stringify(filter),
                search,
            },
        });
        return {...response.data, limit,};
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};


export const getVehicleById = async (id: string): Promise<Vehicle> => {
    try {
        const response: AxiosResponse<Vehicle> = await vehicleAPI.get(`/vehicles/${id}`);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const getVehicleByUserId = async (userId: string): Promise<Vehicle[]> => {
    try {
      const response: AxiosResponse<Vehicle[]> = await vehicleAPI.get(`/vehicles/user/${userId}`);
      return response.data;
    } catch (error: any) {
      handleRequestError(error);
      throw error;
    }
  };
  

export const createVehicle = async (vehicleData: Partial<Vehicle>): Promise<Vehicle> => {
    try {
        const response: AxiosResponse<Vehicle> = await vehicleAPI.post('/vehicles', vehicleData);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> => {
    try {
        const response: AxiosResponse<Vehicle> = await vehicleAPI.put(`/vehicles/${id}`, vehicleData);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const deleteVehicle = async (id: string): Promise<void> => {
    try {
        await vehicleAPI.delete(`/vehicles/${id}`);
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const searchVehicles = async (searchQuery: string): Promise<Vehicle[]> => {
    try {
        const response: AxiosResponse<Vehicle[]> = await vehicleAPI.get('/vehicles/search/name', {
            params: { searchQuery },
        });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

const handleRequestError = (error: any) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Request error:', error.response.status, error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response:', error.request);
    } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
    }
};
