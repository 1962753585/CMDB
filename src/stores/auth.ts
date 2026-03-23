import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserInfo } from '@/types';
import { TOKEN_KEY, USER_KEY, readStorage, removeStorage, writeStorage } from '@/utils/storage';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem(TOKEN_KEY) ?? '');
  const userInfo = ref<UserInfo | null>(readStorage<UserInfo | null>(USER_KEY, null));

  const isAuthenticated = computed(() => Boolean(token.value));

  function setAuth(nextToken: string, nextUserInfo: UserInfo) {
    token.value = nextToken;
    userInfo.value = nextUserInfo;
    localStorage.setItem(TOKEN_KEY, nextToken);
    writeStorage(USER_KEY, nextUserInfo);
  }

  function logout() {
    token.value = '';
    userInfo.value = null;
    removeStorage(TOKEN_KEY);
    removeStorage(USER_KEY);
  }

  return {
    token,
    userInfo,
    isAuthenticated,
    setAuth,
    logout,
  };
});
