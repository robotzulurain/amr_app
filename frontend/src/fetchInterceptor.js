// API URL Interceptor - Fix API calls to point to Render backend
console.log('🎯 API Interceptor Initializing...');

const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
console.log('🎯 Base URL:', baseUrl);

// Override fetch
const originalFetch = window.fetch;
window.fetch = function(url, options = {}) {
  let finalUrl = url;
  
  // Fix relative API URLs
  if (typeof url === 'string') {
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🎯 API Interceptor: Fixed URL', url, '→', finalUrl);
    } else if (url.startsWith('api/')) {
      finalUrl = baseUrl + '/' + url;
      console.log('🎯 API Interceptor: Fixed URL', url, '→', finalUrl);
    }
  }
  
  return originalFetch(finalUrl, options);
};

// Override XMLHttpRequest for libraries that use it
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
  let finalUrl = url;
  
  if (typeof url === 'string') {
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🎯 XHR Interceptor: Fixed URL', url, '→', finalUrl);
    } else if (url.startsWith('api/')) {
      finalUrl = baseUrl + '/' + url;
      console.log('🎯 XHR Interceptor: Fixed URL', url, '→', finalUrl);
    }
  }
  
  return originalXHROpen.call(this, method, finalUrl, async, user, password);
};

console.log('🎯 API Interceptor Successfully Loaded');
