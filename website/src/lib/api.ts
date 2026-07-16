const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export interface Stand {
  stand_id: string;
  name: string;
  version: string;
  capacity: number;
  available: number;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export async function fetchStands(signal?: AbortSignal): Promise<Stand[]> {
  const response = await fetch(`${API_BASE_URL}/stands/list`, { signal });
  if (!response.ok) {
    throw new Error(`スタンド情報の取得に失敗しました (${response.status})`);
  }

  const payload = (await response.json()) as ApiResponse<Stand[]>;
  return payload.data;
}
