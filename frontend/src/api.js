// API utility functions
const req = (url, options = {}) => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return fetch(`${base}${url}`, {
    ...options,
    credentials: 'include',
  }).then(r => r.json());
};

// FIXED: Using correct endpoint /api/entry-open instead of /entry
export const createEntry = (json) => req("/api/entry-open", { method: "POST", json });

export const uploadFile = (formData) => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return fetch(`${base}/api/upload/csv`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }).then(r => r.json());
};

export const fetchFacilities = () => req("/api/options").then(r => r.facilities);

// Other API functions...
export const fetchSummary = () => req("/api/summary/counts-summary");
export const fetchTimeTrends = (period) => req(`/api/summary/time-trends?period=${period}`);
export const fetchAntibiogram = (by) => req(`/api/summary/antibiogram?by=${by}`);
export const fetchOptions = () => req("/api/options");
export const fetchSexAge = () => req("/api/summary/sex-age");
export const fetchGeoFacilities = () => req("/api/geo/facilities");
export const fetchReportsSummary = () => req("/api/reports/summary");
export const fetchFacilityLeague = () => req("/api/reports/facility-league");
export const fetchReportsAntibiogram = () => req("/api/reports/antibiogram");
export const fetchAlerts = () => req("/api/alerts");
