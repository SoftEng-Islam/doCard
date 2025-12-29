<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-base-300 relative overflow-hidden">
    <!-- Animated Mesh Gradient Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] size-[800px] rounded-full bg-primary/20 blur-[150px] animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] size-[800px] rounded-full bg-secondary/20 blur-[150px] animate-pulse delay-700"></div>
      <div class="absolute top-[20%] right-[10%] size-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse delay-1000"></div>
    </div>

    <!-- Grainy Noise Overlay -->
    <div class="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Glow Effect Behind Card -->
      <div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div class="card card-border border-base-content/10 bg-base-100/70 backdrop-blur-2xl card-md w-full overflow-hidden shadow-2xl rounded-[2rem] ring-1 ring-white/10">
        <!-- Card Header -->
        <div class="card-body gap-8 p-10 pt-12">
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <div class="absolute -inset-2 bg-primary/20 rounded-2xl blur-lg animate-pulse"></div>
              <div class="size-16 bg-primary rounded-2xl flex items-center justify-center text-primary-content relative shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Z" />
                  <path fill-rule="evenodd" d="M2.25 6.75a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V6.75Zm4.5 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 3.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3-7.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h1 class="text-4xl font-black tracking-tighter uppercase leading-none">do<span class="text-primary">Card</span></h1>
              <p class="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Elite Asset Management</p>
            </div>
          </div>

          <!-- Error Alert -->
          <Transition name="fade">
            <div v-if="error" class="alert alert-error alert-sm font-bold bg-error/10 border-error/20 text-error backdrop-blur-md rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </Transition>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center px-1">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50">Authorized Email</label>
              </div>
              <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 opacity-30 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input v-model="email" type="email" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30" placeholder="access@docard.io" />
              </label>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center px-1">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50">Private Key</label>
                <button type="button" class="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">Forgot?</button>
              </div>
              <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 opacity-30 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                  <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
                </svg>
                <input v-model="password" type="password" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30" placeholder="••••••••••••" />
              </label>
            </div>

            <div class="flex items-center justify-between px-1">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input v-model="rememberMe" type="checkbox" class="checkbox checkbox-primary checkbox-sm rounded-lg" />
                <span class="text-[11px] font-bold uppercase tracking-tight opacity-50 group-hover:opacity-100 transition-opacity">Stay Connected</span>
              </label>
            </div>

            <button type="submit" :disabled="loading" class="btn btn-primary btn-lg w-full mt-2 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200 group relative overflow-hidden h-16 border-none">
              <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 transition-transform"></div>
              <span v-if="loading" class="loading loading-spinner loading-md"></span>
              <span v-else class="relative z-10 font-black uppercase tracking-widest text-sm">Initialize Access</span>
            </button>
          </form>

          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-base-content/5 border-dashed"></span></div>
            <div class="relative flex justify-center"><span class="bg-transparent px-4 text-[9px] font-black uppercase tracking-[0.3em] opacity-20">Network Protocols</span></div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button class="btn btn-ghost bg-base-200/50 hover:bg-base-200 border-base-content/5 rounded-2xl gap-3 text-[11px] font-black uppercase tracking-tight h-12">
              <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button class="btn btn-ghost bg-base-200/50 hover:bg-base-200 border-base-content/5 rounded-2xl gap-3 text-[11px] font-black uppercase tracking-tight h-12">
              <svg class="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Github
            </button>
          </div>

          <p class="text-[11px] font-bold text-center opacity-40 uppercase tracking-tight">
            New here? <router-link to="/register" class="text-primary hover:text-primary/70 font-black transition-colors underline decoration-2 underline-offset-4 ml-1">Establish Record</router-link>
          </p>
        </div>
      </div>

      <!-- Footer Tags -->
      <div class="flex justify-center gap-6 mt-8 opacity-20 text-[9px] font-bold uppercase tracking-[0.4em]">
        <span>Encrypted</span>
        <span>Secure</span>
        <span>Verified</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/features/auth/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    const success = await authStore.login(email.value, password.value);

    if (success) {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.2;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>
