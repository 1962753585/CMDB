# K8s Manager - Kubernetes 集群管理平台

一个基于 Vue 3 + Element Plus 的 Kubernetes 集群管理界面，提供直观的集群监控和资源管理能力。

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.9.7-409EFF?logo=element)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)

## 📸 功能特性

- 🖥️ **集群总览** - 查看多个 K8s 集群状态、版本、节点数
- 📊 **节点监控** - 实时显示节点 CPU/内存使用率
- 📦 **资源管理** - 管理命名空间、Deployments、Pods、Services
- 🔐 **登录认证** - 支持用户登录和权限控制
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🎨 **现代化 UI** - 基于 Element Plus 的精美界面

## 🚀 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | 3.5.13 | 渐进式 JavaScript 框架 |
| Vite | 6.2.0 | 下一代前端构建工具 |
| TypeScript | 5.8.2 | JavaScript 的超集 |
| Element Plus | 2.9.7 | Vue 3 组件库 |
| Pinia | 2.3.1 | Vue 状态管理 |
| Vue Router | 4.5.0 | 官方路由管理器 |
| Axios | 1.8.4 | HTTP 客户端 |
| Mock.js | 1.1.0 | 模拟数据生成 |

## 📁 项目结构

```
k8s-manager/
├── src/
│   ├── api/              # API 接口定义
│   │   ├── http.ts       # HTTP 请求封装
│   │   ├── cluster.ts    # 集群相关 API
│   │   └── resource.ts   # 资源相关 API
│   ├── layouts/          # 布局组件
│   │   └── AppShell.vue  # 应用主布局
│   ├── mock/             # Mock 数据
│   │   ├── index.ts      # Mock 配置
│   │   └── data.ts       # 模拟数据
│   ├── router/           # 路由配置
│   │   └── index.ts
│   ├── stores/           # Pinia 状态管理
│   │   ├── auth.ts       # 认证状态
│   │   ├── clusters.ts   # 集群状态
│   │   └── resources.ts  # 资源状态
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/            # 工具函数
│   │   └── storage.ts    # 本地存储工具
│   ├── views/            # 页面视图
│   │   ├── LoginView.vue         # 登录页
│   │   ├── ClustersView.vue      # 集群列表
│   │   ├── ClusterDetailView.vue # 集群详情
│   │   └── ResourcesView.vue     # 资源管理
│   ├── App.vue           # 根组件
│   ├── main.ts           # 入口文件
│   └── env.d.ts          # 环境类型声明
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🛠️ 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://127.0.0.1:5181/

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📖 功能说明

### 1. 集群管理
- 查看集群列表（名称、版本、节点数、区域、状态）
- 集群状态标签：运行中、异常、已停止
- 支持重启、停止集群操作
- 进入集群详情页查看详细信息

### 2. 集群详情
- **节点列表** - 显示 Master/Worker 节点状态、IP、资源使用率
- **命名空间** - 查看所有命名空间及其资源统计
- **配置导出** - 查看网络插件、Ingress、存储类等配置
- **可观测性** - 显示 Prometheus、Grafana 等监控工具

### 3. 资源管理
- **Deployments** - 查看和管理部署
- **Pods** - 查看 Pod 状态、节点、IP、重启次数
- **Services** - 查看服务类型、ClusterIP、端口映射

### 4. 数据持久化
- 使用 `localStorage` 保存集群数据
- 支持数据重置功能

## 🔧 开发指南

### 添加新集群

编辑 `src/mock/data.ts`，在 `defaultClusters` 数组中添加：

```typescript
{
  id: 'cls-new-001',
  name: '新集群名称',
  version: 'v1.29.0',
  nodeCount: 3,
  status: '运行中',
  createdAt: '2026-03-23 10:00:00',
  region: 'Beijing / cn-beijing-1',
  // ... 其他字段
}
```

### 连接真实 K8s API

1. 移除 Mock：在 `src/main.ts` 中注释掉 `import './mock';`
2. 配置 API：在 `src/api/http.ts` 中设置真实的 K8s API Server 地址
3. 添加认证：配置 Bearer Token 或证书认证

### 添加新页面

1. 在 `src/views/` 创建新组件
2. 在 `src/router/index.ts` 添加路由
3. 在 `src/layouts/AppShell.vue` 中添加导航菜单

## 📝 注意事项

- ⚠️ **当前使用 Mock 数据** - 演示用途，不连接真实 K8s 集群
- ⚠️ **认证功能未实现后端** - 登录状态仅保存在本地
- ⚠️ **操作不会真正影响集群** - 重启/停止仅为 UI 演示

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Made with ❤️ using Vue 3 + Element Plus**
