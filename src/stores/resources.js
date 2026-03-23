import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createDeploymentApi, createServiceApi, deleteDeploymentApi, deletePodApi, fetchDeploymentsApi, fetchNamespacesApi, fetchPodsApi, fetchResourceOverviewApi, fetchServicesApi, restartPodApi, scaleDeploymentApi, } from '@/api/resource';
export const useResourceStore = defineStore('resources', () => {
    const activeClusterId = ref('');
    const overview = ref(null);
    const namespaces = ref([]);
    const deployments = ref([]);
    const pods = ref([]);
    const services = ref([]);
    const loading = ref(false);
    async function loadResources(clusterId, namespace = 'all') {
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
        }
        finally {
            loading.value = false;
        }
    }
    async function reload(namespace = 'all') {
        if (!activeClusterId.value) {
            return;
        }
        await loadResources(activeClusterId.value, namespace);
    }
    async function createDeployment(payload) {
        await createDeploymentApi(payload);
        await loadResources(payload.clusterId, payload.namespace || 'all');
    }
    async function scaleDeployment(deploymentId, payload, namespace = 'all') {
        await scaleDeploymentApi(deploymentId, payload);
        await loadResources(payload.clusterId, namespace);
    }
    async function deleteDeployment(deploymentId, clusterId, namespace = 'all') {
        await deleteDeploymentApi(deploymentId, { clusterId });
        await loadResources(clusterId, namespace);
    }
    async function restartPod(podId, clusterId, namespace = 'all') {
        await restartPodApi(podId, { clusterId });
        await loadResources(clusterId, namespace);
    }
    async function deletePod(podId, clusterId, namespace = 'all') {
        await deletePodApi(podId, { clusterId });
        await loadResources(clusterId, namespace);
    }
    async function createService(payload) {
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
