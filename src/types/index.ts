export interface UserInfo {
  username: string;
  displayName: string;
  role: string;
}

export type ClusterStatus = '运行中' | '异常' | '已停止';

export interface ClusterSummary {
  id: string;
  name: string;
  version: string;
  nodeCount: number;
  status: ClusterStatus;
  createdAt: string;
  region: string;
}

export interface ClusterNode {
  name: string;
  ip: string;
  status: 'Ready' | 'NotReady' | 'Maintenance';
  role: 'master' | 'worker';
  cpuUsage: string;
  memoryUsage: string;
}

export interface NamespaceResource {
  name: string;
  status: 'Active' | 'Terminating';
  podCount: number;
  deploymentCount: number;
  createdAt: string;
}

export interface DeploymentResource {
  id: string;
  name: string;
  namespace: string;
  image: string;
  replicas: number;
  availableReplicas: number;
  status: 'Running' | 'Degraded' | 'Stopped';
  createdAt: string;
}

export interface PodResource {
  id: string;
  name: string;
  namespace: string;
  status: 'Running' | 'CrashLoopBackOff' | 'Pending' | 'Succeeded';
  node: string;
  ip: string;
  restarts: number;
  owner: string;
  createdAt: string;
}

export interface ServiceResource {
  id: string;
  name: string;
  namespace: string;
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer';
  clusterIP: string;
  ports: string;
  selector: string;
  createdAt: string;
}

export interface ClusterResources {
  namespaces: NamespaceResource[];
  deployments: DeploymentResource[];
  pods: PodResource[];
  services: ServiceResource[];
}

export interface ResourceOverview {
  namespaces: number;
  deployments: number;
  pods: number;
  services: number;
  unhealthyPods: number;
}

export interface ClusterDetail extends ClusterSummary {
  apiServer: string;
  provider: string;
  namespaceList: string[];
  nodes: ClusterNode[];
  config: Record<string, unknown>;
  resources: ClusterResources;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
