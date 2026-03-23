import http from './http';
import type { ApiResponse, ClusterDetail, ClusterSummary, UserInfo } from '@/types';

export function loginApi(payload: { username: string; password: string }) {
  return http.post<never, ApiResponse<{ token: string; userInfo: UserInfo }>>('/api/login', payload);
}

export function fetchClustersApi() {
  return http.get<never, ApiResponse<ClusterSummary[]>>('/api/clusters');
}

export function fetchClusterDetailApi(id: string) {
  return http.get<never, ApiResponse<ClusterDetail>>(`/api/clusters/${id}`);
}

export function restartClusterApi(id: string) {
  return http.post<never, ApiResponse<ClusterDetail>>(`/api/clusters/${id}/restart`);
}

export function stopClusterApi(id: string) {
  return http.post<never, ApiResponse<ClusterDetail>>(`/api/clusters/${id}/stop`);
}

export function exportClusterConfigApi(id: string) {
  return http.post<never, ApiResponse<{ objectName: string; downloadUrl: string }>>(`/api/clusters/${id}/export-config`);
}
