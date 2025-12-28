// The Project Style Files
import './styles/vendor/tailwind.css';
import './styles/vendor/daisyui.css';
import './styles/main.sass';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth.store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Check authentication status on app init
const authStore = useAuthStore();
authStore.checkAuth();

app.mount('#app');
