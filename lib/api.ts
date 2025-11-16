/**
 * Get the API base URL
 * In development, uses localhost. In production, uses the backend URL from environment variable.
 */
export function getApiUrl(): string {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // In browser, use environment variable or default to backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://the-chanakya-academy.onrender.com'
    return backendUrl
  }
  
  // On server side, use environment variable or default
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://the-chanakya-academy.onrender.com'
  return backendUrl
}

/**
 * Helper function to make API calls
 * Automatically prepends the backend URL to relative paths
 */
export function apiUrl(path: string): string {
  const baseUrl = getApiUrl()
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}/${cleanPath}`
}

