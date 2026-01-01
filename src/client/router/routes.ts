// Import views
import HomeView from "../pages/HomeView.vue";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import DashboardView from "../pages/DashboardView.vue";
import GroupDetailView from "../pages/GroupDetailView.vue";
import StudyView from "../pages/StudyView.vue";
import NotFoundView from "../pages/NotFoundView.vue";
import DashboardFooter from "../features/footer/DashboardFooter.vue";

export default [
	{
		path: "/",
		name: "home",
		component: HomeView,
		// redirect: "/dashboard",
		beforeEnter(to, from, next) {
			console.log("/ Before Enter");
			console.log(to, from);
			next();
		},
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
		alias: "/dash",
		children: [
			// Future nested routes can be added here
			// {
			// 	path: "/watches",
			// 	name: "watches",
			// 	componens: {
			// 		default: DashboardView,
			// 		// Deferent footer for dashboard Page
			// 		footer: DashboardFooter,
			// 	},
			// 	meta: { requiresAuth: true },
			// 	alias: "/watches",
			// },
		],
	},
	{
		path: "/group/:id",
		name: "group-detail",
		component: GroupDetailView,
		meta: { requiresAuth: true },
		// TODO: Enable props passing if needed
		// props: true,
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
