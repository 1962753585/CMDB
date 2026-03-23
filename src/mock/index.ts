import Mock from 'mockjs';
import type {
  ClusterDetail,
  DeploymentResource,
  NamespaceResource,
  PodResource,
  ResourceOverview,
  ServiceResource,
  UserInfo,
} from '@/types';
import { loadClusters, resetClustersIfMissing, saveClusters } from './data';

Mock.setup({
  timeout: '300-900',
});

resetClustersIfMissing();

const ok = <T>(data: T, message = 'success') => ({
  code: 200,
  message,
  data,
});

const fail = (message: string, code = 401) => ({
  code,
  message,
  data: null,
});

function encodeToken(username: string) {
  return `eyJhbGciOiJIUzI1NiJ9.${btoa(`${username}:${Date.now()}`)}.mock-signature`;
}

function parseBody(body?: string) {
  return body ? JSON.parse(body) : {};
}

function updateCluster(id: string, updater: (cluster: ClusterDetail) => ClusterDetail) {
  const clusters = loadClusters();
  const index = clusters.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const next = [...clusters];
  next[index] = updater(next[index]);
  saveClusters(next);
  return next[index];
}

function getClusterOrFail(id: string) {
  const cluster = loadClusters().find((item) => item.id === id);

  if (!cluster) {
    return null;
  }

  return cluster;
}

function updateClusterResources(id: string, updater: (cluster: ClusterDetail) => ClusterDetail) {
  return updateCluster(id, updater);
}

function recalcNamespaces(cluster: ClusterDetail): ClusterDetail {
  const namespaceMap = new Map<string, NamespaceResource>();

  cluster.namespaceList.forEach((name) => {
    namespaceMap.set(name, {
      name,
      status: 'Active',
      podCount: 0,
      deploymentCount: 0,
      createdAt: cluster.createdAt,
    });
  });

  cluster.resources.namespaces.forEach((namespace) => {
    namespaceMap.set(namespace.name, { ...namespace, podCount: 0, deploymentCount: 0 });
  });

  cluster.resources.deployments.forEach((deployment) => {
    const current = namespaceMap.get(deployment.namespace);

    if (current) {
      current.deploymentCount += 1;
    }
  });

  cluster.resources.pods.forEach((pod) => {
    const current = namespaceMap.get(pod.namespace);

    if (current) {
      current.podCount += 1;
    }
  });

  const namespaces = Array.from(namespaceMap.values());

  return {
    ...cluster,
    namespaceList: namespaces.map((item) => item.name),
    resources: {
      ...cluster.resources,
      namespaces,
    },
  };
}

function summarizeOverview(cluster: ClusterDetail): ResourceOverview {
  return {
    namespaces: cluster.resources.namespaces.length,
    deployments: cluster.resources.deployments.length,
    pods: cluster.resources.pods.length,
    services: cluster.resources.services.length,
    unhealthyPods: cluster.resources.pods.filter((item) => item.status !== 'Running').length,
  };
}

function resolveQuery(url?: string) {
  const current = new URL(url ?? '/', window.location.origin);
  return current.searchParams;
}

Mock.mock('/api/login', 'post', ({ body }) => {
  const { username, password } = parseBody(body);

  if (username === 'admin' && password === 'admin123') {
    const userInfo: UserInfo = {
      username,
      displayName: 'Platform Administrator',
      role: 'super-admin',
    };

    return ok(
      {
        token: encodeToken(username),
        userInfo,
      },
      'success',
    );
  }

  return fail('用户名或密码错误');
});

Mock.mock('/api/clusters', 'get', () => {
  const clusters = loadClusters().map(({ nodes, namespaceList, config, apiServer, provider, resources, ...summary }) => summary);
  return ok(clusters);
});

Mock.mock(/\/api\/clusters\/[^/]+$/, 'get', ({ url }) => {
  const id = url?.split('/').pop() ?? '';
  const cluster = loadClusters().find((item) => item.id === id);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  return ok(cluster);
});

Mock.mock(/\/api\/clusters\/[^/]+\/stop$/, 'post', ({ url }) => {
  const segments = url?.split('/') ?? [];
  const id = segments[segments.length - 2] ?? '';
  const updated = updateCluster(id, (cluster) => ({
    ...cluster,
    status: '已停止',
    nodes: cluster.nodes.map((node) => ({
      ...node,
      status: 'Maintenance',
      cpuUsage: '0%',
      memoryUsage: '0%',
    })),
  }));

  if (!updated) {
    return fail('停止失败，集群不存在', 404);
  }

  return ok(updated, '操作成功');
});

Mock.mock(/\/api\/clusters\/[^/]+\/restart$/, 'post', ({ url }) => {
  const segments = url?.split('/') ?? [];
  const id = segments[segments.length - 2] ?? '';
  const updated = updateCluster(id, (cluster) => ({
    ...cluster,
    status: '运行中',
    nodes: cluster.nodes.map((node, index) => ({
      ...node,
      status: 'Ready',
      cpuUsage: `${28 + index * 9}%`,
      memoryUsage: `${44 + index * 7}%`,
    })),
  }));

  if (!updated) {
    return fail('重启失败，集群不存在', 404);
  }

  return ok(updated, '操作成功');
});

Mock.mock(/\/api\/clusters\/[^/]+\/export-config$/, 'post', ({ url }) => {
  const segments = url?.split('/') ?? [];
  const id = segments[segments.length - 2] ?? '';
  const cluster = loadClusters().find((item) => item.id === id);

  if (!cluster) {
    return fail('导出失败，集群不存在', 404);
  }

  return ok(
    {
      objectName: `${cluster.name.replace(/\s+/g, '-')}-${Date.now()}.yaml`,
      downloadUrl: `https://minio.example.local/k8s-config/${id}-${Date.now()}.yaml`,
    },
    '文件已存储至 MinIO',
  );
});

Mock.mock(/\/api\/resources\/overview.*/, 'get', ({ url }) => {
  const query = resolveQuery(url);
  const clusterId = query.get('clusterId') ?? '';
  const cluster = getClusterOrFail(clusterId);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  return ok(summarizeOverview(cluster));
});

Mock.mock(/\/api\/resources\/namespaces.*/, 'get', ({ url }) => {
  const query = resolveQuery(url);
  const clusterId = query.get('clusterId') ?? '';
  const cluster = getClusterOrFail(clusterId);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  return ok(cluster.resources.namespaces);
});

Mock.mock(/\/api\/resources\/deployments.*/, 'get', ({ url }) => {
  const query = resolveQuery(url);
  const clusterId = query.get('clusterId') ?? '';
  const namespace = query.get('namespace');
  const cluster = getClusterOrFail(clusterId);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  const items = namespace && namespace !== 'all'
    ? cluster.resources.deployments.filter((item) => item.namespace === namespace)
    : cluster.resources.deployments;

  return ok(items);
});

Mock.mock('/api/resources/deployments', 'post', ({ body }) => {
  const { clusterId, namespace, name, image, replicas } = parseBody(body) as {
    clusterId: string;
    namespace: string;
    name: string;
    image: string;
    replicas: number;
  };

  const updated = updateClusterResources(clusterId, (cluster) => {
    const deployment: DeploymentResource = {
      id: `dp-${name}-${Date.now()}`,
      name,
      namespace,
      image,
      replicas,
      availableReplicas: replicas,
      status: replicas > 0 ? 'Running' : 'Stopped',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    };

    const pods: PodResource[] = Array.from({ length: replicas }).map((_, index) => ({
      id: `pod-${name}-${Date.now()}-${index}`,
      name: `${name}-${Math.random().toString(36).slice(2, 10)}-${index}`,
      namespace,
      status: 'Running',
      node: cluster.nodes[index % Math.max(cluster.nodes.length, 1)]?.name ?? 'virtual-node-01',
      ip: `172.20.${(index % 20) + 1}.${(index % 200) + 10}`,
      restarts: 0,
      owner: name,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    }));

    const namespaces = cluster.namespaceList.includes(namespace)
      ? cluster.namespaceList
      : [...cluster.namespaceList, namespace];

    return recalcNamespaces({
      ...cluster,
      namespaceList: namespaces,
      resources: {
        ...cluster.resources,
        deployments: [deployment, ...cluster.resources.deployments],
        pods: [...pods, ...cluster.resources.pods],
      },
    });
  });

  if (!updated) {
    return fail('创建 Deployment 失败', 404);
  }

  return ok(updated.resources.deployments[0], 'Deployment 创建成功');
});

Mock.mock(/\/api\/resources\/deployments\/[^/]+\/scale$/, 'post', ({ url, body }) => {
  const segments = url?.split('/') ?? [];
  const deploymentId = segments[segments.length - 2] ?? '';
  const { clusterId, replicas } = parseBody(body) as { clusterId: string; replicas: number };
  const updated = updateClusterResources(clusterId, (cluster) => {
    const deployments: DeploymentResource[] = cluster.resources.deployments.map((item) => {
      if (item.id !== deploymentId) {
        return item;
      }

      return {
        ...item,
        replicas,
        availableReplicas: replicas,
        status: replicas > 0 ? 'Running' : 'Stopped',
      };
    });

    const target = deployments.find((item) => item.id === deploymentId);

    if (!target) {
      return cluster;
    }

    const remainingPods = cluster.resources.pods.filter((item) => item.owner !== target.name);
    const nextPods: PodResource[] = Array.from({ length: replicas }).map((_, index) => ({
      id: `pod-${target.name}-${Date.now()}-${index}`,
      name: `${target.name}-${Math.random().toString(36).slice(2, 10)}-${index}`,
      namespace: target.namespace,
      status: replicas > 0 ? 'Running' : 'Succeeded',
      node: cluster.nodes[index % Math.max(cluster.nodes.length, 1)]?.name ?? 'virtual-node-01',
      ip: `172.21.${(index % 20) + 1}.${(index % 200) + 10}`,
      restarts: 0,
      owner: target.name,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    }));

    return recalcNamespaces({
      ...cluster,
      resources: {
        ...cluster.resources,
        deployments,
        pods: [...nextPods, ...remainingPods],
      },
    });
  });

  if (!updated) {
    return fail('扩缩容失败', 404);
  }

  const current = updated.resources.deployments.find((item) => item.id === deploymentId);
  return ok(current, 'Deployment 副本数已更新');
});

Mock.mock(/\/api\/resources\/deployments\/[^/]+\/delete$/, 'post', ({ url, body }) => {
  const segments = url?.split('/') ?? [];
  const deploymentId = segments[segments.length - 2] ?? '';
  const { clusterId } = parseBody(body) as { clusterId: string };
  const updated = updateClusterResources(clusterId, (cluster) => {
    const target = cluster.resources.deployments.find((item) => item.id === deploymentId);

    if (!target) {
      return cluster;
    }

    return recalcNamespaces({
      ...cluster,
      resources: {
        ...cluster.resources,
        deployments: cluster.resources.deployments.filter((item) => item.id !== deploymentId),
        pods: cluster.resources.pods.filter((item) => item.owner !== target.name),
      },
    });
  });

  if (!updated) {
    return fail('删除失败', 404);
  }

  return ok(true, 'Deployment 已删除');
});

Mock.mock(/\/api\/resources\/pods.*/, 'get', ({ url }) => {
  const query = resolveQuery(url);
  const clusterId = query.get('clusterId') ?? '';
  const namespace = query.get('namespace');
  const cluster = getClusterOrFail(clusterId);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  const items = namespace && namespace !== 'all'
    ? cluster.resources.pods.filter((item) => item.namespace === namespace)
    : cluster.resources.pods;

  return ok(items);
});

Mock.mock(/\/api\/resources\/pods\/[^/]+\/restart$/, 'post', ({ url, body }) => {
  const segments = url?.split('/') ?? [];
  const podId = segments[segments.length - 2] ?? '';
  const { clusterId } = parseBody(body) as { clusterId: string };
  const updated = updateClusterResources(clusterId, (cluster) => ({
    ...cluster,
    resources: {
      ...cluster.resources,
      pods: cluster.resources.pods.map((item) => item.id === podId
        ? {
            ...item,
            status: 'Running',
            restarts: item.restarts + 1,
            createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
          }
        : item),
    },
  }));

  if (!updated) {
    return fail('Pod 重启失败', 404);
  }

  const pod = updated.resources.pods.find((item) => item.id === podId);
  return ok(pod, 'Pod 已重启');
});

Mock.mock(/\/api\/resources\/pods\/[^/]+\/delete$/, 'post', ({ url, body }) => {
  const segments = url?.split('/') ?? [];
  const podId = segments[segments.length - 2] ?? '';
  const { clusterId } = parseBody(body) as { clusterId: string };
  const updated = updateClusterResources(clusterId, (cluster) => recalcNamespaces({
    ...cluster,
    resources: {
      ...cluster.resources,
      pods: cluster.resources.pods.filter((item) => item.id !== podId),
    },
  }));

  if (!updated) {
    return fail('Pod 删除失败', 404);
  }

  return ok(true, 'Pod 已删除');
});

Mock.mock(/\/api\/resources\/services.*/, 'get', ({ url }) => {
  const query = resolveQuery(url);
  const clusterId = query.get('clusterId') ?? '';
  const namespace = query.get('namespace');
  const cluster = getClusterOrFail(clusterId);

  if (!cluster) {
    return fail('集群不存在', 404);
  }

  const items = namespace && namespace !== 'all'
    ? cluster.resources.services.filter((item) => item.namespace === namespace)
    : cluster.resources.services;

  return ok(items);
});

Mock.mock('/api/resources/services', 'post', ({ body }) => {
  const { clusterId, namespace, name, type, ports, selector } = parseBody(body) as {
    clusterId: string;
    namespace: string;
    name: string;
    type: ServiceResource['type'];
    ports: string;
    selector: string;
  };

  const updated = updateClusterResources(clusterId, (cluster) => recalcNamespaces({
    ...cluster,
    namespaceList: cluster.namespaceList.includes(namespace) ? cluster.namespaceList : [...cluster.namespaceList, namespace],
    resources: {
      ...cluster.resources,
      services: [
        {
          id: `svc-${name}-${Date.now()}`,
          name,
          namespace,
          type,
          clusterIP: `10.99.${Math.floor(Math.random() * 20) + 1}.${Math.floor(Math.random() * 200) + 10}`,
          ports,
          selector,
          createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
        },
        ...cluster.resources.services,
      ],
    },
  }));

  if (!updated) {
    return fail('Service 创建失败', 404);
  }

  return ok(updated.resources.services[0], 'Service 创建成功');
});
