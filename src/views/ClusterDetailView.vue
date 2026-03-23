<template>
  <section class="detail-page" v-loading="clusterStore.detailLoading">
    <div class="detail-page__top">
      <div>
        <el-button text @click="router.push('/clusters')">返回集群列表</el-button>
        <h2>{{ detail?.name ?? '加载中...' }}</h2>
        <p class="detail-page__desc">
          {{ detail?.provider }} · {{ detail?.apiServer }}
        </p>
      </div>

      <div class="detail-actions">
        <el-button plain @click="router.push(`/resources?clusterId=${clusterId}`)">资源管理</el-button>
        <el-button type="primary" :loading="actionLoading === 'restart'" @click="handleRestart">重启集群</el-button>
        <el-button type="danger" plain :loading="actionLoading === 'stop'" @click="handleStop">停止集群</el-button>
        <el-button plain :loading="exporting" @click="handleExport">导出集群配置</el-button>
      </div>
    </div>

    <el-alert
      v-if="cacheNotice"
      :title="cacheNotice"
      type="success"
      :closable="false"
      show-icon
    />

    <div class="metric-grid" v-if="detail">
      <el-card shadow="never">
        <span class="metric-label">版本</span>
        <strong>{{ detail.version }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="metric-label">节点数</span>
        <strong>{{ detail.nodeCount }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="metric-label">状态</span>
        <strong>{{ detail.status }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="metric-label">创建时间</span>
        <strong>{{ detail.createdAt }}</strong>
      </el-card>
    </div>

    <div class="detail-grid" v-if="detail">
      <el-card shadow="never">
        <template #header>
          <div class="card-head">
            <span>节点列表</span>
            <el-tag>{{ detail.nodes.length }} nodes</el-tag>
          </div>
        </template>
        <el-table :data="detail.nodes">
          <el-table-column prop="name" label="节点名称" min-width="160" />
          <el-table-column prop="ip" label="IP" min-width="130" />
          <el-table-column prop="role" label="角色" width="110" />
          <el-table-column prop="status" label="状态" width="120" />
          <el-table-column prop="cpuUsage" label="CPU" width="90" />
          <el-table-column prop="memoryUsage" label="内存" width="90" />
        </el-table>
      </el-card>

      <div class="detail-column">
        <el-card shadow="never">
          <template #header>
            <span>命名空间</span>
          </template>
          <div class="namespace-wrap">
            <el-tag v-for="namespace in detail.namespaceList" :key="namespace" type="info" effect="plain">
              {{ namespace }}
            </el-tag>
          </div>
        </el-card>

        <el-card shadow="never">
          <template #header>
            <span>配置摘要</span>
          </template>
          <pre class="config-block">{{ JSON.stringify(detail.config, null, 2) }}</pre>
          <div v-if="downloadUrl" class="download-box">
            <span>MinIO 下载链接</span>
            <a :href="downloadUrl" target="_blank" rel="noreferrer">{{ downloadUrl }}</a>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';

const route = useRoute();
const router = useRouter();
const clusterStore = useClusterStore();

const actionLoading = ref<'restart' | 'stop' | ''>('');
const exporting = ref(false);
const cacheNotice = ref('');
const downloadUrl = ref('');
const clusterId = computed(() => route.params.id as string);
const detail = computed(() => clusterStore.detail);

onMounted(async () => {
  const result = await clusterStore.fetchDetailFromCacheFirst(clusterId.value);

  if (result.cacheHit) {
    cacheNotice.value = 'Redis 缓存命中，详情已从本地缓存快速加载。';
    clusterStore.fetchDetail(clusterId.value);
  } else {
    cacheNotice.value = '首次加载已模拟从 Redis 缓存读取，并写入本地缓存。';
  }
});

async function handleStop() {
  try {
    await ElMessageBox.confirm('确认停止该集群吗？', '停止集群', { type: 'warning' });
  } catch {
    return;
  }

  actionLoading.value = 'stop';

  try {
    await clusterStore.stopCluster(clusterId.value);
    await clusterStore.fetchList();
    ElMessage.success('集群已停止');
  } finally {
    actionLoading.value = '';
  }
}

async function handleRestart() {
  try {
    await ElMessageBox.confirm('确认重启该集群吗？', '重启集群', { type: 'info' });
  } catch {
    return;
  }

  actionLoading.value = 'restart';

  try {
    await clusterStore.restartCluster(clusterId.value);
    await clusterStore.fetchList();
    ElMessage.success('集群已恢复运行');
  } finally {
    actionLoading.value = '';
  }
}

async function handleExport() {
  exporting.value = true;

  try {
    const response = await clusterStore.exportConfig(clusterId.value);
    downloadUrl.value = response.data.downloadUrl;
    ElMessage.success(response.message);
  } finally {
    exporting.value = false;
  }
}
</script>

<style scoped>
.detail-page {
  display: grid;
  gap: 20px;
}

.detail-page__top,
.detail-grid {
  display: grid;
  gap: 18px;
}

.detail-page__top {
  grid-template-columns: minmax(0, 1fr) auto;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(10, 27, 45, 0.94), rgba(10, 25, 40, 0.58));
}

.detail-page__top h2 {
  margin: 6px 0 8px;
  font-size: 38px;
}

.detail-page__desc,
.metric-label {
  color: var(--muted);
}

.detail-actions {
  display: flex;
  gap: 12px;
  align-items: start;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.metric-grid strong {
  display: block;
  margin-top: 12px;
  font-size: 28px;
}

.detail-grid {
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.8fr);
}

.detail-column {
  display: grid;
  gap: 18px;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.namespace-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.config-block {
  margin: 0;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: auto;
  color: #d8e5f6;
  background: rgba(4, 12, 22, 0.8);
}

.download-box {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid rgba(99, 230, 190, 0.2);
  border-radius: 16px;
  background: rgba(99, 230, 190, 0.06);
}

.download-box a {
  color: #7dd3fc;
  word-break: break-all;
}

@media (max-width: 1120px) {
  .detail-page__top,
  .detail-grid,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    flex-wrap: wrap;
  }
}
</style>
