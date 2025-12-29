// The Project Style Files
import "./styles/vendor/tailwind.css";
import "./styles/main.sass";

import { createApp, provide } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./apollo";

import App from "./App.vue";
import router from "./router/index";
import { useAuthStore } from "@/features/auth/auth.store";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Provide Apollo Client to the entire app
app.provide(DefaultApolloClient, apolloClient);

// Check authentication status on app init
const authStore = useAuthStore();
authStore.checkAuth();

app.mount("#app");
