/**
 * Minimal API client for the EKYC frontend.
 * Reads base URL from REACT_APP_API_BASE (fallback REACT_APP_BACKEND_URL).
 */

const getBaseUrl = () => {
  const base = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
  return base.replace(/\/+$/, '');
};

// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /** Generic JSON API request with error handling. */
  const base = getBaseUrl();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch (err) {
    throw new Error(`Network error contacting backend: ${err?.message || err}`);
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const message = (payload && (payload.message || payload.detail)) || res.statusText || 'Unknown error';
    const error = new Error(`API ${res.status} ${message}`);
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

// PUBLIC_INTERFACE
export function getWsUrl() {
  /** Returns the WebSocket base URL from env when required in future updates. */
  return process.env.REACT_APP_WS_URL || '';
}
