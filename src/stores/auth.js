import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { TOKEN_KEY, USER_KEY, readStorage, removeStorage, writeStorage } from '@/utils/storage';
export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(TOKEN_KEY) ?? '');
    const userInfo = ref(readStorage(USER_KEY, null));
    const isAuthenticated = computed(() => Boolean(token.value));
    function setAuth(nextToken, nextUserInfo) {
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
