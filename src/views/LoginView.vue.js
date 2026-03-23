import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { loginApi } from '@/api/cluster';
import { useAuthStore } from '@/stores/auth';
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const formRef = ref();
const submitting = ref(false);
const form = reactive({
    username: 'admin',
    password: 'admin123',
});
const rules = {
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
        router.replace(route.query.redirect || '/clusters');
    }
    finally {
        submitting.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['login-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['signal-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['signal-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['login-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['signal-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "login-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-copy" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "lead" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "signal-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "login-card" },
    shadow: "never",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "login-card" },
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "login-card__header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_4 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        type: "success",
        effect: "dark",
    }));
    const __VLS_6 = __VLS_5({
        type: "success",
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    var __VLS_7;
}
const __VLS_8 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
    labelPosition: "top",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
    labelPosition: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onSubmit: (__VLS_ctx.handleLogin)
};
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_16 = {};
__VLS_11.slots.default;
const __VLS_18 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    label: "用户名",
    prop: "username",
}));
const __VLS_20 = __VLS_19({
    label: "用户名",
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "请输入用户名",
    size: "large",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "请输入用户名",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
const __VLS_26 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    label: "密码",
    prop: "password",
}));
const __VLS_28 = __VLS_27({
    label: "密码",
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    showPassword: true,
    placeholder: "请输入密码",
    size: "large",
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    showPassword: true,
    placeholder: "请输入密码",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_29;
const __VLS_34 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onClick': {} },
    ...{ class: "submit-button" },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.submitting),
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    ...{ class: "submit-button" },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.submitting),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (__VLS_ctx.handleLogin)
};
__VLS_37.slots.default;
var __VLS_37;
var __VLS_11;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['login-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['lead']} */ ;
/** @type {__VLS_StyleScopedClasses['signal-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card__header']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-button']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formRef: formRef,
            submitting: submitting,
            form: form,
            rules: rules,
            handleLogin: handleLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
