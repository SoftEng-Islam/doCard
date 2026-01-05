<script setup lang="ts">
import { useAuthStore } from '@/features/auth/auth.store';
import NavBar from '@/features/shared/layout/NavBar.vue';
const authStore = useAuthStore();

// If the use already login show the sidebar
const showSidebar = authStore.isAuthenticated;
</script>

<template>
	<div class="drawer lg:drawer-open">
		<input id="main-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col min-h-screen bg-base-200/30">
			<!-- Navbar (Only visible on mobile if using drawer-open on lg) -->
			<!-- But we want it visible or integrated. Let's keep it in the content area with conditional lg padding if needed -->
			<NavBar />

			<!-- Main Content -->
			<main class="flex-grow p-4 md:p-8">
				<slot />
			</main>

			<!-- Footer -->
			<footer class="footer footer-center p-6 bg-base-100 text-base-content border-t border-base-300 border-dashed">
				<aside>
					<div class="flex items-center gap-2 mb-2">
						<div class="size-6 bg-primary rounded shadow-sm"></div>
						<p class="font-bold">doCard</p>
					</div>
					<p>Copyright © {{ new Date().getFullYear() }} - All right reserved</p>
				</aside>
			</footer>
		</div>

		<!-- Sidebar -->
		<div v-if="showSidebar" class="drawer-side z-50">
			<label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<div class="menu p-4 w-80 min-h-full bg-base-100 border-r border-base-300 border-dashed text-base-content flex flex-col gap-4">
				<div class="px-2 py-4 flex items-center gap-3">
					<div class="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-content shadow-lg shadow-primary/20">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
							<path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Z" />
						</svg>
					</div>
					<span class="text-2xl font-black tracking-tighter uppercase">do<span class="text-primary">Card</span></span>
				</div>

				<ul class="flex flex-col gap-1">
					<li class="menu-title opacity-40 text-xs font-bold uppercase tracking-widest mt-4">Main Navigation</li>
					<li>
						<RouterLink to="/dashboard" class="flex items-center gap-3 rounded-lg py-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
							</svg>
							Dashboard
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/" class="flex items-center gap-3 rounded-lg py-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
							</svg>
							Home Page
						</RouterLink>
					</li>
				</ul>

				<div class="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
					<p class="text-xs font-medium text-primary mb-1 text-center">Pro Features</p>
					<p class="text-[10px] opacity-60 text-center mb-3">Upgrade to unlock advanced card management</p>
					<button class="btn btn-primary btn-sm btn-block shadow-lg shadow-primary/20">Upgrade Now</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.router-link-active {
	background-color: var(--color-primary) !important;
	color: var(--color-primary-content) !important;
	font-weight: 600;
	box-shadow: 0 4px 6px -1px var(--color-primary/10);
}
</style>
