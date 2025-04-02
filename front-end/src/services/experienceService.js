import axios from 'axios';

const API_BASE_URL = '/api'; // Adjust based on your backend configuration

export const experienceService = {
  // Get all experiences
  getExperiences: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/experiences`);
      return response.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },
  
  // Create a new experience
  createExperience: async (experienceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/experiences`, experienceData);
      return response.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },
  
  // Update an existing experience
  updateExperience: async (id, experienceData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/experiences/${id}`, experienceData);
      return response.data;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },
  
  // Delete an experience
  deleteExperience: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }
}; 