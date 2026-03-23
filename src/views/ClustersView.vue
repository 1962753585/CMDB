<template>
  <section class="page">
    <header class="page__hero">
      <div>
        <p class="page__eyebrow">Cluster Fleet Overview</p>
        <h2>集群总览</h2>
        <p class="page__desc">查看当前模拟集群状态，执行重启或停止操作，并进入详情页查看节点、命名空间和配置导出。</p>
      </div>
      <div class="hero-stats">
        <article>
          <strong>{{ clusters.length }}</strong>
          <span>Clusters</span>
        </article>
        <article>
          <strong>{{ runningCount }}</strong>
          <span>Running</span>
        </article>
        <article>
          <strong>{{ stoppedCount }}</strong>
          <span>Stopped</span>
        </article>
      </div>
    </header>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>集群列表</span>
          <el-button plain @click="clusterStore.fetchList()">刷新列表</el-button>
        </div>
      </template>

      <el-table :data="clusters" v-loading="clusterStore.listLoading">
        <el-table-column prop="name" label="集群名称" min-width="180" />
        <el-table-column prop="version" label="版本" width="110" />
        <el-table-column prop="nodeCount" label="节点数" width="96" />
        <el-table-column prop="region" label="区域" min-width="180" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="statusTypeMap[row.status as ClusterStatus]">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" min-width="180" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <div class="action-row">
              <el-button link type="primary" @click="router.push(`/clusters/${row.id}`)">查看详情</el-button>
              <el-button link type="warning" :loading="actionLoading[row.id] === 'restart'" @click="confirmRestart(row.id)">
                重启
              </el-button>
              <el-button link type="danger" :loading="actionLoading[row.id] === 'stop'" @click="confirmStop(row.id)">
                停止
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';
import type { ClusterStatus } from '@/types';

const router = useRouter();
const clusterStore = useClusterStore();
const actionLoading = reactive<Record<string, '' | 'restart' | 'stop'>>({});

const statusTypeMap: Record<ClusterStatus, 'success' | 'warning' | 'danger' | 'info'> = {
  运行中: 'success',
  异常: 'danger',
  已停止: 'info',
};

const clusters = computed(() => clusterStore.list);
const runningCount = computed(() => clusters.value.filter((item) => item.status === '运行中').length);
const stoppedCount = computed(() => clusters.value.filter((item) => item.status === '已停止').length);

onMounted(() => {
  clusterStore.fetchList();
});

async function confirmStop(id: string) {
  try {
    await ElMessageBox.confirm('确认停止当前集群吗？该操作仅为前端模拟。', '停止集群', {
      type: 'warning',
    });
  } catch {
    return;
  }

  actionLoading[id] = 'stop';

  try {
    await clusterStore.stopCluster(id);
    await clusterStore.fetchList();
    ElMessage.success('集群已停止');
  } finally {
    actionLoading[id] = '';
  }
}

async function confirmRestart(id: string) {
  try {
    await ElMessageBox.confirm('确认重启当前集群吗？将模拟重启过程。', '重启集群', {
      type: 'info',
    });
  } catch {
    return;
  }

  actionLoading[id] = 'restart';

  try {
    await clusterStore.restartCluster(id);
    await clusterStore.fetchList();
    ElMessage.success('集群已恢复运行');
  } finally {
    actionLoading[id] = '';
  }
}
</script>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.page__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 420px);
  gap: 18px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(10, 27, 45, 0.94), rgba(10, 25, 40, 0.58));
  box-shadow: var(--shadow);
}

.page__eyebrow,
.page__desc,
.hero-stats span {
  color: var(--muted);
}

.page__hero h2 {
  margin: 8px 0 12px;
  font-size: 42px;
}

.page__desc {
  max-width: 680px;
  margin: 0;
  line-height: 1.7;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.hero-stats article {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(99, 230, 190, 0.06);
}

.hero-stats strong {
  display: block;
  margin-bottom: 8px;
  font-size: 28px;
}

.card-header,
.action-row {
  display: flex;
  align-items: center;
}

.card-header {
  justify-content: space-between;
}

.action-row {
  gap: 8px;
}

@media (max-width: 960px) {
  .page__hero,
  .hero-stats {
    grid-template-columns: 1fr;
  }
}
</style>
