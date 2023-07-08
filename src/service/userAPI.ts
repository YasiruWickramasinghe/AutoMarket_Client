import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/users';

const userAPI = axios.create({
    baseURL: BASE_URL,
});

export const registerUser = async (userData: { name: string; email: string; phone: number; password: string }): Promise<void> => {
    try {
        await userAPI.post('/register', userData);
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
        const response: AxiosResponse<{ accessToken: string; refreshToken: string }> = await userAPI.post('/login', { email, password });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const getUserProfile = async (
    accessToken: string
  ): Promise<{ user: any }> => {
    try {
      const response: AxiosResponse<{ user: any }> = await userAPI.get('/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      handleRequestError(error);
      throw error;
    }
  };

export const updateUserProfile = async (
    userData: { name: string; phone: number; email: string; oldPassword: string; newPassword: string },
    accessToken: string
): Promise<void> => {
    try {
        await userAPI.put('/profileupdate', userData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const deleteUserProfile = async (accessToken: string): Promise<void> => {
    try {
        await userAPI.delete('/profiledelete', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error: any) {
        handleRequestError(error);
        throw error;
    }
};

export const logoutUser = async (accessToken: string): Promise<void> => {
    try {
        await userAPI.post('/logout', null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
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
