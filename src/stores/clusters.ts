import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ClusterDetail, ClusterSummary } from '@/types';
import {
  exportClusterConfigApi,
  fetchClusterDetailApi,
  fetchClustersApi,
  restartClusterApi,
  stopClusterApi,
} from '@/api/cluster';
import { detailCacheKey, readStorage, writeStorage } from '@/utils/storage';

export const useClusterStore = defineStore('clusters', () => {
  const list = ref<ClusterSummary[]>([]);
  const detail = ref<ClusterDetail | null>(null);
  const detailLoading = ref(false);
  const listLoading = ref(false);

  async function fetchList() {
    listLoading.value = true;

    try {
      const response = await fetchClustersApi();
      list.value = response.data;
      return response.data;
    } finally {
      listLoading.value = false;
    }
  }

  async function fetchDetail(id: string) {
    detailLoading.value = true;

    try {
      const response = await fetchClusterDetailApi(id);
      detail.value = response.data;
      writeStorage(detailCacheKey(id), response.data);
      syncSummary(response.data);
      return { data: response.data, cacheHit: false };
    } finally {
      detailLoading.value = false;
    }
  }

  async function fetchDetailFromCacheFirst(id: string) {
    const cache = readStorage<ClusterDetail | null>(detailCacheKey(id), null);

    if (cache) {
      detail.value = cache;
      return { data: cache, cacheHit: true };
    }

    return fetchDetail(id);
  }

  function syncSummary(nextDetail: ClusterDetail) {
    const index = list.value.findIndex((item) => item.id === nextDetail.id);
    const summary = {
      id: nextDetail.id,
      name: nextDetail.name,
      version: nextDetail.version,
      nodeCount: nextDetail.nodeCount,
      status: nextDetail.status,
      createdAt: nextDetail.createdAt,
      region: nextDetail.region,
    };

    if (index === -1) {
      list.value.unshift(summary);
      return;
    }

    list.value[index] = summary;
  }

  async function stopCluster(id: string) {
    const response = await stopClusterApi(id);
    detail.value = response.data;
    writeStorage(detailCacheKey(id), response.data);
    syncSummary(response.data);
    return response;
  }

  async function restartCluster(id: string) {
    const response = await restartClusterApi(id);
    detail.value = response.data;
    writeStorage(detailCacheKey(id), response.data);
    syncSummary(response.data);
    return response;
  }

  async function exportConfig(id: string) {
    return exportClusterConfigApi(id);
  }

  return {
    list,
    detail,
    detailLoading,
    listLoading,
    fetchList,
    fetchDetail,
    fetchDetailFromCacheFirst,
    stopCluster,
    restartCluster,
    exportConfig,
  };
});
