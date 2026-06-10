import api from './api';

export async function getAll(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.month) params.append('month', filters.month);
  if (filters.category) params.append('category', filters.category);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);

  const { data } = await api.get(`/api/transactions?${params.toString()}`);
  return data;
}

export async function getById(id) {
  const { data } = await api.get(`/api/transactions/${id}`);
  return data;
}

export async function create(txnData) {
  const { data } = await api.post('/api/transactions', txnData);
  return data;
}

export async function update(id, txnData) {
  const { data } = await api.put(`/api/transactions/${id}`, txnData);
  return data;
}

export async function remove(id) {
  const { data } = await api.delete(`/api/transactions/${id}`);
  return data;
}
