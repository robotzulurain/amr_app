// Comprehensive fetch interceptor to fix ALL API URLs
console.log('🔧 Fetch interceptor loaded');

const originalFetch = window.fetch;
window.fetch = function(url, options) {
  let finalUrl = url;
  
  if (typeof url === 'string') {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
    
    // Fix patterns: /api/..., api/..., fetch("/api/..."), fetch('/api/...')
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🔧 Fixed API URL:', finalUrl);
    } else if (url.startsWith('api/')) {
      finalUrl = baseUrl + '/' + url;
      console.log('🔧 Fixed API URL:', finalUrl);
    }
  }
  
  return originalFetch(finalUrl, options);
};

// Also intercept axios if used
if (typeof window.axios !== 'undefined') {
  console.log('🔧 Axios interceptor loaded');
  const originalAxiosRequest = window.axios.request;
  window.axios.request = function(config) {
    if (config.url) {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
      
      if (config.url.startsWith('/api/')) {
        config.url = baseUrl + config.url;
        console.log('🔧 Fixed Axios URL:', config.url);
      } else if (config.url.startsWith('api/')) {
        config.url = baseUrl + '/' + config.url;
        console.log('🔧 Fixed Axios URL:', config.url);
      }
    }
    return originalAxiosRequest(config);
  };
}

// Override XMLHttpRequest if needed
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  let finalUrl = url;
  
  if (typeof url === 'string') {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://amrthabo.onrender.com';
    
    if (url.startsWith('/api/')) {
      finalUrl = baseUrl + url;
      console.log('🔧 Fixed XHR URL:', finalUrl);
    } else if (url.startsWith('api/')) {
      finalUrl = baseUrl + '/' + url;
      console.log('🔧 Fixed XHR URL:', finalUrl);
    }
  }
  
  return originalXHROpen.call(this, method, finalUrl, ...args);
};
