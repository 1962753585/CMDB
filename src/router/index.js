import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/clusters',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { public: true },
        },
        {
            path: '/',
            component: () => import('@/layouts/AppShell.vue'),
            children: [
                {
                    path: 'clusters',
                    name: 'clusters',
                    component: () => import('@/views/ClustersView.vue'),
                },
                {
                    path: 'clusters/:id',
                    name: 'cluster-detail',
                    component: () => import('@/views/ClusterDetailView.vue'),
                    props: true,
                },
                {
                    path: 'resources',
                    name: 'resources',
                    component: () => import('@/views/ResourcesView.vue'),
                },
            ],
        },
    ],
});
router.beforeEach((to) => {
    const authStore = useAuthStore();
    if (!to.meta.public && !authStore.isAuthenticated) {
        return {
            path: '/login',
            query: { redirect: to.fullPath },
        };
    }
    if (to.path === '/login' && authStore.isAuthenticated) {
        return '/clusters';
    }
    return true;
});
export default router;
