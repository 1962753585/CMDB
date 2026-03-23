import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';
const route = useRoute();
const router = useRouter();
const clusterStore = useClusterStore();
const actionLoading = ref('');
const exporting = ref(false);
const cacheNotice = ref('');
const downloadUrl = ref('');
const clusterId = computed(() => route.params.id);
const detail = computed(() => clusterStore.detail);
onMounted(async () => {
    const result = await clusterStore.fetchDetailFromCacheFirst(clusterId.value);
    if (result.cacheHit) {
        cacheNotice.value = 'Redis 缓存命中，详情已从本地缓存快速加载。';
        clusterStore.fetchDetail(clusterId.value);
    }
    else {
        cacheNotice.value = '首次加载已模拟从 Redis 缓存读取，并写入本地缓存。';
    }
});
async function handleStop() {
    try {
        await ElMessageBox.confirm('确认停止该集群吗？', '停止集群', { type: 'warning' });
    }
    catch {
        return;
    }
    actionLoading.value = 'stop';
    try {
        await clusterStore.stopCluster(clusterId.value);
        await clusterStore.fetchList();
        ElMessage.success('集群已停止');
    }
    finally {
        actionLoading.value = '';
    }
}
async function handleRestart() {
    try {
        await ElMessageBox.confirm('确认重启该集群吗？', '重启集群', { type: 'info' });
    }
    catch {
        return;
    }
    actionLoading.value = 'restart';
    try {
        await clusterStore.restartCluster(clusterId.value);
        await clusterStore.fetchList();
        ElMessage.success('集群已恢复运行');
    }
    finally {
        actionLoading.value = '';
    }
}
async function handleExport() {
    exporting.value = true;
    try {
        const response = await clusterStore.exportConfig(clusterId.value);
        downloadUrl.value = response.data.downloadUrl;
        ElMessage.success(response.message);
    }
    finally {
        exporting.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-page__top']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-page__top']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['download-box']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-page__top']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "detail-page" },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.clusterStore.detailLoading) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "detail-page__top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    text: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    text: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/clusters');
    }
};
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.detail?.name ?? '加载中...');
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "detail-page__desc" },
});
(__VLS_ctx.detail?.provider);
(__VLS_ctx.detail?.apiServer);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "detail-actions" },
});
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (...[$event]) => {
        __VLS_ctx.router.push(`/resources?clusterId=${__VLS_ctx.clusterId}`);
    }
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.actionLoading === 'restart'),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.actionLoading === 'restart'),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleRestart)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    type: "danger",
    plain: true,
    loading: (__VLS_ctx.actionLoading === 'stop'),
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    type: "danger",
    plain: true,
    loading: (__VLS_ctx.actionLoading === 'stop'),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.handleStop)
};
__VLS_27.slots.default;
var __VLS_27;
const __VLS_32 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    plain: true,
    loading: (__VLS_ctx.exporting),
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    plain: true,
    loading: (__VLS_ctx.exporting),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    onClick: (__VLS_ctx.handleExport)
};
__VLS_35.slots.default;
var __VLS_35;
if (__VLS_ctx.cacheNotice) {
    const __VLS_40 = {}.ElAlert;
    /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        title: (__VLS_ctx.cacheNotice),
        type: "success",
        closable: (false),
        showIcon: true,
    }));
    const __VLS_42 = __VLS_41({
        title: (__VLS_ctx.cacheNotice),
        type: "success",
        closable: (false),
        showIcon: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
}
if (__VLS_ctx.detail) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "metric-grid" },
    });
    const __VLS_44 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        shadow: "never",
    }));
    const __VLS_46 = __VLS_45({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "metric-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.detail.version);
    var __VLS_47;
    const __VLS_48 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        shadow: "never",
    }));
    const __VLS_50 = __VLS_49({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "metric-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.detail.nodeCount);
    var __VLS_51;
    const __VLS_52 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        shadow: "never",
    }));
    const __VLS_54 = __VLS_53({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "metric-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.detail.status);
    var __VLS_55;
    const __VLS_56 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        shadow: "never",
    }));
    const __VLS_58 = __VLS_57({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_59.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "metric-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.detail.createdAt);
    var __VLS_59;
}
if (__VLS_ctx.detail) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-grid" },
    });
    const __VLS_60 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        shadow: "never",
    }));
    const __VLS_62 = __VLS_61({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_63.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-head" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        const __VLS_64 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
        const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_67.slots.default;
        (__VLS_ctx.detail.nodes.length);
        var __VLS_67;
    }
    const __VLS_68 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        data: (__VLS_ctx.detail.nodes),
    }));
    const __VLS_70 = __VLS_69({
        data: (__VLS_ctx.detail.nodes),
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    __VLS_71.slots.default;
    const __VLS_72 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        prop: "name",
        label: "节点名称",
        minWidth: "160",
    }));
    const __VLS_74 = __VLS_73({
        prop: "name",
        label: "节点名称",
        minWidth: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    const __VLS_76 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        prop: "ip",
        label: "IP",
        minWidth: "130",
    }));
    const __VLS_78 = __VLS_77({
        prop: "ip",
        label: "IP",
        minWidth: "130",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const __VLS_80 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        prop: "role",
        label: "角色",
        width: "110",
    }));
    const __VLS_82 = __VLS_81({
        prop: "role",
        label: "角色",
        width: "110",
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    const __VLS_84 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
        prop: "status",
        label: "状态",
        width: "120",
    }));
    const __VLS_86 = __VLS_85({
        prop: "status",
        label: "状态",
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    const __VLS_88 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        prop: "cpuUsage",
        label: "CPU",
        width: "90",
    }));
    const __VLS_90 = __VLS_89({
        prop: "cpuUsage",
        label: "CPU",
        width: "90",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const __VLS_92 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
        prop: "memoryUsage",
        label: "内存",
        width: "90",
    }));
    const __VLS_94 = __VLS_93({
        prop: "memoryUsage",
        label: "内存",
        width: "90",
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    var __VLS_71;
    var __VLS_63;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-column" },
    });
    const __VLS_96 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        shadow: "never",
    }));
    const __VLS_98 = __VLS_97({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    __VLS_99.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_99.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "namespace-wrap" },
    });
    for (const [namespace] of __VLS_getVForSourceType((__VLS_ctx.detail.namespaceList))) {
        const __VLS_100 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            key: (namespace),
            type: "info",
            effect: "plain",
        }));
        const __VLS_102 = __VLS_101({
            key: (namespace),
            type: "info",
            effect: "plain",
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        __VLS_103.slots.default;
        (namespace);
        var __VLS_103;
    }
    var __VLS_99;
    const __VLS_104 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
        shadow: "never",
    }));
    const __VLS_106 = __VLS_105({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    __VLS_107.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_107.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
        ...{ class: "config-block" },
    });
    (JSON.stringify(__VLS_ctx.detail.config, null, 2));
    if (__VLS_ctx.downloadUrl) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "download-box" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            href: (__VLS_ctx.downloadUrl),
            target: "_blank",
            rel: "noreferrer",
        });
        (__VLS_ctx.downloadUrl);
    }
    var __VLS_107;
}
/** @type {__VLS_StyleScopedClasses['detail-page']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-page__top']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-page__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-head']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-column']} */ ;
/** @type {__VLS_StyleScopedClasses['namespace-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['config-block']} */ ;
/** @type {__VLS_StyleScopedClasses['download-box']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            router: router,
            clusterStore: clusterStore,
            actionLoading: actionLoading,
            exporting: exporting,
            cacheNotice: cacheNotice,
            downloadUrl: downloadUrl,
            clusterId: clusterId,
            detail: detail,
            handleStop: handleStop,
            handleRestart: handleRestart,
            handleExport: handleExport,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
