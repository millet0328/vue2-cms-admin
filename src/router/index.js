import Vue from 'vue'
import VueRouter from 'vue-router'

import { Notification } from 'element-ui';

import Layout from '@/components/Layout.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/Admin/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import( /* webpackChunkName: "register" */ '@/views/Admin/Register.vue')
    },
    {
        path: '/article',
        name: 'Article',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'ArticleList',
            component: () => import( /* webpackChunkName: "article-list" */ '@/views/Article/List.vue')
        }, {
            path: 'release',
            name: 'ArticleRelease',
            component: () => import( /* webpackChunkName: "article-release" */ '@/views/Article/Release.vue')
        }, {
            path: 'edit/:id',
            name: 'ArticleEdit',
            props: true,
            component: () => import( /* webpackChunkName: "article-edit" */ '@/views/Article/Edit.vue')
        }]
    }, {
        path: '/comment',
        name: 'Comment',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'CommentList',
            component: () => import( /* webpackChunkName: "comment-list" */ '@/views/Comment/List.vue')
        }]
    }, {
        path: '/category',
        name: 'Category',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'CategoryList',
            component: () => import( /* webpackChunkName: "category-list" */ '@/views/Category/List.vue')
        }]
    }, {
        path: '/tag',
        name: 'Tag',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'TagList',
            component: () => import( /* webpackChunkName: "tag-list" */ '@/views/Tag/List.vue')
        }]
    },
    {
        path: '/notice',
        name: 'Notice',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'NoticeList',
            component: () => import( /* webpackChunkName: "notice-list" */ '@/views/Notice/List.vue')
        }, {
            path: 'release',
            name: 'NoticeRelease',
            component: () => import( /* webpackChunkName: "notice-release" */ '@/views/Notice/Release.vue')
        }, {
            path: 'edit/:id',
            name: 'NoticeEdit',
            props: true,
            component: () => import( /* webpackChunkName: "notice-edit" */ '@/views/Notice/Edit.vue')
        }]
    }, {
        path: '/user',
        name: 'User',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'UserList',
            component: () => import( /* webpackChunkName: "user-list" */ '@/views/User/List.vue')
        }]
    }, {
        path: '/slide',
        name: 'Slide',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'SlideList',
            component: () => import( /* webpackChunkName: "slide-list" */ '@/views/Slide/List.vue')
        }]
    },
    {
        path: '/link',
        name: 'Link',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'LinkList',
            component: () => import( /* webpackChunkName: "link-list" */ '@/views/Link/List.vue')
        }]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Layout,
        meta: { requiresAuth: true },
        children: [{
            path: 'list',
            name: 'AdminList',
            component: () => import( /* webpackChunkName: "admin-list" */ '@/views/Admin/List.vue')
        }, {
            path: 'info',
            name: 'AdminInfo',
            component: () => import( /* webpackChunkName: "admin-info" */ '@/views/Admin/Info.vue')
        }, {
            path: 'edit/:id',
            name: 'AdminEdit',
            props: true,
            component: () => import( /* webpackChunkName: "admin-edit" */ '@/views/Admin/Edit.vue')
        }]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Layout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'role',
                name: 'AuthRole',
                component: () => import( /* webpackChunkName: "auth-role" */ '@/views/Auth/Role.vue')
            }, {
                path: "menu",
                name: "AuthMenu",
                component: () => import( /* webpackChunkName: "auth-menu" */ '@/views/Auth/Menu.vue'),
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

//全局前置守卫
router.beforeEach((to, from, next) => {
    // 检查目标地址,是否需要登录
    let isRequireAuth = to.matched.some((item) => item.meta.requiresAuth);
    // 不需要登录
    if (!isRequireAuth) {
        next();
        return;
    }
    // 需要登录，获取token
    let { token } = sessionStorage;
    // token不存在，跳转登录，提示用户原因
    if (!token) {
        Notification.error({
            title: `错误`,
            message: '权限不够，禁止访问，请登录！',
        });
        next({ path: '/login', query: { redirect: to.fullPath } });
        return;
    }
    // token存在，放行
    next();
});


export default router
