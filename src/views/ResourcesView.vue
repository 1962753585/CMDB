<template>
  <section class="resource-page">
    <header class="resource-hero">
      <div>
        <p class="resource-hero__eyebrow">Kubernetes Resource Control</p>
        <h2>K8S 资源管理</h2>
        <p class="resource-hero__desc">
          登录后可在指定集群中查看并管理 Namespace、Deployment、Pod 与 Service，所有操作由前端 Mock API 模拟。
        </p>
      </div>

      <div class="resource-toolbar">
        <el-select v-model="selectedClusterId" placeholder="选择集群" size="large" @change="handleClusterChange">
          <el-option v-for="cluster in clusters" :key="cluster.id" :label="cluster.name" :value="cluster.id" />
        </el-select>
        <el-select v-model="selectedNamespace" placeholder="命名空间" size="large" @change="handleNamespaceChange">
          <el-option label="全部命名空间" value="all" />
          <el-option v-for="item in resourceStore.namespaces" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
        <el-button plain @click="reload">刷新资源</el-button>
      </div>
    </header>

    <div class="overview-grid" v-if="resourceStore.overview">
      <el-card shadow="never">
        <span class="overview-label">Namespaces</span>
        <strong>{{ resourceStore.overview.namespaces }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="overview-label">Deployments</span>
        <strong>{{ resourceStore.overview.deployments }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="overview-label">Pods</span>
        <strong>{{ resourceStore.overview.pods }}</strong>
      </el-card>
      <el-card shadow="never">
        <span class="overview-label">Unhealthy Pods</span>
        <strong>{{ resourceStore.overview.unhealthyPods }}</strong>
      </el-card>
    </div>

    <el-tabs v-model="activeTab" class="resource-tabs">
      <el-tab-pane label="Namespaces" name="namespaces">
        <el-card shadow="never">
          <el-table :data="resourceStore.namespaces" v-loading="resourceStore.loading">
            <el-table-column prop="name" label="命名空间" min-width="180" />
            <el-table-column prop="status" label="状态" width="120" />
            <el-table-column prop="deploymentCount" label="Deployment 数" width="140" />
            <el-table-column prop="podCount" label="Pod 数" width="100" />
            <el-table-column prop="createdAt" label="创建时间" min-width="180" />
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="Deployments" name="deployments">
        <el-card shadow="never">
          <template #header>
            <div class="card-head">
              <span>Deployment 管理</span>
              <el-button type="primary" @click="deploymentDialogVisible = true">新建 Deployment</el-button>
            </div>
          </template>

          <el-table :data="resourceStore.deployments" v-loading="resourceStore.loading">
            <el-table-column prop="name" label="名称" min-width="160" />
            <el-table-column prop="namespace" label="命名空间" min-width="130" />
            <el-table-column prop="image" label="镜像" min-width="220" show-overflow-tooltip />
            <el-table-column label="副本" width="110">
              <template #default="{ row }">
                {{ row.availableReplicas }}/{{ row.replicas }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120" />
            <el-table-column prop="createdAt" label="创建时间" min-width="180" />
            <el-table-column label="操作" width="220" fixed="right">
              <template #default="{ row }">
                <div class="table-actions">
                  <el-button link type="warning" @click="openScaleDialog(row)">扩缩容</el-button>
                  <el-button link type="danger" @click="handleDeleteDeployment(row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="Pods" name="pods">
        <el-card shadow="never">
          <el-table :data="resourceStore.pods" v-loading="resourceStore.loading">
            <el-table-column prop="name" label="Pod 名称" min-width="200" />
            <el-table-column prop="namespace" label="命名空间" width="130" />
            <el-table-column prop="status" label="状态" width="150" />
            <el-table-column prop="node" label="节点" min-width="130" />
            <el-table-column prop="ip" label="IP" min-width="130" />
            <el-table-column prop="restarts" label="重启次数" width="100" />
            <el-table-column prop="owner" label="所属资源" width="140" />
            <el-table-column label="操作" width="220" fixed="right">
              <template #default="{ row }">
                <div class="table-actions">
                  <el-button link type="warning" @click="handleRestartPod(row.id)">重启</el-button>
                  <el-button link type="danger" @click="handleDeletePod(row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="Services" name="services">
        <el-card shadow="never">
          <template #header>
            <div class="card-head">
              <span>Service 管理</span>
              <el-button type="primary" @click="serviceDialogVisible = true">新建 Service</el-button>
            </div>
          </template>

          <el-table :data="resourceStore.services" v-loading="resourceStore.loading">
            <el-table-column prop="name" label="名称" min-width="160" />
            <el-table-column prop="namespace" label="命名空间" width="130" />
            <el-table-column prop="type" label="类型" width="120" />
            <el-table-column prop="clusterIP" label="ClusterIP" min-width="140" />
            <el-table-column prop="ports" label="端口映射" min-width="180" />
            <el-table-column prop="selector" label="Selector" min-width="140" />
            <el-table-column prop="createdAt" label="创建时间" min-width="180" />
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="deploymentDialogVisible" title="新建 Deployment" width="520px">
      <el-form label-position="top" :model="deploymentForm">
        <el-form-item label="名称">
          <el-input v-model="deploymentForm.name" placeholder="例如 order-gateway" />
        </el-form-item>
        <el-form-item label="命名空间">
          <el-input v-model="deploymentForm.namespace" placeholder="例如 default" />
        </el-form-item>
        <el-form-item label="镜像">
          <el-input v-model="deploymentForm.image" placeholder="例如 nginx:1.27" />
        </el-form-item>
        <el-form-item label="副本数">
          <el-input-number v-model="deploymentForm.replicas" :min="0" :max="20" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="deploymentDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateDeployment">创建</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="serviceDialogVisible" title="新建 Service" width="520px">
      <el-form label-position="top" :model="serviceForm">
        <el-form-item label="名称">
          <el-input v-model="serviceForm.name" />
        </el-form-item>
        <el-form-item label="命名空间">
          <el-input v-model="serviceForm.namespace" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="serviceForm.type">
            <el-option label="ClusterIP" value="ClusterIP" />
            <el-option label="NodePort" value="NodePort" />
            <el-option label="LoadBalancer" value="LoadBalancer" />
          </el-select>
        </el-form-item>
        <el-form-item label="端口映射">
          <el-input v-model="serviceForm.ports" placeholder="例如 80/TCP -> 8080" />
        </el-form-item>
        <el-form-item label="Selector">
          <el-input v-model="serviceForm.selector" placeholder="例如 app=order-gateway" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="serviceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateService">创建</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="scaleDialogVisible" title="Deployment 扩缩容" width="420px">
      <el-form label-position="top">
        <el-form-item label="副本数">
          <el-input-number v-model="scaleReplicas" :min="0" :max="20" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scaleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleScaleDeployment">应用</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';
import { useResourceStore } from '@/stores/resources';
import type { DeploymentResource, ServiceResource } from '@/types';

const route = useRoute();
const router = useRouter();
const clusterStore = useClusterStore();
const resourceStore = useResourceStore();

const activeTab = ref('deployments');
const selectedNamespace = ref('all');
const selectedClusterId = ref('');
const deploymentDialogVisible = ref(false);
const serviceDialogVisible = ref(false);
const scaleDialogVisible = ref(false);
const currentDeployment = ref<DeploymentResource | null>(null);
const scaleReplicas = ref(1);

const deploymentForm = reactive({
  name: '',
  namespace: 'default',
  image: 'nginx:1.27',
  replicas: 1,
});

const serviceForm = reactive<{
  name: string;
  namespace: string;
  type: ServiceResource['type'];
  ports: string;
  selector: string;
}>({
  name: '',
  namespace: 'default',
  type: 'ClusterIP',
  ports: '80/TCP -> 8080',
  selector: 'app=demo',
});

const clusters = computed(() => clusterStore.list);

onMounted(async () => {
  await clusterStore.fetchList();
  const preferredClusterId = (route.query.clusterId as string) || clusters.value[0]?.id || '';

  if (!preferredClusterId) {
    return;
  }

  selectedClusterId.value = preferredClusterId;
  await resourceStore.loadResources(preferredClusterId, selectedNamespace.value);
});

async function handleClusterChange(clusterId: string) {
  selectedNamespace.value = 'all';
  await resourceStore.loadResources(clusterId, selectedNamespace.value);
  router.replace({ path: '/resources', query: { clusterId } });
}

async function handleNamespaceChange() {
  if (!selectedClusterId.value) {
    return;
  }

  await resourceStore.loadResources(selectedClusterId.value, selectedNamespace.value);
}

async function reload() {
  if (!selectedClusterId.value) {
    return;
  }

  await resourceStore.loadResources(selectedClusterId.value, selectedNamespace.value);
  ElMessage.success('资源列表已刷新');
}

function resetDeploymentForm() {
  deploymentForm.name = '';
  deploymentForm.namespace = selectedNamespace.value !== 'all' ? selectedNamespace.value : 'default';
  deploymentForm.image = 'nginx:1.27';
  deploymentForm.replicas = 1;
}

async function handleCreateDeployment() {
  if (!selectedClusterId.value || !deploymentForm.name.trim()) {
    ElMessage.warning('请先选择集群并填写 Deployment 名称');
    return;
  }

  await resourceStore.createDeployment({
    clusterId: selectedClusterId.value,
    namespace: deploymentForm.namespace.trim(),
    name: deploymentForm.name.trim(),
    image: deploymentForm.image.trim(),
    replicas: deploymentForm.replicas,
  });

  deploymentDialogVisible.value = false;
  resetDeploymentForm();
  ElMessage.success('Deployment 已创建');
}

async function handleCreateService() {
  if (!selectedClusterId.value || !serviceForm.name.trim()) {
    ElMessage.warning('请先选择集群并填写 Service 名称');
    return;
  }

  await resourceStore.createService({
    clusterId: selectedClusterId.value,
    namespace: serviceForm.namespace.trim(),
    name: serviceForm.name.trim(),
    type: serviceForm.type,
    ports: serviceForm.ports.trim(),
    selector: serviceForm.selector.trim(),
  });

  serviceDialogVisible.value = false;
  ElMessage.success('Service 已创建');
}

function openScaleDialog(row: DeploymentResource) {
  currentDeployment.value = row;
  scaleReplicas.value = row.replicas;
  scaleDialogVisible.value = true;
}

async function handleScaleDeployment() {
  if (!selectedClusterId.value || !currentDeployment.value) {
    return;
  }

  await resourceStore.scaleDeployment(
    currentDeployment.value.id,
    { clusterId: selectedClusterId.value, replicas: scaleReplicas.value },
    selectedNamespace.value,
  );
  scaleDialogVisible.value = false;
  ElMessage.success('Deployment 副本数已更新');
}

async function handleDeleteDeployment(id: string) {
  try {
    await ElMessageBox.confirm('确认删除该 Deployment 吗？关联 Pod 也会一并移除。', '删除 Deployment', {
      type: 'warning',
    });
  } catch {
    return;
  }

  await resourceStore.deleteDeployment(id, selectedClusterId.value, selectedNamespace.value);
  ElMessage.success('Deployment 已删除');
}

async function handleRestartPod(id: string) {
  await resourceStore.restartPod(id, selectedClusterId.value, selectedNamespace.value);
  ElMessage.success('Pod 已重启');
}

async function handleDeletePod(id: string) {
  try {
    await ElMessageBox.confirm('确认删除该 Pod 吗？', '删除 Pod', {
      type: 'warning',
    });
  } catch {
    return;
  }

  await resourceStore.deletePod(id, selectedClusterId.value, selectedNamespace.value);
  ElMessage.success('Pod 已删除');
}
</script>

<style scoped>
.resource-page {
  display: grid;
  gap: 22px;
}

.resource-hero,
.resource-toolbar,
.card-head,
.table-actions {
  display: flex;
  align-items: center;
}

.resource-hero {
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(10, 27, 45, 0.94), rgba(8, 24, 39, 0.62));
  box-shadow: var(--shadow);
}

.resource-hero__eyebrow,
.resource-hero__desc,
.overview-label {
  color: var(--muted);
}

.resource-hero h2 {
  margin: 8px 0 12px;
  font-size: 40px;
}

.resource-hero__desc {
  max-width: 720px;
  margin: 0;
  line-height: 1.7;
}

.resource-toolbar {
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.overview-grid strong {
  display: block;
  margin-top: 10px;
  font-size: 30px;
}

.card-head {
  justify-content: space-between;
}

.table-actions {
  gap: 8px;
}

.resource-tabs :deep(.el-tabs__item) {
  color: #d8e5f6;
}

@media (max-width: 1120px) {
  .resource-hero,
  .overview-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .resource-toolbar {
    justify-content: stretch;
  }
}
</style>
