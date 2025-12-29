<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-base-300 relative overflow-hidden">
    <!-- Animated Mesh Gradient Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] right-[-10%] size-[800px] rounded-full bg-secondary/20 blur-[150px] animate-pulse"></div>
      <div class="absolute bottom-[-20%] left-[-10%] size-[800px] rounded-full bg-primary/20 blur-[150px] animate-pulse delay-700"></div>
      <div class="absolute top-[20%] left-[10%] size-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse delay-1000"></div>
    </div>

    <!-- Grainy Noise Overlay -->
    <div class="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Glow Effect Behind Card -->
      <div class="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div class="card card-border border-base-content/10 bg-base-100/70 backdrop-blur-2xl card-md w-full overflow-hidden shadow-2xl rounded-[2rem] ring-1 ring-white/10">
        <!-- Card Header -->
        <div class="card-body gap-8 p-10 pt-12">
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <div class="absolute -inset-2 bg-secondary/20 rounded-2xl blur-lg animate-pulse"></div>
              <div class="size-16 bg-secondary rounded-2xl flex items-center justify-center text-secondary-content relative shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25V13.5a.75.75 0 0 0 1.5 0V11.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                </svg>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h1 class="text-4xl font-black tracking-tighter uppercase leading-none">Join do<span class="text-primary">Card</span></h1>
              <p class="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Establish Your Learning Node</p>
            </div>
          </div>

          <!-- Status Alerts -->
          <TransitionGroup name="fade">
            <div v-if="error" key="error" class="alert alert-error alert-sm font-bold bg-error/10 border-error/20 text-error backdrop-blur-md rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>
            <div v-if="success" key="success" class="alert alert-success alert-sm font-bold bg-success/10 border-success/20 text-success backdrop-blur-md rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Registration completed. Initializing...</span>
            </div>
          </TransitionGroup>

          <form @submit.prevent="handleRegister" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 px-1">Identity Handle</label>
              <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 opacity-30 group-focus-within:opacity-100 group-focus-within:text-secondary transition-all">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input v-model="username" type="text" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30" placeholder="e.g. neuro_link" />
              </label>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 px-1">Email Endpoint</label>
              <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 opacity-30 group-focus-within:opacity-100 group-focus-within:text-secondary transition-all">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input v-model="email" type="email" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30" placeholder="node@company.io" />
              </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 px-1">Credential</label>
                <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group">
                  <input v-model="password" type="password" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30 px-1" placeholder="••••••••" />
                </label>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 px-1">Confirm</label>
                <label class="input input-lg bg-base-200/50 border-base-content/5 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10 transition-all duration-300 flex items-center gap-4 rounded-2xl group" :class="{ 'border-error/50 bg-error/5': passwordMismatch }">
                  <input v-model="confirmPassword" type="password" required class="grow text-sm font-semibold placeholder:font-medium placeholder:opacity-30 px-1" placeholder="••••••••" />
                </label>
              </div>
            </div>

            <button type="submit" :disabled="loading || passwordMismatch" class="btn btn-secondary btn-lg w-full mt-2 rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98] transition-all duration-200 group relative overflow-hidden h-16 border-none">
              <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 transition-transform"></div>
              <span v-if="loading" class="loading loading-spinner loading-md"></span>
              <span v-else class="relative z-10 font-black uppercase tracking-widest text-sm">Deploy Account</span>
            </button>
          </form>

          <div class="mt-4 text-center">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-tight">
              By deploying, you accept our
              <a href="#" class="text-secondary hover:underline ml-1">Governance Tokens</a> & <a href="#" class="text-secondary hover:underline">Privacy Layer</a>
            </p>
            <div class="divider my-6 border-base-content/5 opacity-20"></div>
            <p class="text-[11px] font-bold opacity-40 uppercase tracking-tight">
              Already registered? <router-link to="/login" class="text-secondary hover:text-secondary/70 font-black transition-colors underline decoration-2 underline-offset-4 ml-1">Connect Node</router-link>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Tags -->
      <div class="flex justify-center gap-6 mt-8 opacity-20 text-[9px] font-bold uppercase tracking-[0.4em]">
        <span>Decentralized</span>
        <span>Redundant</span>
        <span>Encrypted</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/features/auth/auth.store';

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

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  if (password.value.length < 6) {
    error.value = 'Security requirement: 6+ characters';
    return;
  }

  if (username.value.length < 3) {
    error.value = 'Identity handle: 3+ characters';
    return;
  }

  loading.value = true;

  try {
    const result = await authStore.register(username.value, email.value, password.value);

    if (result) {
      success.value = true;
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      error.value = authStore.error || 'Registration failed. Check network protocols.';
    }
  } catch (err: any) {
    error.value = 'System anomaly detected. Recovery in progress.';
    console.error('Registration error:', err);
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
