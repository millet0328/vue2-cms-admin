import Vue from 'vue'
import VueRouter from 'vue-router'

import { Message } from 'element-ui';

import Layout from '@/components/Layout.vue';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		alias: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue')
	},
	{
		path: '/article',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'ArticleList',
			component: () => import('@/views/Article/List.vue')
		}, {
			path: 'release',
			name: 'ArticleRelease',
			component: () => import('@/views/Article/Release.vue')
		}, {
			path: 'edit/:id',
			name: 'ArticleEdit',
			props: true,
			component: () => import('@/views/Article/Edit.vue')
		}]
	}, {
		path: '/category',
		name: 'Category',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'CategoryList',
			component: () => import('@/views/Category/List.vue')
		}]
	}, {
		path: '/user',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import('@/views/User/List.vue')
		}, {
			path: 'edit/:id',
			name: 'UserEdit',
			props: true,
			component: () => import('@/views/User/Edit.vue')
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
			component: () => import('@/views/Admin/List.vue')
		}, {
			path: 'info',
			name: 'AdminInfo',
			component: () => import('@/views/Admin/Info.vue')
		}, {
			path: 'edit/:id',
			name: 'AdminEdit',
			props: true,
			component: () => import('@/views/Admin/Edit.vue')
		}]
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'role',
			name: 'AuthRole',
			component: () => import('@/views/Auth/Role.vue')
		}]
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
		Message.error('请重新登录系统，token失效！');
		next({ path: '/login', query: { redirect: to.fullPath } });
		return;
	}
	// token存在，放行
	next();
});


export default router
