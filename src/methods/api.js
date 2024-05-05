/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
import axios from 'axios';

const baseURL = process.env.VUE_APP_API; // Base URL for your API

const api = axios.create({
  baseURL,
});

// Define functions for different HTTP methods
const get = async (url) => {
  try {
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const _delete = async (url) => {
  try {
    const response = await api.delete(url);
    return response;
  } catch (error) {
    throw error;
  }
};

// Export the functions to be used in other files
export default {
  get,
  post,
  put,
  delete: _delete,
};
