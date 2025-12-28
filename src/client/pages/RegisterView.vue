<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-4">
		<!-- Animated background -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
			<div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-20 -left-20 animate-pulse delay-1000"></div>
		</div>

		<!-- Register card -->
		<div class="relative w-full max-w-md">
			<div class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
				<!-- Logo/Header -->
				<div class="text-center mb-8">
					<h1 class="text-4xl font-bold text-white mb-2">Create Account</h1>
					<p class="text-white/80">Sign up to get started with doCard</p>
				</div>

				<!-- Error message -->
				<div v-if="error" class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm">
					{{ error }}
				</div>

				<!-- Success message -->
				<div v-if="success" class="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-100 text-sm">
					Account created successfully! Redirecting...
				</div>

				<!-- Register form -->
				<form @submit.prevent="handleRegister" class="space-y-6">
					<!-- Username input -->
					<div class="space-y-2">
						<label class="block text-sm font-medium text-white/90">Username</label>
						<input
							v-model="username"
							type="text"
							required
							minlength="3"
							placeholder="johndoe"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
						/>
					</div>

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
							minlength="6"
							placeholder="••••••••"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
						/>
						<p class="text-xs text-white/60">Minimum 6 characters</p>
					</div>

					<!-- Confirm Password input -->
					<div class="space-y-2">
						<label class="block text-sm font-medium text-white/90">Confirm Password</label>
						<input
							v-model="confirmPassword"
							type="password"
							required
							placeholder="••••••••"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
							:class="{ 'border-red-500/50': passwordMismatch }"
						/>
						<p v-if="passwordMismatch" class="text-xs text-red-300">Passwords do not match</p>
					</div>

					<!-- Submit button -->
					<button
						type="submit"
						:disabled="loading || passwordMismatch"
						class="w-full py-3 px-6 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<span v-if="loading">Creating account...</span>
						<span v-else>Sign Up</span>
					</button>
				</form>

				<!-- Login link -->
				<div class="mt-6 text-center">
					<p class="text-white/80">
						Already have an account?
						<router-link to="/login" class="text-white font-semibold hover:underline ml-1">
							Sign in
						</router-link>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

const passwordMismatch = computed(() => {
	return confirmPassword.value.length > 0 && password.value !== confirmPassword.value;
});

const handleRegister = async () => {
	error.value = '';
	success.value = false;

	// Validate passwords match
	if (password.value !== confirmPassword.value) {
		error.value = 'Passwords do not match';
		return;
	}

	// Validate password length
	if (password.value.length < 6) {
		error.value = 'Password must be at least 6 characters';
		return;
	}

	// Validate username length
	if (username.value.length < 3) {
		error.value = 'Username must be at least 3 characters';
		return;
	}

	loading.value = true;

	try {
		const result = await authStore.register(username.value, email.value, password.value);

		if (result) {
			success.value = true;
			// Redirect to dashboard after a brief delay
			setTimeout(() => {
				router.push('/dashboard');
			}, 1500);
		} else {
			error.value = authStore.error || 'Registration failed. Please try again.';
		}
	} catch (err: any) {
		error.value = 'An unexpected error occurred. Please try again.';
		console.error('Registration error:', err);
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
