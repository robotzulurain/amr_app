// Fix all API URLs in production
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (typeof url === 'string' && url.startsWith('/api/')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
    url = baseUrl + url;
  }
  return originalFetch(url, options);
};
