// Global fetch interceptor to fix API URLs in production
console.log('Fetch interceptor loaded');

const originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (typeof url === 'string') {
    // Fix relative URLs starting with /api/
    if (url.startsWith('/api/')) {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
      url = baseUrl + url;
      console.log('Fixed API URL:', url);
    }
  }
  return originalFetch(url, options);
};

// Also intercept axios if used
if (typeof window.axios !== 'undefined') {
  console.log('Axios interceptor loaded');
  const originalAxiosRequest = window.axios.request;
  window.axios.request = function(config) {
    if (config.url && config.url.startsWith('/api/')) {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
      config.url = baseUrl + config.url;
      console.log('Fixed Axios URL:', config.url);
    }
    return originalAxiosRequest(config);
  };
}
