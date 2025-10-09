// 🎯 AMR API INTERCEPTOR - Enhanced Version
console.log('🚀 AMR API Interceptor Initializing...');

const getApiBase = () => {
  // Use environment variable first, then fallbacks
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Production deployment
  if (window.location.hostname === 'amr-app-umber.vercel.app') {
    return 'https://amrthabo.onrender.com';
  }
  
  // Local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  
  // Default fallback
  return 'https://amrthabo.onrender.com';
};

const API_BASE = getApiBase();
console.log('🎯 API Base URL:', API_BASE);

// Store original fetch
const originalFetch = window.fetch;

// Override fetch
window.fetch = function(url, options = {}) {
  let finalUrl = url;
  
  if (typeof url === 'string') {
    const isAbsoluteUrl = url.startsWith('http');
    const isApiCall = url.includes('/api/');
    
    // Fix relative API URLs
    if (!isAbsoluteUrl && url.startsWith('/api/')) {
      finalUrl = API_BASE + url;
      console.log('🎯 Fixed relative URL:', url, '→', finalUrl);
    }
    // Fix absolute URLs pointing to Vercel
    else if (isAbsoluteUrl && url.includes('amr-app-umber.vercel.app/api/')) {
      finalUrl = url.replace('https://amr-app-umber.vercel.app', API_BASE);
      console.log('🎯 Fixed Vercel URL:', url, '→', finalUrl);
    }
    // Fix API calls without leading slash
    else if (url.startsWith('api/')) {
      finalUrl = API_BASE + '/' + url;
      console.log('🎯 Fixed no-slash URL:', url, '→', finalUrl);
    }
  }
  
  return originalFetch(finalUrl, options);
};

// Intercept XMLHttpRequest for libraries that use it
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
  let finalUrl = url;
  
  if (typeof url === 'string') {
    const isAbsoluteUrl = url.startsWith('http');
    
    if (!isAbsoluteUrl && url.startsWith('/api/')) {
      finalUrl = API_BASE + url;
      console.log('🎯 XHR Fixed:', url, '→', finalUrl);
    }
    else if (isAbsoluteUrl && url.includes('amr-app-umber.vercel.app/api/')) {
      finalUrl = url.replace('https://amr-app-umber.vercel.app', API_BASE);
      console.log('🎯 XHR Fixed Vercel URL:', url, '→', finalUrl);
    }
  }
  
  return originalXHROpen.call(this, method, finalUrl, async, user, password);
};

console.log('✅ AMR API Interceptor Ready! All API calls will be routed to:', API_BASE);
