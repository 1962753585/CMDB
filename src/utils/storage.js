export const TOKEN_KEY = 'k8s-manager-token';
export const USER_KEY = 'k8s-manager-user';
export const CLUSTERS_KEY = 'k8s-manager-clusters';
export const DETAIL_CACHE_PREFIX = 'k8s-manager-cluster-detail-cache';
export function readStorage(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) {
        return fallback;
    }
    try {
        return JSON.parse(raw);
    }
    catch {
        return fallback;
    }
}
export function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function removeStorage(key) {
    localStorage.removeItem(key);
}
export function detailCacheKey(id) {
    return `${DETAIL_CACHE_PREFIX}-${id}`;
}
