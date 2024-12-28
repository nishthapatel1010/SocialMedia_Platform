import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5500' });

export const logIn = (formData) => {
  return API.post('/auth/login', formData)
    .then((response) => {
      console.log('Login Success:', response.data);

      // Save token and user data to localStorage
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    })
    .catch((error) => {
      console.error('Login Error:', error.response || error.message);
      throw error;
    });
};

export const signUp = (formData) => {
  return API.post('/auth/register', formData)
    .then((response) => {
      console.log('SignUp Success:', response.data);

      // Save token and user data to localStorage
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    })
    .catch((error) => {
      console.error('SignUp Error:', error.response || error.message);
      throw error;
    });
};
