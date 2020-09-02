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
		children: [{
			path: 'list',
			name: 'ArticleList',
			meta: { requiresAuth: true },
			component: () => import('@/views/Article/List.vue')
		}, {
			path: 'release',
			name: 'ArticleRelease',
			meta: { requiresAuth: true },
			component: () => import('@/views/Article/Release.vue')
		}, {
			path: 'edit/:id',
			name: 'ArticleEdit',
			meta: { requiresAuth: true },
			component: () => import('@/views/Article/Edit.vue')
		}]
	}, {
		path: '/category',
		name: 'Category',
		component: Layout,
		children: [{
			path: 'list',
			name: 'CategoryList',
			meta: { requiresAuth: true },
			component: () => import('@/views/Category/List.vue')
		}]
	}, {
		path: '/user',
		name: 'User',
		component: Layout,
		children: [{
			path: 'list',
			name: 'UserList',
			meta: { requiresAuth: true },
			component: () => import('@/views/User/List.vue')
		}, {
			path: 'edit/:id',
			name: 'UserEdit',
			meta: { requiresAuth: true },
			component: () => import('@/views/User/Edit.vue')
		}]
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Layout,
		children: [{
			path: 'list',
			name: 'AdminList',
			meta: { requiresAuth: true },
			component: () => import('@/views/Admin/List.vue')
		}, {
			path: 'info',
			name: 'AdminInfo',
			meta: { requiresAuth: true },
			component: () => import('@/views/Admin/Info.vue')
		}, {
			path: 'edit/:id',
			name: 'AdminEdit',
			props: true,
			meta: { requiresAuth: true },
			component: () => import('@/views/Admin/Edit.vue')
		}]
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Layout,
		children: [{
			path: 'role',
			name: 'AuthRole',
			meta: { requiresAuth: true },
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
	if (!isRequireAuth) {
		next();
		return;
	}
	// 校验token
	let token = sessionStorage.token;
	if (token) {
		next();
	} else {
		Message.error('token已失效，请重新登陆！');
		// 跳转登录页面，携带一个redirect参数
		next({
			path: '/login',
			query: { redirect: to.path }
		});
	}
});


export default router
