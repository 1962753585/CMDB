import http from './http';
export function fetchResourceOverviewApi(clusterId) {
    return http.get(`/api/resources/overview?clusterId=${clusterId}`);
}
export function fetchNamespacesApi(clusterId) {
    return http.get(`/api/resources/namespaces?clusterId=${clusterId}`);
}
export function fetchDeploymentsApi(clusterId, namespace = 'all') {
    return http.get(`/api/resources/deployments?clusterId=${clusterId}&namespace=${namespace}`);
}
export function createDeploymentApi(payload) {
    return http.post('/api/resources/deployments', payload);
}
export function scaleDeploymentApi(deploymentId, payload) {
    return http.post(`/api/resources/deployments/${deploymentId}/scale`, payload);
}
export function deleteDeploymentApi(deploymentId, payload) {
    return http.post(`/api/resources/deployments/${deploymentId}/delete`, payload);
}
export function fetchPodsApi(clusterId, namespace = 'all') {
    return http.get(`/api/resources/pods?clusterId=${clusterId}&namespace=${namespace}`);
}
export function restartPodApi(podId, payload) {
    return http.post(`/api/resources/pods/${podId}/restart`, payload);
}
export function deletePodApi(podId, payload) {
    return http.post(`/api/resources/pods/${podId}/delete`, payload);
}
export function fetchServicesApi(clusterId, namespace = 'all') {
    return http.get(`/api/resources/services?clusterId=${clusterId}&namespace=${namespace}`);
}
export function createServiceApi(payload) {
    return http.post('/api/resources/services', payload);
}
