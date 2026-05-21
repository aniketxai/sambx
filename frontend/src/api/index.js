const BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5002' : null);
const REQUEST_TIMEOUT_MS = 12000;

function getBaseUrl() {
  if (!BASE) {
    throw new Error('VITE_API_URL is missing. Set it to your deployed backend URL.');
  }

  return BASE.replace(/\/+$/, '');
}

function buildUrl(path, params = {}) {
  const url = new URL(path, getBaseUrl());
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function requestJson(path, { method = 'GET', body, params } = {}) {
  const res = await fetchWithTimeout(buildUrl(path, params), {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = 'Request failed';

    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
      message = res.statusText || message;
    }

    throw new Error(message);
  }

  return res.json();
}

export async function fetchProducts({ category, q, sort } = {}) {
  const url = buildUrl('/api/products', { category, q, sort });
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.data || [];
}

export async function fetchProductById(id) {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/products/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return data.data;
}

export async function fetchCategories() {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.data || [];
}

export async function fetchHomeData() {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/products/home`);
  if (!res.ok) throw new Error('Failed to fetch home data');
  const data = await res.json();
  return data.data || {};
}

export async function fetchAdminSummary() {
  const data = await requestJson('/api/admin/summary');
  return data.data || {};
}

export async function fetchAdminProducts(params = {}) {
  const data = await requestJson('/api/admin/products', { params });
  return data.data || [];
}

export async function createAdminProduct(payload) {
  return requestJson('/api/admin/products', { method: 'POST', body: payload });
}

export async function updateAdminProduct(id, payload) {
  return requestJson(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PUT', body: payload });
}

export async function deleteAdminProduct(id) {
  return requestJson(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function fetchAdminOrders(params = {}) {
  const data = await requestJson('/api/admin/orders', { params });
  return data.data || [];
}

export async function updateOrderStatus(id, status) {
  return requestJson(`/api/admin/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

export async function fetchAdminQuotes(params = {}) {
  const data = await requestJson('/api/admin/quotes', { params });
  return data.data || [];
}

export async function updateQuoteStatus(id, status) {
  return requestJson(`/api/admin/quotes/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

export async function fetchAdminContacts(params = {}) {
  const data = await requestJson('/api/admin/contacts', { params });
  return data.data || [];
}

export async function updateContactStatus(id, status) {
  return requestJson(`/api/admin/contacts/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

export async function postContact(payload) {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return res.json();
}

export async function postQuote(payload) {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit quote');
  return res.json();
}

export async function postOrder(payload) {
  const res = await fetchWithTimeout(`${getBaseUrl()}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export default {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchHomeData,
  postContact,
  postQuote,
  postOrder,
  fetchAdminSummary,
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  fetchAdminOrders,
  updateOrderStatus,
  fetchAdminQuotes,
  updateQuoteStatus,
  fetchAdminContacts,
  updateContactStatus,
};
