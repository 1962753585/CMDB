import { CLUSTERS_KEY, readStorage, writeStorage } from '@/utils/storage';
const defaultClusters = [
    {
        id: 'cls-prod-001',
        name: '华东生产集群',
        version: 'v1.29.3',
        nodeCount: 12,
        status: '运行中',
        createdAt: '2025-09-16 10:30:00',
        region: 'Shanghai / cn-east-1',
        apiServer: 'https://prod-k8s-api.example.local:6443',
        provider: 'Bare Metal + Kubeadm',
        namespaceList: ['default', 'kube-system', 'monitoring', 'ingress-nginx', 'orders', 'payments'],
        nodes: [
            { name: 'prod-master-01', ip: '10.0.1.10', status: 'Ready', role: 'master', cpuUsage: '34%', memoryUsage: '52%' },
            { name: 'prod-master-02', ip: '10.0.1.11', status: 'Ready', role: 'master', cpuUsage: '31%', memoryUsage: '47%' },
            { name: 'prod-worker-01', ip: '10.0.1.21', status: 'Ready', role: 'worker', cpuUsage: '63%', memoryUsage: '71%' },
            { name: 'prod-worker-02', ip: '10.0.1.22', status: 'Ready', role: 'worker', cpuUsage: '58%', memoryUsage: '69%' }
        ],
        config: {
            networkPlugin: 'Calico',
            ingress: 'NGINX',
            storageClass: 'ceph-rbd',
            observability: ['Prometheus', 'Grafana', 'Loki']
        },
        resources: {
            namespaces: [
                { name: 'default', status: 'Active', podCount: 4, deploymentCount: 2, createdAt: '2025-09-16 10:31:00' },
                { name: 'kube-system', status: 'Active', podCount: 8, deploymentCount: 4, createdAt: '2025-09-16 10:31:00' },
                { name: 'monitoring', status: 'Active', podCount: 6, deploymentCount: 3, createdAt: '2025-09-16 10:35:00' },
                { name: 'orders', status: 'Active', podCount: 5, deploymentCount: 2, createdAt: '2025-10-02 08:20:00' },
                { name: 'payments', status: 'Active', podCount: 3, deploymentCount: 1, createdAt: '2025-10-09 13:10:00' }
            ],
            deployments: [
                { id: 'dp-prod-orders', name: 'orders-api', namespace: 'orders', image: 'registry.example/orders:v2.8.1', replicas: 3, availableReplicas: 3, status: 'Running', createdAt: '2025-10-02 08:25:00' },
                { id: 'dp-prod-worker', name: 'orders-worker', namespace: 'orders', image: 'registry.example/orders-worker:v2.8.1', replicas: 2, availableReplicas: 2, status: 'Running', createdAt: '2025-10-02 08:28:00' },
                { id: 'dp-prod-payments', name: 'payments-api', namespace: 'payments', image: 'registry.example/payments:v1.9.4', replicas: 2, availableReplicas: 2, status: 'Running', createdAt: '2025-10-09 13:15:00' },
                { id: 'dp-prod-grafana', name: 'grafana', namespace: 'monitoring', image: 'grafana/grafana:10.4.2', replicas: 1, availableReplicas: 1, status: 'Running', createdAt: '2025-09-16 11:00:00' }
            ],
            pods: [
                { id: 'pod-orders-api-1', name: 'orders-api-76f5b7f5fd-a1', namespace: 'orders', status: 'Running', node: 'prod-worker-01', ip: '172.16.2.11', restarts: 0, owner: 'orders-api', createdAt: '2025-10-02 08:25:30' },
                { id: 'pod-orders-api-2', name: 'orders-api-76f5b7f5fd-a2', namespace: 'orders', status: 'Running', node: 'prod-worker-02', ip: '172.16.2.12', restarts: 1, owner: 'orders-api', createdAt: '2025-10-02 08:25:42' },
                { id: 'pod-orders-api-3', name: 'orders-api-76f5b7f5fd-a3', namespace: 'orders', status: 'Running', node: 'prod-worker-01', ip: '172.16.2.13', restarts: 0, owner: 'orders-api', createdAt: '2025-10-02 08:25:57' },
                { id: 'pod-payments-api-1', name: 'payments-api-849b7fdc89-p1', namespace: 'payments', status: 'Running', node: 'prod-worker-02', ip: '172.16.3.11', restarts: 0, owner: 'payments-api', createdAt: '2025-10-09 13:16:20' },
                { id: 'pod-grafana-1', name: 'grafana-74848c5bb5-g1', namespace: 'monitoring', status: 'Running', node: 'prod-worker-01', ip: '172.16.4.5', restarts: 0, owner: 'grafana', createdAt: '2025-09-16 11:00:20' }
            ],
            services: [
                { id: 'svc-orders-api', name: 'orders-api', namespace: 'orders', type: 'ClusterIP', clusterIP: '10.96.8.10', ports: '80/TCP -> 8080', selector: 'app=orders-api', createdAt: '2025-10-02 08:29:00' },
                { id: 'svc-payments-api', name: 'payments-api', namespace: 'payments', type: 'ClusterIP', clusterIP: '10.96.9.20', ports: '80/TCP -> 8080', selector: 'app=payments-api', createdAt: '2025-10-09 13:18:00' },
                { id: 'svc-grafana', name: 'grafana', namespace: 'monitoring', type: 'NodePort', clusterIP: '10.96.10.30', ports: '3000:32030/TCP', selector: 'app=grafana', createdAt: '2025-09-16 11:03:00' }
            ]
        }
    },
    {
        id: 'cls-stg-002',
        name: '灰度验证集群',
        version: 'v1.28.9',
        nodeCount: 6,
        status: '异常',
        createdAt: '2025-11-21 14:00:00',
        region: 'Hangzhou / cn-hz-1',
        apiServer: 'https://staging-k8s-api.example.local:6443',
        provider: 'Managed Kubernetes',
        namespaceList: ['default', 'kube-system', 'gray-release', 'qa-test'],
        nodes: [
            { name: 'stg-master-01', ip: '10.0.2.10', status: 'Ready', role: 'master', cpuUsage: '22%', memoryUsage: '41%' },
            { name: 'stg-worker-01', ip: '10.0.2.21', status: 'NotReady', role: 'worker', cpuUsage: '92%', memoryUsage: '85%' },
            { name: 'stg-worker-02', ip: '10.0.2.22', status: 'Maintenance', role: 'worker', cpuUsage: '14%', memoryUsage: '28%' }
        ],
        config: {
            networkPlugin: 'Cilium',
            ingress: 'Traefik',
            storageClass: 'local-path',
            observability: ['VictoriaMetrics', 'Kiali']
        },
        resources: {
            namespaces: [
                { name: 'default', status: 'Active', podCount: 2, deploymentCount: 1, createdAt: '2025-11-21 14:01:00' },
                { name: 'gray-release', status: 'Active', podCount: 4, deploymentCount: 2, createdAt: '2025-11-22 09:20:00' },
                { name: 'qa-test', status: 'Active', podCount: 3, deploymentCount: 2, createdAt: '2025-11-24 16:40:00' }
            ],
            deployments: [
                { id: 'dp-stg-web', name: 'gray-web', namespace: 'gray-release', image: 'registry.example/gray-web:v0.9.2', replicas: 2, availableReplicas: 1, status: 'Degraded', createdAt: '2025-11-22 09:30:00' },
                { id: 'dp-stg-api', name: 'gray-api', namespace: 'gray-release', image: 'registry.example/gray-api:v0.9.2', replicas: 2, availableReplicas: 2, status: 'Running', createdAt: '2025-11-22 09:34:00' },
                { id: 'dp-stg-qa', name: 'qa-runner', namespace: 'qa-test', image: 'registry.example/qa-runner:v1.3.0', replicas: 1, availableReplicas: 1, status: 'Running', createdAt: '2025-11-24 16:44:00' }
            ],
            pods: [
                { id: 'pod-gray-web-1', name: 'gray-web-7d5f9b5bd9-a1', namespace: 'gray-release', status: 'CrashLoopBackOff', node: 'stg-worker-01', ip: '172.17.2.10', restarts: 7, owner: 'gray-web', createdAt: '2025-11-22 09:30:20' },
                { id: 'pod-gray-web-2', name: 'gray-web-7d5f9b5bd9-a2', namespace: 'gray-release', status: 'Running', node: 'stg-worker-02', ip: '172.17.2.11', restarts: 0, owner: 'gray-web', createdAt: '2025-11-22 09:30:45' },
                { id: 'pod-gray-api-1', name: 'gray-api-6f87b5dcb4-b1', namespace: 'gray-release', status: 'Running', node: 'stg-worker-02', ip: '172.17.2.21', restarts: 1, owner: 'gray-api', createdAt: '2025-11-22 09:35:00' },
                { id: 'pod-qa-runner-1', name: 'qa-runner-78954f5f59-q1', namespace: 'qa-test', status: 'Pending', node: 'stg-worker-01', ip: '172.17.3.4', restarts: 0, owner: 'qa-runner', createdAt: '2025-11-24 16:44:20' }
            ],
            services: [
                { id: 'svc-gray-web', name: 'gray-web', namespace: 'gray-release', type: 'LoadBalancer', clusterIP: '10.97.8.10', ports: '80:30080/TCP', selector: 'app=gray-web', createdAt: '2025-11-22 09:31:00' },
                { id: 'svc-gray-api', name: 'gray-api', namespace: 'gray-release', type: 'ClusterIP', clusterIP: '10.97.8.20', ports: '80/TCP -> 8080', selector: 'app=gray-api', createdAt: '2025-11-22 09:36:00' }
            ]
        }
    },
    {
        id: 'cls-edge-003',
        name: '边缘节点集群',
        version: 'v1.27.12',
        nodeCount: 4,
        status: '已停止',
        createdAt: '2025-05-07 09:12:00',
        region: 'Shenzhen / edge-zone',
        apiServer: 'https://edge-k8s-api.example.local:6443',
        provider: 'K3s Hybrid',
        namespaceList: ['default', 'iot-gateway', 'stream-bridge'],
        nodes: [
            { name: 'edge-master-01', ip: '10.0.3.10', status: 'Maintenance', role: 'master', cpuUsage: '0%', memoryUsage: '0%' },
            { name: 'edge-worker-01', ip: '10.0.3.21', status: 'Maintenance', role: 'worker', cpuUsage: '0%', memoryUsage: '0%' }
        ],
        config: {
            networkPlugin: 'Flannel',
            ingress: 'Traefik',
            storageClass: 'nfs-client',
            observability: ['Node Exporter']
        },
        resources: {
            namespaces: [
                { name: 'default', status: 'Active', podCount: 0, deploymentCount: 0, createdAt: '2025-05-07 09:12:20' },
                { name: 'iot-gateway', status: 'Active', podCount: 0, deploymentCount: 1, createdAt: '2025-05-08 10:00:00' },
                { name: 'stream-bridge', status: 'Active', podCount: 0, deploymentCount: 1, createdAt: '2025-05-08 11:20:00' }
            ],
            deployments: [
                { id: 'dp-edge-gateway', name: 'iot-gateway', namespace: 'iot-gateway', image: 'registry.example/iot-gateway:v0.5.1', replicas: 0, availableReplicas: 0, status: 'Stopped', createdAt: '2025-05-08 10:05:00' },
                { id: 'dp-edge-bridge', name: 'stream-bridge', namespace: 'stream-bridge', image: 'registry.example/stream-bridge:v0.5.1', replicas: 0, availableReplicas: 0, status: 'Stopped', createdAt: '2025-05-08 11:23:00' }
            ],
            pods: [],
            services: [
                { id: 'svc-edge-gateway', name: 'iot-gateway', namespace: 'iot-gateway', type: 'ClusterIP', clusterIP: '10.98.4.10', ports: '1883/TCP', selector: 'app=iot-gateway', createdAt: '2025-05-08 10:06:00' }
            ]
        }
    }
];
export function loadClusters() {
    return readStorage(CLUSTERS_KEY, defaultClusters);
}
export function saveClusters(clusters) {
    writeStorage(CLUSTERS_KEY, clusters);
}
export function resetClustersIfMissing() {
    const existing = localStorage.getItem(CLUSTERS_KEY);
    if (!existing) {
        saveClusters(defaultClusters);
    }
}
