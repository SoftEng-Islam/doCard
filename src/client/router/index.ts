import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

// Import views
import HomeView from '../pages/HomeView.vue';
import LoginView from '../pages/LoginView.vue';
import RegisterView from '../pages/RegisterView.vue';
import DashboardView from '../pages/DashboardView.vue';
import GroupDetailView from '../pages/GroupDetailView.vue';
import StudyView from '../pages/StudyView.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			meta: { requiresGuest: true },
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView,
			meta: { requiresGuest: true },
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView,
			meta: { requiresAuth: true },
		},
		{
			path: '/group/:id',
			name: 'group-detail',
			component: GroupDetailView,
			meta: { requiresAuth: true },
		},
		{
			path: '/study/:id',
			name: 'study',
			component: StudyView,
			meta: { requiresAuth: true },
		},
	],
});

// Navigation guards
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	// Check if route requires authentication
	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		next({ name: 'login', query: { redirect: to.fullPath } });
		return;
	}

	// Check if route is for guests only (login/register)
	if (to.meta.requiresGuest && authStore.isAuthenticated) {
		next({ name: 'dashboard' });
		return;
	}

	next();
});

export default router;
