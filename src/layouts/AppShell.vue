<template>
  <div class="shell">
    <aside class="shell__aside">
      <div class="brand">
        <div class="brand__badge">K8S</div>
        <div>
          <p class="brand__eyebrow">Frontend Simulation Console</p>
          <h1>K8S Manager</h1>
        </div>
      </div>

      <div class="shell__section">
        <p class="shell__label">Active User</p>
        <div class="shell__identity">
          <strong>{{ authStore.userInfo?.displayName }}</strong>
          <span>{{ authStore.userInfo?.role }}</span>
        </div>
      </div>

      <div class="shell__section">
        <p class="shell__label">Navigation</p>
        <RouterLink class="nav-link" to="/clusters">集群总览</RouterLink>
        <RouterLink class="nav-link" to="/resources">资源管理</RouterLink>
      </div>

      <div class="shell__section shell__section--bottom">
        <p class="shell__label">Session</p>
        <span class="token-text">{{ shortToken }}</span>
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </div>
    </aside>

    <main class="shell__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const shortToken = computed(() => `${authStore.token.slice(0, 18)}...`);

function handleLogout() {
  authStore.logout();
  ElMessage.success('已退出登录');
  router.replace('/login');
}
</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
}

.shell__aside {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 28px;
  border-right: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(4, 12, 22, 0.96), rgba(8, 19, 33, 0.92));
  backdrop-filter: blur(18px);
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
}

.brand__badge {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border: 1px solid rgba(99, 230, 190, 0.28);
  border-radius: 20px;
  color: #03111b;
  font-weight: 800;
  letter-spacing: 0.16em;
  background: linear-gradient(135deg, #63e6be, #38bdf8);
}

.brand__eyebrow,
.shell__label,
.token-text,
.shell__identity span {
  color: var(--muted);
}

.brand h1,
.brand__eyebrow,
.shell__label,
.shell__identity strong {
  margin: 0;
}

.brand h1 {
  font-size: 28px;
}

.shell__section {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(11, 27, 44, 0.62);
}

.shell__section--bottom {
  margin-top: auto;
}

.shell__identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  display: block;
  padding: 14px 18px;
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  transition: 0.25s ease;
  background: rgba(99, 230, 190, 0.08);
}

.nav-link + .nav-link {
  margin-top: 10px;
}

.nav-link:hover,
.router-link-active {
  border-color: rgba(99, 230, 190, 0.44);
  background: rgba(99, 230, 190, 0.14);
}

.token-text {
  display: inline-block;
  margin-bottom: 16px;
  word-break: break-all;
}

.shell__main {
  padding: 30px;
}

@media (max-width: 1080px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .shell__aside {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
}
</style>
