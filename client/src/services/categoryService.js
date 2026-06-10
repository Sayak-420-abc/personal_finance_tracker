import api from './api';

export async function getAll() {
  const { data } = await api.get('/api/categories');
  return data;
}

export async function create(categoryData) {
  const { data } = await api.post('/api/categories', categoryData);
  return data;
}

export async function update(id, categoryData) {
  const { data } = await api.put(`/api/categories/${id}`, categoryData);
  return data;
}

export async function remove(id) {
  const { data } = await api.delete(`/api/categories/${id}`);
  return data;
}
