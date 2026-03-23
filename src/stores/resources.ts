import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  DeploymentResource,
  NamespaceResource,
  PodResource,
  ResourceOverview,
  ServiceResource,
} from '@/types';
import {
  createDeploymentApi,
  createServiceApi,
  deleteDeploymentApi,
  deletePodApi,
  fetchDeploymentsApi,
  fetchNamespacesApi,
  fetchPodsApi,
  fetchResourceOverviewApi,
  fetchServicesApi,
  restartPodApi,
  scaleDeploymentApi,
} from '@/api/resource';

export const useResourceStore = defineStore('resources', () => {
  const activeClusterId = ref('');
  const overview = ref<ResourceOverview | null>(null);
  const namespaces = ref<NamespaceResource[]>([]);
  const deployments = ref<DeploymentResource[]>([]);
  const pods = ref<PodResource[]>([]);
  const services = ref<ServiceResource[]>([]);
  const loading = ref(false);

  async function loadResources(clusterId: string, namespace = 'all') {
    activeClusterId.value = clusterId;
    loading.value = true;

    try {
      const [overviewRes, namespacesRes, deploymentsRes, podsRes, servicesRes] = await Promise.all([
        fetchResourceOverviewApi(clusterId),
        fetchNamespacesApi(clusterId),
        fetchDeploymentsApi(clusterId, namespace),
        fetchPodsApi(clusterId, namespace),
        fetchServicesApi(clusterId, namespace),
      ]);

      overview.value = overviewRes.data;
      namespaces.value = namespacesRes.data;
      deployments.value = deploymentsRes.data;
      pods.value = podsRes.data;
      services.value = servicesRes.data;
    } finally {
      loading.value = false;
    }
  }

  async function reload(namespace = 'all') {
    if (!activeClusterId.value) {
      return;
    }

    await loadResources(activeClusterId.value, namespace);
  }

  async function createDeployment(payload: {
    clusterId: string;
    namespace: string;
    name: string;
    image: string;
    replicas: number;
  }) {
    await createDeploymentApi(payload);
    await loadResources(payload.clusterId, payload.namespace || 'all');
  }

  async function scaleDeployment(deploymentId: string, payload: { clusterId: string; replicas: number }, namespace = 'all') {
    await scaleDeploymentApi(deploymentId, payload);
    await loadResources(payload.clusterId, namespace);
  }

  async function deleteDeployment(deploymentId: string, clusterId: string, namespace = 'all') {
    await deleteDeploymentApi(deploymentId, { clusterId });
    await loadResources(clusterId, namespace);
  }

  async function restartPod(podId: string, clusterId: string, namespace = 'all') {
    await restartPodApi(podId, { clusterId });
    await loadResources(clusterId, namespace);
  }

  async function deletePod(podId: string, clusterId: string, namespace = 'all') {
    await deletePodApi(podId, { clusterId });
    await loadResources(clusterId, namespace);
  }

  async function createService(payload: {
    clusterId: string;
    namespace: string;
    name: string;
    type: ServiceResource['type'];
    ports: string;
    selector: string;
  }) {
    await createServiceApi(payload);
    await loadResources(payload.clusterId, payload.namespace || 'all');
  }

  return {
    activeClusterId,
    overview,
    namespaces,
    deployments,
    pods,
    services,
    loading,
    loadResources,
    reload,
    createDeployment,
    scaleDeployment,
    deleteDeployment,
    restartPod,
    deletePod,
    createService,
  };
});
