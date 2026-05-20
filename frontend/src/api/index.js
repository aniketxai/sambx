const BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5001' : null);

function getBaseUrl() {
  if (!BASE) {
    throw new Error('VITE_API_URL is missing. Set it to your deployed backend URL.');
  }

  return BASE;
}

function buildUrl(path, params = {}) {
  const url = new URL(path, getBaseUrl());
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

export async function fetchProducts({ category, q, sort } = {}) {
  const url = buildUrl('/api/products', { category, q, sort });
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.data || [];
}

export async function fetchProductById(id) {
  const res = await fetch(`${getBaseUrl()}/api/products/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return data.data;
}

export async function fetchCategories() {
  const res = await fetch(`${getBaseUrl()}/api/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.data || [];
}

export async function fetchHomeData() {
  const res = await fetch(`${getBaseUrl()}/api/products/home`);
  if (!res.ok) throw new Error('Failed to fetch home data');
  const data = await res.json();
  return data.data || {};
}

export async function postContact(payload) {
  const res = await fetch(`${getBaseUrl()}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return res.json();
}

export async function postQuote(payload) {
  const res = await fetch(`${getBaseUrl()}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit quote');
  return res.json();
}

export async function postOrder(payload) {
  const res = await fetch(`${getBaseUrl()}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export default { fetchProducts, fetchProductById, fetchCategories, fetchHomeData, postContact, postQuote, postOrder };
