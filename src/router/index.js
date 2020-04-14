import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue';
import Layout from '@/components/Layout.vue';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		alias: '/login',
		name: 'Login',
		component: Login
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
			component: () => import('@/views/Article/List.vue')
		}, {
			path: 'release',
			name: 'ArticleRelease',
			component: () => import('@/views/Article/Release.vue')
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
	}
]

const router = new VueRouter({
	routes
})

export default router
