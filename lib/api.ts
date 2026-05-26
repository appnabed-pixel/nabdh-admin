const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  stats: () => req<Record<string, number>>('/api/stats'),
  places: (params?: string) => req<any>(`/api/places${params ? '?' + params : ''}`),
  togglePlace: (id: string) => req<any>(`/api/places/${id}/toggle`, { method: 'PATCH' }),
  deletePlace: (id: string) => req<any>(`/api/places/${id}`, { method: 'DELETE' }),
  crowd: (status?: string) => req<any>(`/api/crowd${status ? '?status=' + status : ''}`),
  approveCrowd: (id: string) => req<any>(`/api/crowd/${id}/approve`, { method: 'PATCH' }),
  deleteCrowd: (id: string) => req<any>(`/api/crowd/${id}`, { method: 'DELETE' }),
  users: (search?: string) => req<any>(`/api/users${search ? '?search=' + search : ''}`),
  banUser: (id: string) => req<any>(`/api/users/${id}/ban`, { method: 'PATCH' }),
  feed: (status?: string) => req<any>(`/api/feed${status ? '?status=' + status : ''}`),
  approveFeed: (id: string) => req<any>(`/api/feed/${id}/approve`, { method: 'PATCH' }),
  deleteFeed: (id: string) => req<any>(`/api/feed/${id}`, { method: 'DELETE' }),
};
