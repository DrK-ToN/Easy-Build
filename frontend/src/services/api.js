const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function getToken() {
    return localStorage.getItem('eb_token');
}

export function setToken(token) {
    if (token) {
        localStorage.setItem('eb_token', token);
    } else {
        localStorage.removeItem('eb_token');
    }
}

export function getUserFromToken() {
    const token = getToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch {
        return null;
    }
}

async function request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_URL}${cleanEndpoint}`;

    const res = await fetch(url, {
        ...options,
        headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message = data.error || data.erro || `Erro ${res.status}: ${res.statusText}`;
        throw new Error(message);
    }

    return data;
}

export const api = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
    url: API_URL,
};

export default api;
