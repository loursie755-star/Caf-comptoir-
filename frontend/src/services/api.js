import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.timeout = 10000;

// API Services
export const reservationAPI = {
  create: async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/reservations/`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/reservations/`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la réservation:', error);
      throw error;
    }
  }
};

export const contactAPI = {
  send: async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/contact/`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/contact/`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  }
};

export const reviewsAPI = {
  getAll: async (approvedOnly = true) => {
    try {
      const response = await axios.get(`${API_BASE}/reviews/`, {
        params: { approved_only: approvedOnly }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/reviews/`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'avis:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'avis:', error);
      throw error;
    }
  }
};

export const menuAPI = {
  getAll: async (category = null, availableOnly = true) => {
    try {
      const params = { available_only: availableOnly };
      if (category) {
        params.category = category;
      }
      
      const response = await axios.get(`${API_BASE}/menu/`, { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du menu:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE}/menu/categories`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/menu/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'élément du menu:', error);
      throw error;
    }
  }
};

export const restaurantAPI = {
  getInfo: async () => {
    try {
      const response = await axios.get(`${API_BASE}/info`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du restaurant:', error);
      throw error;
    }
  }
};

// Helper function for error handling
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.detail || error.response.data?.error || 'Erreur du serveur';
    return { success: false, message, status: error.response.status };
  } else if (error.request) {
    // Network error
    return { success: false, message: 'Erreur de connexion au serveur', status: 0 };
  } else {
    // Other error
    return { success: false, message: error.message || 'Une erreur est survenue', status: -1 };
  }
};