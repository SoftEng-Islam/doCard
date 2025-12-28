// Import views
import HomeView from "../pages/HomeView.vue";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import DashboardView from "../pages/DashboardView.vue";
import GroupDetailView from "../pages/GroupDetailView.vue";
import StudyView from "../pages/StudyView.vue";
import NotFoundView from "../pages/NotFoundView.vue";

export default [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/login",
		name: "login",
		component: LoginView,
		meta: { requiresGuest: true },
	},
	{
		path: "/register",
		name: "register",
		component: RegisterView,
		meta: { requiresGuest: true },
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: DashboardView,
		meta: { requiresAuth: true },
	},
	{
		path: "/group/:id",
		name: "group-detail",
		component: GroupDetailView,
		meta: { requiresAuth: true },
	},
	{
		path: "/study/:id",
		name: "study",
		component: StudyView,
		meta: { requiresAuth: true },
	},
	{
		// 404 fallback
		path: "/:pathMatch(.*)*",
		name: "notFound",
		component: NotFoundView,
		meta: { title: "404 Not Found" },
	},
];
