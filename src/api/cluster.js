import http from './http';
export function loginApi(payload) {
    return http.post('/api/login', payload);
}
export function fetchClustersApi() {
    return http.get('/api/clusters');
}
export function fetchClusterDetailApi(id) {
    return http.get(`/api/clusters/${id}`);
}
export function restartClusterApi(id) {
    return http.post(`/api/clusters/${id}/restart`);
}
export function stopClusterApi(id) {
    return http.post(`/api/clusters/${id}/stop`);
}
export function exportClusterConfigApi(id) {
    return http.post(`/api/clusters/${id}/export-config`);
}
