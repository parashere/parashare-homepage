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

export interface PublicActivity {
  event_type: "rent" | "return";
  stand_name: string;
  occurred_at: string;
}

export interface PublicDashboard {
  stands: number;
  total_capacity: number;
  total_parasols: number;
  available: number;
  active_rentals: number;
  rentals_today: number;
  returns_today: number;
  recent_activity: PublicActivity[];
  updated_at: string;
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

export async function fetchPublicDashboard(signal?: AbortSignal): Promise<PublicDashboard> {
  const response = await fetch(`${API_BASE_URL}/public/dashboard`, { signal });
  if (!response.ok) {
    throw new Error(`利用状況の取得に失敗しました (${response.status})`);
  }

  const payload = (await response.json()) as ApiResponse<PublicDashboard>;
  return payload.data;
}
