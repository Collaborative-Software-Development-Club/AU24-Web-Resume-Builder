const API_BASE_URL = 'http://localhost:8080'; // Adjust if your Spring Boot runs on a different port

export const enhanceText = async (text) => {
  try {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(`${API_BASE_URL}/enhance-text?message=${encodedText}`);
    
    if (!response.ok) {
      throw new Error('Failed to enhance text');
    }
    
    const data = await response.json();
    return data.generation;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw error;
  }
}; 