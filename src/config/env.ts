export const env = {
  API_AUTH: import.meta.env.VITE_API_AUTH || 'http://localhost:8080',
  API_USER: import.meta.env.VITE_API_USER || 'http://localhost:8081', 
  API_COURSE: import.meta.env.VITE_API_COURSE || 'http://localhost:8082',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Sahasik',
} as const;