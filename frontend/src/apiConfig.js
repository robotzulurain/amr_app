// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
console.log('API Base URL:', API_BASE_URL);

export const API = API_BASE_URL;
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
