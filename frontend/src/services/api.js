import {
  CATEGORIES as LOCAL_CATEGORIES,
  NEW_ARRIVALS as LOCAL_NEW_ARRIVALS,
  BEST_SELLERS as LOCAL_BEST_SELLERS,
} from '../data/products';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi
  ? (envApi.endsWith('/api') ? envApi : `${envApi.replace(/\/$/, '')}/api`)
  : '/api';
const TOKEN_KEY = 'aurelian_vip_token';

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
}

/**
 * Robust fetch wrapper with JSON parsing, auth header, and fallback error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    let data;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { message: text || `HTTP error ${res.status}` };
    }

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[API] ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // --- AUTHENTICATION ---
  getToken,

  async login(email, password) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) {
      setToken(res.data.token);
    }
    return res.data;
  },

  async register(userData) {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.data?.token) {
      setToken(res.data.token);
    }
    return res.data;
  },

  async getCurrentUser() {
    const token = getToken();
    if (!token) return null;
    try {
      const res = await request('/auth/me');
      return res.data;
    } catch {
      setToken(null);
      return null;
    }
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    } finally {
      setToken(null);
    }
    return { success: true };
  },

  // --- HEALTH ---
  async checkHealth() {
    try {
      return await request('/health');
    } catch {
      return { status: 'offline' };
    }
  },

  // --- PRODUCTS ---
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.type) query.append('type', params.type);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);

    const qs = query.toString() ? `?${query.toString()}` : '';
    try {
      const res = await request(`/products${qs}`);
      return res.data || [];
    } catch {
      if (params.type === 'new-arrivals') return LOCAL_NEW_ARRIVALS;
      if (params.type === 'best-sellers') return LOCAL_BEST_SELLERS;
      return [...LOCAL_NEW_ARRIVALS, ...LOCAL_BEST_SELLERS];
    }
  },

  async getProductById(id) {
    try {
      const res = await request(`/products/${id}`);
      return res.data;
    } catch {
      return (
        [...LOCAL_NEW_ARRIVALS, ...LOCAL_BEST_SELLERS].find((p) => p.id === id) || null
      );
    }
  },

  // --- CATEGORIES ---
  async getCategories() {
    try {
      const res = await request('/categories');
      return res.data || [];
    } catch {
      return LOCAL_CATEGORIES;
    }
  },

  // --- PROMOS ---
  async validatePromo(code, amount = 0) {
    try {
      const res = await request(
        `/promos/validate?code=${encodeURIComponent(code)}&amount=${amount}`
      );
      return res;
    } catch (err) {
      return {
        success: false,
        valid: false,
        message: err.message || 'Invalid privilege code',
      };
    }
  },

  // --- CART ---
  async getCart(sessionId) {
    try {
      const res = await request(`/cart/${sessionId}`);
      return res.data;
    } catch {
      return null;
    }
  },

  async syncCart(sessionId, items, appliedPromo = null) {
    try {
      const res = await request(`/cart/${sessionId}`, {
        method: 'POST',
        body: JSON.stringify({ items, appliedPromo }),
      });
      return res.data;
    } catch {
      return null;
    }
  },

  // --- ORDERS ---
  async createOrder(orderPayload) {
    return await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  },

  async getOrder(orderId) {
    return await request(`/orders/${orderId}`);
  },

  // --- CONSULTATIONS & BOUTIQUES ---
  async getBoutiques() {
    try {
      const res = await request('/boutiques');
      return res.data || [];
    } catch {
      return [];
    }
  },

  async bookConsultation(data) {
    return await request('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // --- NEWSLETTER ---
  async subscribeNewsletter(email) {
    return await request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, source: 'web_invitation' }),
    });
  },

  // --- PROFILE ---
  async getProfile() {
    try {
      const res = await request('/profile');
      return res.data;
    } catch {
      return null;
    }
  },
};

export default api;
