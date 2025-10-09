console.log('🎯 API Interceptor Loaded');
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
  let finalUrl = url;
  if (typeof url === 'string' && url.startsWith('/api/')) {
    finalUrl = baseUrl + url;
    console.log('🎯 Fixed:', url, '→', finalUrl);
  }
  return originalFetch(finalUrl, options);
};
