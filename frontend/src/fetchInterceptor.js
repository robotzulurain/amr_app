// ULTIMATE API FIXER
console.log('🎯 API Interceptor Loaded');

const originalFetch = window.fetch;
window.fetch = function(url, options) {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
  let finalUrl = url;
  
  if (typeof url === 'string') {
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🎯 Fixed API URL:', url, '→', finalUrl);
    } else if (url.startsWith('api/')) {
      finalUrl = baseUrl + '/' + url;
      console.log('🎯 Fixed API URL:', url, '→', finalUrl);
    }
  }
  
  return originalFetch(finalUrl, options);
};

// Also fix XMLHttpRequest for other libraries
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
  let finalUrl = url;
  
  if (typeof url === 'string') {
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🎯 Fixed XHR URL:', url, '→', finalUrl);
    }
  }
  
  return originalXHROpen.call(this, method, finalUrl, ...args);
};
