import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';
const router = useRouter();
const clusterStore = useClusterStore();
const actionLoading = reactive({});
const statusTypeMap = {
    运行中: 'success',
    异常: 'danger',
    已停止: 'info',
};
const clusters = computed(() => clusterStore.list);
const runningCount = computed(() => clusters.value.filter((item) => item.status === '运行中').length);
const stoppedCount = computed(() => clusters.value.filter((item) => item.status === '已停止').length);
onMounted(() => {
    clusterStore.fetchList();
});
async function confirmStop(id) {
    try {
        await ElMessageBox.confirm('确认停止当前集群吗？该操作仅为前端模拟。', '停止集群', {
            type: 'warning',
        });
    }
    catch {
        return;
    }
    actionLoading[id] = 'stop';
    try {
        await clusterStore.stopCluster(id);
        await clusterStore.fetchList();
        ElMessage.success('集群已停止');
    }
    finally {
        actionLoading[id] = '';
    }
}
async function confirmRestart(id) {
    try {
        await ElMessageBox.confirm('确认重启当前集群吗？将模拟重启过程。', '重启集群', {
            type: 'info',
        });
    }
    catch {
        return;
    }
    actionLoading[id] = 'restart';
    try {
        await clusterStore.restartCluster(id);
        await clusterStore.fetchList();
        ElMessage.success('集群已恢复运行');
    }
    finally {
        actionLoading[id] = '';
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['page__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['action-row']} */ ;
/** @type {__VLS_StyleScopedClasses['page__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "page__hero" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "page__eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "page__desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-stats" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.clusters.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.runningCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.stoppedCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    shadow: "never",
}));
const __VLS_2 = __VLS_1({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_4 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClick': {} },
        plain: true,
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        plain: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClick: (...[$event]) => {
            __VLS_ctx.clusterStore.fetchList();
        }
    };
    __VLS_7.slots.default;
    var __VLS_7;
}
const __VLS_12 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    data: (__VLS_ctx.clusters),
}));
const __VLS_14 = __VLS_13({
    data: (__VLS_ctx.clusters),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.clusterStore.listLoading) }, null, null);
__VLS_15.slots.default;
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    prop: "name",
    label: "集群名称",
    minWidth: "180",
}));
const __VLS_18 = __VLS_17({
    prop: "name",
    label: "集群名称",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "version",
    label: "版本",
    width: "110",
}));
const __VLS_22 = __VLS_21({
    prop: "version",
    label: "版本",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "nodeCount",
    label: "节点数",
    width: "96",
}));
const __VLS_26 = __VLS_25({
    prop: "nodeCount",
    label: "节点数",
    width: "96",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    prop: "region",
    label: "区域",
    minWidth: "180",
}));
const __VLS_30 = __VLS_29({
    prop: "region",
    label: "区域",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    prop: "status",
    label: "状态",
    width: "120",
}));
const __VLS_34 = __VLS_33({
    prop: "status",
    label: "状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_35.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_36 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        type: (__VLS_ctx.statusTypeMap[row.status]),
    }));
    const __VLS_38 = __VLS_37({
        type: (__VLS_ctx.statusTypeMap[row.status]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    (row.status);
    var __VLS_39;
}
var __VLS_35;
const __VLS_40 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}));
const __VLS_42 = __VLS_41({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const __VLS_44 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    label: "操作",
    width: "280",
    fixed: "right",
}));
const __VLS_46 = __VLS_45({
    label: "操作",
    width: "280",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_47.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "action-row" },
    });
    const __VLS_48 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (...[$event]) => {
            __VLS_ctx.router.push(`/clusters/${row.id}`);
        }
    };
    __VLS_51.slots.default;
    var __VLS_51;
    const __VLS_56 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
        loading: (__VLS_ctx.actionLoading[row.id] === 'restart'),
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
        loading: (__VLS_ctx.actionLoading[row.id] === 'restart'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    let __VLS_62;
    const __VLS_63 = {
        onClick: (...[$event]) => {
            __VLS_ctx.confirmRestart(row.id);
        }
    };
    __VLS_59.slots.default;
    var __VLS_59;
    const __VLS_64 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
        loading: (__VLS_ctx.actionLoading[row.id] === 'stop'),
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
        loading: (__VLS_ctx.actionLoading[row.id] === 'stop'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onClick: (...[$event]) => {
            __VLS_ctx.confirmStop(row.id);
        }
    };
    __VLS_67.slots.default;
    var __VLS_67;
}
var __VLS_47;
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['page__eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['page__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['action-row']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            router: router,
            clusterStore: clusterStore,
            actionLoading: actionLoading,
            statusTypeMap: statusTypeMap,
            clusters: clusters,
            runningCount: runningCount,
            stoppedCount: stoppedCount,
            confirmStop: confirmStop,
            confirmRestart: confirmRestart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
