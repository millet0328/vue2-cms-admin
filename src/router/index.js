import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/components/Layout.vue';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		alias: '/login',
		name: 'Login',
		component: () => import('@/views/Admin/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Admin/Register.vue')
	},
	{
		path: '/article',
		name: 'Article',
		component: Layout,
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
			component: () => import('@/views/Article/Edit.vue')
		}]
	}, {
		path: '/category',
		name: 'Category',
		component: Layout,
		children: [{
			path: 'list',
			name: 'CategoryList',
			component: () => import('@/views/Category/List.vue')
		}]
	}, {
		path: '/user',
		name: 'User',
		component: Layout,
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import('@/views/User/List.vue')
		}, {
			path: 'edit/:id',
			name: 'UserEdit',
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
			component: () => import('@/views/Admin/List.vue')
		}, {
			path: 'info',
			name: 'AdminInfo',
			component: () => import('@/views/Admin/Info.vue')
		}, {
			path: 'edit/:id',
			name: 'AdminEdit',
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
			component: () => import('@/views/Auth/Role.vue')
		}]
	}
]

const router = new VueRouter({
	routes
})

export default router
