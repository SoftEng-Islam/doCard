<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
		<!-- Animated background -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
			<div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
		</div>

		<!-- Login card -->
		<div class="relative w-full max-w-md">
			<div class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
				<!-- Logo/Header -->
				<div class="text-center mb-8">
					<h1 class="text-4xl font-bold text-white mb-2">Welcome Back</h1>
					<p class="text-white/80">Sign in to continue to doCard</p>
				</div>

				<!-- Error message -->
				<div v-if="error" class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm">
					{{ error }}
				</div>

				<!-- Login form -->
				<form @submit.prevent="handleLogin" class="space-y-6">
					<!-- Email input -->
					<div class="space-y-2">
						<label class="block text-sm font-medium text-white/90">Email</label>
						<input
							v-model="email"
							type="email"
							required
							placeholder="your@email.com"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
						/>
					</div>

					<!-- Password input -->
					<div class="space-y-2">
						<label class="block text-sm font-medium text-white/90">Password</label>
						<input
							v-model="password"
							type="password"
							required
							placeholder="••••••••"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
						/>
					</div>

					<!-- Submit button -->
					<button
						type="submit"
						:disabled="loading"
						class="w-full py-3 px-6 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<span v-if="loading">Signing in...</span>
						<span v-else>Sign In</span>
					</button>
				</form>

				<!-- Register link -->
				<div class="mt-6 text-center">
					<p class="text-white/80">
						Don't have an account?
						<router-link to="/register" class="text-white font-semibold hover:underline ml-1">
							Sign up
						</router-link>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
	error.value = '';
	loading.value = true;

	try {
		const success = await authStore.login(email.value, password.value);

		if (success) {
			// Redirect to dashboard or the page they were trying to access
			const redirect = router.currentRoute.value.query.redirect as string;
			router.push(redirect || '/dashboard');
		} else {
			error.value = authStore.error || 'Login failed. Please try again.';
		}
	} catch (err: any) {
		error.value = 'An unexpected error occurred. Please try again.';
		console.error('Login error:', err);
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
.delay-1000 {
	animation-delay: 1s;
}
</style>
