<template>
  <section class="login-page">
    <div class="login-copy">
      <p class="eyebrow">Simulated Kubernetes Control Plane</p>
      <h1>前端模拟的集群控制台</h1>
      <p class="lead">
        用 Vue 3、Pinia、Element Plus 和 Mock.js 构建的 K8S 管理平台。登录、JWT、集群操作、Redis 缓存命中和 MinIO 导出均由前端模拟。
      </p>

      <div class="signal-grid">
        <article>
          <span>AUTH</span>
          <strong>JWT Login Guard</strong>
        </article>
        <article>
          <span>CACHE</span>
          <strong>Redis Read Simulation</strong>
        </article>
        <article>
          <span>OBJECT</span>
          <strong>MinIO Export Link</strong>
        </article>
      </div>
    </div>

    <el-card class="login-card" shadow="never">
      <template #header>
        <div class="login-card__header">
          <span>登录控制台</span>
          <el-tag type="success" effect="dark">admin / admin123</el-tag>
        </div>
      </template>

      <el-form :model="form" :rules="rules" ref="formRef" label-position="top" @submit.prevent="handleLogin">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" size="large" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" size="large" />
        </el-form-item>
        <el-button class="submit-button" type="primary" size="large" :loading="submitting" @click="handleLogin">
          登录并进入集群面板
        </el-button>
      </el-form>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { loginApi } from '@/api/cluster';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const formRef = ref<FormInstance>();
const submitting = ref(false);
const form = reactive({
  username: 'admin',
  password: 'admin123',
});

const rules: FormRules<typeof form> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false);

  if (!valid) {
    return;
  }

  submitting.value = true;

  try {
    const response = await loginApi(form);
    authStore.setAuth(response.data.token, response.data.userInfo);
    ElMessage.success('登录成功');
    router.replace((route.query.redirect as string) || '/clusters');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 460px);
  gap: 28px;
  min-height: 100vh;
  padding: 44px;
  align-items: center;
}

.login-copy {
  padding: 36px;
}

.eyebrow {
  margin: 0 0 16px;
  color: #63e6be;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.login-copy h1 {
  max-width: 10ch;
  margin: 0;
  font-size: clamp(48px, 8vw, 86px);
  line-height: 0.92;
}

.lead {
  max-width: 620px;
  margin: 24px 0 36px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.8;
}

.signal-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.signal-grid article {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(12, 31, 52, 0.52);
}

.signal-grid span {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.16em;
}

.login-card {
  padding: 10px;
}

.login-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.submit-button {
  width: 100%;
  margin-top: 12px;
}

@media (max-width: 960px) {
  .login-page {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .login-copy {
    padding: 12px 0;
  }

  .signal-grid {
    grid-template-columns: 1fr;
  }
}
</style>
