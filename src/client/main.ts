// The Project Style Files
import "./styles/vendor/tailwind.css";
import "./styles/main.sass";
import "vue-toastification/dist/index.css";
import "tippy.js/dist/tippy.css";

import { createApp, provide } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./apollo";

import App from "./App.vue";
import router from "./router/index";
import { useAuthStore } from "@/features/auth/auth.store";

import Toast from "vue-toastification";
import VueTippy from "vue-tippy";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast, {
	position: "bottom-right",
	timeout: 3000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: false,
	closeButton: "button",
	icon: true,
	rtl: false
});
app.use(VueTippy, {
	directive: "tippy",
	component: "tippy",
});

// Provide Apollo Client to the entire app
app.provide(DefaultApolloClient, apolloClient);

// Check authentication status on app init
const authStore = useAuthStore();
authStore.checkAuth();

app.mount("#app");
