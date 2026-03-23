import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClusterStore } from '@/stores/clusters';
import { useResourceStore } from '@/stores/resources';
const route = useRoute();
const router = useRouter();
const clusterStore = useClusterStore();
const resourceStore = useResourceStore();
const activeTab = ref('deployments');
const selectedNamespace = ref('all');
const selectedClusterId = ref('');
const deploymentDialogVisible = ref(false);
const serviceDialogVisible = ref(false);
const scaleDialogVisible = ref(false);
const currentDeployment = ref(null);
const scaleReplicas = ref(1);
const deploymentForm = reactive({
    name: '',
    namespace: 'default',
    image: 'nginx:1.27',
    replicas: 1,
});
const serviceForm = reactive({
    name: '',
    namespace: 'default',
    type: 'ClusterIP',
    ports: '80/TCP -> 8080',
    selector: 'app=demo',
});
const clusters = computed(() => clusterStore.list);
onMounted(async () => {
    await clusterStore.fetchList();
    const preferredClusterId = route.query.clusterId || clusters.value[0]?.id || '';
    if (!preferredClusterId) {
        return;
    }
    selectedClusterId.value = preferredClusterId;
    await resourceStore.loadResources(preferredClusterId, selectedNamespace.value);
});
async function handleClusterChange(clusterId) {
    selectedNamespace.value = 'all';
    await resourceStore.loadResources(clusterId, selectedNamespace.value);
    router.replace({ path: '/resources', query: { clusterId } });
}
async function handleNamespaceChange() {
    if (!selectedClusterId.value) {
        return;
    }
    await resourceStore.loadResources(selectedClusterId.value, selectedNamespace.value);
}
async function reload() {
    if (!selectedClusterId.value) {
        return;
    }
    await resourceStore.loadResources(selectedClusterId.value, selectedNamespace.value);
    ElMessage.success('资源列表已刷新');
}
function resetDeploymentForm() {
    deploymentForm.name = '';
    deploymentForm.namespace = selectedNamespace.value !== 'all' ? selectedNamespace.value : 'default';
    deploymentForm.image = 'nginx:1.27';
    deploymentForm.replicas = 1;
}
async function handleCreateDeployment() {
    if (!selectedClusterId.value || !deploymentForm.name.trim()) {
        ElMessage.warning('请先选择集群并填写 Deployment 名称');
        return;
    }
    await resourceStore.createDeployment({
        clusterId: selectedClusterId.value,
        namespace: deploymentForm.namespace.trim(),
        name: deploymentForm.name.trim(),
        image: deploymentForm.image.trim(),
        replicas: deploymentForm.replicas,
    });
    deploymentDialogVisible.value = false;
    resetDeploymentForm();
    ElMessage.success('Deployment 已创建');
}
async function handleCreateService() {
    if (!selectedClusterId.value || !serviceForm.name.trim()) {
        ElMessage.warning('请先选择集群并填写 Service 名称');
        return;
    }
    await resourceStore.createService({
        clusterId: selectedClusterId.value,
        namespace: serviceForm.namespace.trim(),
        name: serviceForm.name.trim(),
        type: serviceForm.type,
        ports: serviceForm.ports.trim(),
        selector: serviceForm.selector.trim(),
    });
    serviceDialogVisible.value = false;
    ElMessage.success('Service 已创建');
}
function openScaleDialog(row) {
    currentDeployment.value = row;
    scaleReplicas.value = row.replicas;
    scaleDialogVisible.value = true;
}
async function handleScaleDeployment() {
    if (!selectedClusterId.value || !currentDeployment.value) {
        return;
    }
    await resourceStore.scaleDeployment(currentDeployment.value.id, { clusterId: selectedClusterId.value, replicas: scaleReplicas.value }, selectedNamespace.value);
    scaleDialogVisible.value = false;
    ElMessage.success('Deployment 副本数已更新');
}
async function handleDeleteDeployment(id) {
    try {
        await ElMessageBox.confirm('确认删除该 Deployment 吗？关联 Pod 也会一并移除。', '删除 Deployment', {
            type: 'warning',
        });
    }
    catch {
        return;
    }
    await resourceStore.deleteDeployment(id, selectedClusterId.value, selectedNamespace.value);
    ElMessage.success('Deployment 已删除');
}
async function handleRestartPod(id) {
    await resourceStore.restartPod(id, selectedClusterId.value, selectedNamespace.value);
    ElMessage.success('Pod 已重启');
}
async function handleDeletePod(id) {
    try {
        await ElMessageBox.confirm('确认删除该 Pod 吗？', '删除 Pod', {
            type: 'warning',
        });
    }
    catch {
        return;
    }
    await resourceStore.deletePod(id, selectedClusterId.value, selectedNamespace.value);
    ElMessage.success('Pod 已删除');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['resource-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-head']} */ ;
/** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-toolbar']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "resource-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "resource-hero" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "resource-hero__eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "resource-hero__desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "resource-toolbar" },
});
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.selectedClusterId),
    placeholder: "选择集群",
    size: "large",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.selectedClusterId),
    placeholder: "选择集群",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onChange: (__VLS_ctx.handleClusterChange)
};
__VLS_3.slots.default;
for (const [cluster] of __VLS_getVForSourceType((__VLS_ctx.clusters))) {
    const __VLS_8 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        key: (cluster.id),
        label: (cluster.name),
        value: (cluster.id),
    }));
    const __VLS_10 = __VLS_9({
        key: (cluster.id),
        label: (cluster.name),
        value: (cluster.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
var __VLS_3;
const __VLS_12 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.selectedNamespace),
    placeholder: "命名空间",
    size: "large",
}));
const __VLS_14 = __VLS_13({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.selectedNamespace),
    placeholder: "命名空间",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onChange: (__VLS_ctx.handleNamespaceChange)
};
__VLS_15.slots.default;
const __VLS_20 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "全部命名空间",
    value: "all",
}));
const __VLS_22 = __VLS_21({
    label: "全部命名空间",
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.resourceStore.namespaces))) {
    const __VLS_24 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        key: (item.name),
        label: (item.name),
        value: (item.name),
    }));
    const __VLS_26 = __VLS_25({
        key: (item.name),
        label: (item.name),
        value: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
}
var __VLS_15;
const __VLS_28 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.reload)
};
__VLS_31.slots.default;
var __VLS_31;
if (__VLS_ctx.resourceStore.overview) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "overview-grid" },
    });
    const __VLS_36 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        shadow: "never",
    }));
    const __VLS_38 = __VLS_37({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "overview-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.resourceStore.overview.namespaces);
    var __VLS_39;
    const __VLS_40 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        shadow: "never",
    }));
    const __VLS_42 = __VLS_41({
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "overview-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.resourceStore.overview.deployments);
    var __VLS_43;
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
        ...{ class: "overview-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.resourceStore.overview.pods);
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
        ...{ class: "overview-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.resourceStore.overview.unhealthyPods);
    var __VLS_51;
}
const __VLS_52 = {}.ElTabs;
/** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.activeTab),
    ...{ class: "resource-tabs" },
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.activeTab),
    ...{ class: "resource-tabs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    label: "Namespaces",
    name: "namespaces",
}));
const __VLS_58 = __VLS_57({
    label: "Namespaces",
    name: "namespaces",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
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
const __VLS_64 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    data: (__VLS_ctx.resourceStore.namespaces),
}));
const __VLS_66 = __VLS_65({
    data: (__VLS_ctx.resourceStore.namespaces),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.resourceStore.loading) }, null, null);
__VLS_67.slots.default;
const __VLS_68 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    prop: "name",
    label: "命名空间",
    minWidth: "180",
}));
const __VLS_70 = __VLS_69({
    prop: "name",
    label: "命名空间",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const __VLS_72 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    prop: "status",
    label: "状态",
    width: "120",
}));
const __VLS_74 = __VLS_73({
    prop: "status",
    label: "状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const __VLS_76 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    prop: "deploymentCount",
    label: "Deployment 数",
    width: "140",
}));
const __VLS_78 = __VLS_77({
    prop: "deploymentCount",
    label: "Deployment 数",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const __VLS_80 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    prop: "podCount",
    label: "Pod 数",
    width: "100",
}));
const __VLS_82 = __VLS_81({
    prop: "podCount",
    label: "Pod 数",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const __VLS_84 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}));
const __VLS_86 = __VLS_85({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
var __VLS_67;
var __VLS_63;
var __VLS_59;
const __VLS_88 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    label: "Deployments",
    name: "deployments",
}));
const __VLS_90 = __VLS_89({
    label: "Deployments",
    name: "deployments",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
__VLS_91.slots.default;
const __VLS_92 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    shadow: "never",
}));
const __VLS_94 = __VLS_93({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_95.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-head" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_96 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_98 = __VLS_97({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    let __VLS_100;
    let __VLS_101;
    let __VLS_102;
    const __VLS_103 = {
        onClick: (...[$event]) => {
            __VLS_ctx.deploymentDialogVisible = true;
        }
    };
    __VLS_99.slots.default;
    var __VLS_99;
}
const __VLS_104 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    data: (__VLS_ctx.resourceStore.deployments),
}));
const __VLS_106 = __VLS_105({
    data: (__VLS_ctx.resourceStore.deployments),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.resourceStore.loading) }, null, null);
__VLS_107.slots.default;
const __VLS_108 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    prop: "name",
    label: "名称",
    minWidth: "160",
}));
const __VLS_110 = __VLS_109({
    prop: "name",
    label: "名称",
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const __VLS_112 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
    prop: "namespace",
    label: "命名空间",
    minWidth: "130",
}));
const __VLS_114 = __VLS_113({
    prop: "namespace",
    label: "命名空间",
    minWidth: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const __VLS_116 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    prop: "image",
    label: "镜像",
    minWidth: "220",
    showOverflowTooltip: true,
}));
const __VLS_118 = __VLS_117({
    prop: "image",
    label: "镜像",
    minWidth: "220",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
const __VLS_120 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    label: "副本",
    width: "110",
}));
const __VLS_122 = __VLS_121({
    label: "副本",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
__VLS_123.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_123.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (row.availableReplicas);
    (row.replicas);
}
var __VLS_123;
const __VLS_124 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
    prop: "status",
    label: "状态",
    width: "120",
}));
const __VLS_126 = __VLS_125({
    prop: "status",
    label: "状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const __VLS_128 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}));
const __VLS_130 = __VLS_129({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const __VLS_132 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_134 = __VLS_133({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
__VLS_135.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_135.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-actions" },
    });
    const __VLS_136 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
    }));
    const __VLS_138 = __VLS_137({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    let __VLS_140;
    let __VLS_141;
    let __VLS_142;
    const __VLS_143 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openScaleDialog(row);
        }
    };
    __VLS_139.slots.default;
    var __VLS_139;
    const __VLS_144 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }));
    const __VLS_146 = __VLS_145({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_145));
    let __VLS_148;
    let __VLS_149;
    let __VLS_150;
    const __VLS_151 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDeleteDeployment(row.id);
        }
    };
    __VLS_147.slots.default;
    var __VLS_147;
}
var __VLS_135;
var __VLS_107;
var __VLS_95;
var __VLS_91;
const __VLS_152 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({
    label: "Pods",
    name: "pods",
}));
const __VLS_154 = __VLS_153({
    label: "Pods",
    name: "pods",
}, ...__VLS_functionalComponentArgsRest(__VLS_153));
__VLS_155.slots.default;
const __VLS_156 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    shadow: "never",
}));
const __VLS_158 = __VLS_157({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
__VLS_159.slots.default;
const __VLS_160 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({
    data: (__VLS_ctx.resourceStore.pods),
}));
const __VLS_162 = __VLS_161({
    data: (__VLS_ctx.resourceStore.pods),
}, ...__VLS_functionalComponentArgsRest(__VLS_161));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.resourceStore.loading) }, null, null);
__VLS_163.slots.default;
const __VLS_164 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    prop: "name",
    label: "Pod 名称",
    minWidth: "200",
}));
const __VLS_166 = __VLS_165({
    prop: "name",
    label: "Pod 名称",
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
const __VLS_168 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({
    prop: "namespace",
    label: "命名空间",
    width: "130",
}));
const __VLS_170 = __VLS_169({
    prop: "namespace",
    label: "命名空间",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
const __VLS_172 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
    prop: "status",
    label: "状态",
    width: "150",
}));
const __VLS_174 = __VLS_173({
    prop: "status",
    label: "状态",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_173));
const __VLS_176 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
    prop: "node",
    label: "节点",
    minWidth: "130",
}));
const __VLS_178 = __VLS_177({
    prop: "node",
    label: "节点",
    minWidth: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
const __VLS_180 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
    prop: "ip",
    label: "IP",
    minWidth: "130",
}));
const __VLS_182 = __VLS_181({
    prop: "ip",
    label: "IP",
    minWidth: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
const __VLS_184 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    prop: "restarts",
    label: "重启次数",
    width: "100",
}));
const __VLS_186 = __VLS_185({
    prop: "restarts",
    label: "重启次数",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
const __VLS_188 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
    prop: "owner",
    label: "所属资源",
    width: "140",
}));
const __VLS_190 = __VLS_189({
    prop: "owner",
    label: "所属资源",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_189));
const __VLS_192 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_194 = __VLS_193({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
__VLS_195.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_195.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-actions" },
    });
    const __VLS_196 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
    }));
    const __VLS_198 = __VLS_197({
        ...{ 'onClick': {} },
        link: true,
        type: "warning",
    }, ...__VLS_functionalComponentArgsRest(__VLS_197));
    let __VLS_200;
    let __VLS_201;
    let __VLS_202;
    const __VLS_203 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleRestartPod(row.id);
        }
    };
    __VLS_199.slots.default;
    var __VLS_199;
    const __VLS_204 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }));
    const __VLS_206 = __VLS_205({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_205));
    let __VLS_208;
    let __VLS_209;
    let __VLS_210;
    const __VLS_211 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDeletePod(row.id);
        }
    };
    __VLS_207.slots.default;
    var __VLS_207;
}
var __VLS_195;
var __VLS_163;
var __VLS_159;
var __VLS_155;
const __VLS_212 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    label: "Services",
    name: "services",
}));
const __VLS_214 = __VLS_213({
    label: "Services",
    name: "services",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
__VLS_215.slots.default;
const __VLS_216 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    shadow: "never",
}));
const __VLS_218 = __VLS_217({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
__VLS_219.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_219.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-head" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_220 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_222 = __VLS_221({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_221));
    let __VLS_224;
    let __VLS_225;
    let __VLS_226;
    const __VLS_227 = {
        onClick: (...[$event]) => {
            __VLS_ctx.serviceDialogVisible = true;
        }
    };
    __VLS_223.slots.default;
    var __VLS_223;
}
const __VLS_228 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
    data: (__VLS_ctx.resourceStore.services),
}));
const __VLS_230 = __VLS_229({
    data: (__VLS_ctx.resourceStore.services),
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.resourceStore.loading) }, null, null);
__VLS_231.slots.default;
const __VLS_232 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    prop: "name",
    label: "名称",
    minWidth: "160",
}));
const __VLS_234 = __VLS_233({
    prop: "name",
    label: "名称",
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
const __VLS_236 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
    prop: "namespace",
    label: "命名空间",
    width: "130",
}));
const __VLS_238 = __VLS_237({
    prop: "namespace",
    label: "命名空间",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
const __VLS_240 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    prop: "type",
    label: "类型",
    width: "120",
}));
const __VLS_242 = __VLS_241({
    prop: "type",
    label: "类型",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
const __VLS_244 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
    prop: "clusterIP",
    label: "ClusterIP",
    minWidth: "140",
}));
const __VLS_246 = __VLS_245({
    prop: "clusterIP",
    label: "ClusterIP",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_245));
const __VLS_248 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
    prop: "ports",
    label: "端口映射",
    minWidth: "180",
}));
const __VLS_250 = __VLS_249({
    prop: "ports",
    label: "端口映射",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_249));
const __VLS_252 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    prop: "selector",
    label: "Selector",
    minWidth: "140",
}));
const __VLS_254 = __VLS_253({
    prop: "selector",
    label: "Selector",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
const __VLS_256 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}));
const __VLS_258 = __VLS_257({
    prop: "createdAt",
    label: "创建时间",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_257));
var __VLS_231;
var __VLS_219;
var __VLS_215;
var __VLS_55;
const __VLS_260 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
    modelValue: (__VLS_ctx.deploymentDialogVisible),
    title: "新建 Deployment",
    width: "520px",
}));
const __VLS_262 = __VLS_261({
    modelValue: (__VLS_ctx.deploymentDialogVisible),
    title: "新建 Deployment",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_261));
__VLS_263.slots.default;
const __VLS_264 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
    labelPosition: "top",
    model: (__VLS_ctx.deploymentForm),
}));
const __VLS_266 = __VLS_265({
    labelPosition: "top",
    model: (__VLS_ctx.deploymentForm),
}, ...__VLS_functionalComponentArgsRest(__VLS_265));
__VLS_267.slots.default;
const __VLS_268 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
    label: "名称",
}));
const __VLS_270 = __VLS_269({
    label: "名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_269));
__VLS_271.slots.default;
const __VLS_272 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
    modelValue: (__VLS_ctx.deploymentForm.name),
    placeholder: "例如 order-gateway",
}));
const __VLS_274 = __VLS_273({
    modelValue: (__VLS_ctx.deploymentForm.name),
    placeholder: "例如 order-gateway",
}, ...__VLS_functionalComponentArgsRest(__VLS_273));
var __VLS_271;
const __VLS_276 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_277 = __VLS_asFunctionalComponent(__VLS_276, new __VLS_276({
    label: "命名空间",
}));
const __VLS_278 = __VLS_277({
    label: "命名空间",
}, ...__VLS_functionalComponentArgsRest(__VLS_277));
__VLS_279.slots.default;
const __VLS_280 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({
    modelValue: (__VLS_ctx.deploymentForm.namespace),
    placeholder: "例如 default",
}));
const __VLS_282 = __VLS_281({
    modelValue: (__VLS_ctx.deploymentForm.namespace),
    placeholder: "例如 default",
}, ...__VLS_functionalComponentArgsRest(__VLS_281));
var __VLS_279;
const __VLS_284 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_285 = __VLS_asFunctionalComponent(__VLS_284, new __VLS_284({
    label: "镜像",
}));
const __VLS_286 = __VLS_285({
    label: "镜像",
}, ...__VLS_functionalComponentArgsRest(__VLS_285));
__VLS_287.slots.default;
const __VLS_288 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({
    modelValue: (__VLS_ctx.deploymentForm.image),
    placeholder: "例如 nginx:1.27",
}));
const __VLS_290 = __VLS_289({
    modelValue: (__VLS_ctx.deploymentForm.image),
    placeholder: "例如 nginx:1.27",
}, ...__VLS_functionalComponentArgsRest(__VLS_289));
var __VLS_287;
const __VLS_292 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    label: "副本数",
}));
const __VLS_294 = __VLS_293({
    label: "副本数",
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
__VLS_295.slots.default;
const __VLS_296 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({
    modelValue: (__VLS_ctx.deploymentForm.replicas),
    min: (0),
    max: (20),
}));
const __VLS_298 = __VLS_297({
    modelValue: (__VLS_ctx.deploymentForm.replicas),
    min: (0),
    max: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_297));
var __VLS_295;
var __VLS_267;
{
    const { footer: __VLS_thisSlot } = __VLS_263.slots;
    const __VLS_300 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({
        ...{ 'onClick': {} },
    }));
    const __VLS_302 = __VLS_301({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_301));
    let __VLS_304;
    let __VLS_305;
    let __VLS_306;
    const __VLS_307 = {
        onClick: (...[$event]) => {
            __VLS_ctx.deploymentDialogVisible = false;
        }
    };
    __VLS_303.slots.default;
    var __VLS_303;
    const __VLS_308 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_309 = __VLS_asFunctionalComponent(__VLS_308, new __VLS_308({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_310 = __VLS_309({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_309));
    let __VLS_312;
    let __VLS_313;
    let __VLS_314;
    const __VLS_315 = {
        onClick: (__VLS_ctx.handleCreateDeployment)
    };
    __VLS_311.slots.default;
    var __VLS_311;
}
var __VLS_263;
const __VLS_316 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_317 = __VLS_asFunctionalComponent(__VLS_316, new __VLS_316({
    modelValue: (__VLS_ctx.serviceDialogVisible),
    title: "新建 Service",
    width: "520px",
}));
const __VLS_318 = __VLS_317({
    modelValue: (__VLS_ctx.serviceDialogVisible),
    title: "新建 Service",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_317));
__VLS_319.slots.default;
const __VLS_320 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_321 = __VLS_asFunctionalComponent(__VLS_320, new __VLS_320({
    labelPosition: "top",
    model: (__VLS_ctx.serviceForm),
}));
const __VLS_322 = __VLS_321({
    labelPosition: "top",
    model: (__VLS_ctx.serviceForm),
}, ...__VLS_functionalComponentArgsRest(__VLS_321));
__VLS_323.slots.default;
const __VLS_324 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_325 = __VLS_asFunctionalComponent(__VLS_324, new __VLS_324({
    label: "名称",
}));
const __VLS_326 = __VLS_325({
    label: "名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_325));
__VLS_327.slots.default;
const __VLS_328 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_329 = __VLS_asFunctionalComponent(__VLS_328, new __VLS_328({
    modelValue: (__VLS_ctx.serviceForm.name),
}));
const __VLS_330 = __VLS_329({
    modelValue: (__VLS_ctx.serviceForm.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_329));
var __VLS_327;
const __VLS_332 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_333 = __VLS_asFunctionalComponent(__VLS_332, new __VLS_332({
    label: "命名空间",
}));
const __VLS_334 = __VLS_333({
    label: "命名空间",
}, ...__VLS_functionalComponentArgsRest(__VLS_333));
__VLS_335.slots.default;
const __VLS_336 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_337 = __VLS_asFunctionalComponent(__VLS_336, new __VLS_336({
    modelValue: (__VLS_ctx.serviceForm.namespace),
}));
const __VLS_338 = __VLS_337({
    modelValue: (__VLS_ctx.serviceForm.namespace),
}, ...__VLS_functionalComponentArgsRest(__VLS_337));
var __VLS_335;
const __VLS_340 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_341 = __VLS_asFunctionalComponent(__VLS_340, new __VLS_340({
    label: "类型",
}));
const __VLS_342 = __VLS_341({
    label: "类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_341));
__VLS_343.slots.default;
const __VLS_344 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_345 = __VLS_asFunctionalComponent(__VLS_344, new __VLS_344({
    modelValue: (__VLS_ctx.serviceForm.type),
}));
const __VLS_346 = __VLS_345({
    modelValue: (__VLS_ctx.serviceForm.type),
}, ...__VLS_functionalComponentArgsRest(__VLS_345));
__VLS_347.slots.default;
const __VLS_348 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_349 = __VLS_asFunctionalComponent(__VLS_348, new __VLS_348({
    label: "ClusterIP",
    value: "ClusterIP",
}));
const __VLS_350 = __VLS_349({
    label: "ClusterIP",
    value: "ClusterIP",
}, ...__VLS_functionalComponentArgsRest(__VLS_349));
const __VLS_352 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({
    label: "NodePort",
    value: "NodePort",
}));
const __VLS_354 = __VLS_353({
    label: "NodePort",
    value: "NodePort",
}, ...__VLS_functionalComponentArgsRest(__VLS_353));
const __VLS_356 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_357 = __VLS_asFunctionalComponent(__VLS_356, new __VLS_356({
    label: "LoadBalancer",
    value: "LoadBalancer",
}));
const __VLS_358 = __VLS_357({
    label: "LoadBalancer",
    value: "LoadBalancer",
}, ...__VLS_functionalComponentArgsRest(__VLS_357));
var __VLS_347;
var __VLS_343;
const __VLS_360 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
    label: "端口映射",
}));
const __VLS_362 = __VLS_361({
    label: "端口映射",
}, ...__VLS_functionalComponentArgsRest(__VLS_361));
__VLS_363.slots.default;
const __VLS_364 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({
    modelValue: (__VLS_ctx.serviceForm.ports),
    placeholder: "例如 80/TCP -> 8080",
}));
const __VLS_366 = __VLS_365({
    modelValue: (__VLS_ctx.serviceForm.ports),
    placeholder: "例如 80/TCP -> 8080",
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
var __VLS_363;
const __VLS_368 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_369 = __VLS_asFunctionalComponent(__VLS_368, new __VLS_368({
    label: "Selector",
}));
const __VLS_370 = __VLS_369({
    label: "Selector",
}, ...__VLS_functionalComponentArgsRest(__VLS_369));
__VLS_371.slots.default;
const __VLS_372 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_373 = __VLS_asFunctionalComponent(__VLS_372, new __VLS_372({
    modelValue: (__VLS_ctx.serviceForm.selector),
    placeholder: "例如 app=order-gateway",
}));
const __VLS_374 = __VLS_373({
    modelValue: (__VLS_ctx.serviceForm.selector),
    placeholder: "例如 app=order-gateway",
}, ...__VLS_functionalComponentArgsRest(__VLS_373));
var __VLS_371;
var __VLS_323;
{
    const { footer: __VLS_thisSlot } = __VLS_319.slots;
    const __VLS_376 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_377 = __VLS_asFunctionalComponent(__VLS_376, new __VLS_376({
        ...{ 'onClick': {} },
    }));
    const __VLS_378 = __VLS_377({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_377));
    let __VLS_380;
    let __VLS_381;
    let __VLS_382;
    const __VLS_383 = {
        onClick: (...[$event]) => {
            __VLS_ctx.serviceDialogVisible = false;
        }
    };
    __VLS_379.slots.default;
    var __VLS_379;
    const __VLS_384 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_385 = __VLS_asFunctionalComponent(__VLS_384, new __VLS_384({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_386 = __VLS_385({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_385));
    let __VLS_388;
    let __VLS_389;
    let __VLS_390;
    const __VLS_391 = {
        onClick: (__VLS_ctx.handleCreateService)
    };
    __VLS_387.slots.default;
    var __VLS_387;
}
var __VLS_319;
const __VLS_392 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_393 = __VLS_asFunctionalComponent(__VLS_392, new __VLS_392({
    modelValue: (__VLS_ctx.scaleDialogVisible),
    title: "Deployment 扩缩容",
    width: "420px",
}));
const __VLS_394 = __VLS_393({
    modelValue: (__VLS_ctx.scaleDialogVisible),
    title: "Deployment 扩缩容",
    width: "420px",
}, ...__VLS_functionalComponentArgsRest(__VLS_393));
__VLS_395.slots.default;
const __VLS_396 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_397 = __VLS_asFunctionalComponent(__VLS_396, new __VLS_396({
    labelPosition: "top",
}));
const __VLS_398 = __VLS_397({
    labelPosition: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_397));
__VLS_399.slots.default;
const __VLS_400 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_401 = __VLS_asFunctionalComponent(__VLS_400, new __VLS_400({
    label: "副本数",
}));
const __VLS_402 = __VLS_401({
    label: "副本数",
}, ...__VLS_functionalComponentArgsRest(__VLS_401));
__VLS_403.slots.default;
const __VLS_404 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent(__VLS_404, new __VLS_404({
    modelValue: (__VLS_ctx.scaleReplicas),
    min: (0),
    max: (20),
}));
const __VLS_406 = __VLS_405({
    modelValue: (__VLS_ctx.scaleReplicas),
    min: (0),
    max: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_405));
var __VLS_403;
var __VLS_399;
{
    const { footer: __VLS_thisSlot } = __VLS_395.slots;
    const __VLS_408 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_409 = __VLS_asFunctionalComponent(__VLS_408, new __VLS_408({
        ...{ 'onClick': {} },
    }));
    const __VLS_410 = __VLS_409({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_409));
    let __VLS_412;
    let __VLS_413;
    let __VLS_414;
    const __VLS_415 = {
        onClick: (...[$event]) => {
            __VLS_ctx.scaleDialogVisible = false;
        }
    };
    __VLS_411.slots.default;
    var __VLS_411;
    const __VLS_416 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_417 = __VLS_asFunctionalComponent(__VLS_416, new __VLS_416({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_418 = __VLS_417({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_417));
    let __VLS_420;
    let __VLS_421;
    let __VLS_422;
    const __VLS_423 = {
        onClick: (__VLS_ctx.handleScaleDeployment)
    };
    __VLS_419.slots.default;
    var __VLS_419;
}
var __VLS_395;
/** @type {__VLS_StyleScopedClasses['resource-page']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero__eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-hero__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-label']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-label']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-label']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-label']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['card-head']} */ ;
/** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card-head']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            resourceStore: resourceStore,
            activeTab: activeTab,
            selectedNamespace: selectedNamespace,
            selectedClusterId: selectedClusterId,
            deploymentDialogVisible: deploymentDialogVisible,
            serviceDialogVisible: serviceDialogVisible,
            scaleDialogVisible: scaleDialogVisible,
            scaleReplicas: scaleReplicas,
            deploymentForm: deploymentForm,
            serviceForm: serviceForm,
            clusters: clusters,
            handleClusterChange: handleClusterChange,
            handleNamespaceChange: handleNamespaceChange,
            reload: reload,
            handleCreateDeployment: handleCreateDeployment,
            handleCreateService: handleCreateService,
            openScaleDialog: openScaleDialog,
            handleScaleDeployment: handleScaleDeployment,
            handleDeleteDeployment: handleDeleteDeployment,
            handleRestartPod: handleRestartPod,
            handleDeletePod: handleDeletePod,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
