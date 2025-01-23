import axios from 'axios';
import { API_CONFIG } from '../config/config';

const newsApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'X-Api-Key': API_CONFIG.NEWS_API_KEY
  }
});

export const getTopHeadlines = async (page = 1, pageSize = 20) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        country: API_CONFIG.COUNTRY,
        page,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByCategory = async (category, page = 1, pageSize = 20) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        country: API_CONFIG.COUNTRY,
        category,
        page,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchNews = async (query, page = 1, pageSize = 20) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        page,
        pageSize,
        language: 'en'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};