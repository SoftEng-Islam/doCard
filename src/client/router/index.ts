import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes.ts";
import { useAuthStore } from "@/features/auth/auth.store";

const url = new URL(import.meta.env.BASE_URL, window.location.origin);
const router = createRouter({
	history: createWebHistory(url.pathname),
	routes: routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	// Check if route requires authentication
	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		next({ name: "login", query: { redirect: to.fullPath } });
		return;
	}

	// Check if route is for guests only (login/register)
	if (to.meta.requiresGuest && authStore.isAuthenticated) {
		next({ name: "dashboard" });
		return;
	}

	next();
});

export default router;
