import http from './http';
import type {
  ApiResponse,
  DeploymentResource,
  NamespaceResource,
  PodResource,
  ResourceOverview,
  ServiceResource,
} from '@/types';

export function fetchResourceOverviewApi(clusterId: string) {
  return http.get<never, ApiResponse<ResourceOverview>>(`/api/resources/overview?clusterId=${clusterId}`);
}

export function fetchNamespacesApi(clusterId: string) {
  return http.get<never, ApiResponse<NamespaceResource[]>>(`/api/resources/namespaces?clusterId=${clusterId}`);
}

export function fetchDeploymentsApi(clusterId: string, namespace = 'all') {
  return http.get<never, ApiResponse<DeploymentResource[]>>(
    `/api/resources/deployments?clusterId=${clusterId}&namespace=${namespace}`,
  );
}

export function createDeploymentApi(payload: {
  clusterId: string;
  namespace: string;
  name: string;
  image: string;
  replicas: number;
}) {
  return http.post<never, ApiResponse<DeploymentResource>>('/api/resources/deployments', payload);
}

export function scaleDeploymentApi(deploymentId: string, payload: { clusterId: string; replicas: number }) {
  return http.post<never, ApiResponse<DeploymentResource>>(`/api/resources/deployments/${deploymentId}/scale`, payload);
}

export function deleteDeploymentApi(deploymentId: string, payload: { clusterId: string }) {
  return http.post<never, ApiResponse<boolean>>(`/api/resources/deployments/${deploymentId}/delete`, payload);
}

export function fetchPodsApi(clusterId: string, namespace = 'all') {
  return http.get<never, ApiResponse<PodResource[]>>(`/api/resources/pods?clusterId=${clusterId}&namespace=${namespace}`);
}

export function restartPodApi(podId: string, payload: { clusterId: string }) {
  return http.post<never, ApiResponse<PodResource>>(`/api/resources/pods/${podId}/restart`, payload);
}

export function deletePodApi(podId: string, payload: { clusterId: string }) {
  return http.post<never, ApiResponse<boolean>>(`/api/resources/pods/${podId}/delete`, payload);
}

export function fetchServicesApi(clusterId: string, namespace = 'all') {
  return http.get<never, ApiResponse<ServiceResource[]>>(
    `/api/resources/services?clusterId=${clusterId}&namespace=${namespace}`,
  );
}

export function createServiceApi(payload: {
  clusterId: string;
  namespace: string;
  name: string;
  type: ServiceResource['type'];
  ports: string;
  selector: string;
}) {
  return http.post<never, ApiResponse<ServiceResource>>('/api/resources/services', payload);
}
