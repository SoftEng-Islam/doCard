<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center">
    <!-- Animated Icon -->
    <div class="relative mb-12 flex items-center justify-center animate-bounce">
      <div class="absolute inset-0 size-32 bg-secondary/10 rounded-full blur-2xl"></div>
      <div class="size-20 bg-base-100 border border-base-300 border-dashed rounded-3xl flex items-center justify-center text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="badge badge-secondary badge-outline font-black uppercase tracking-tighter mb-4 py-3 h-auto">Advanced Module</div>
    <h1 class="text-4xl font-black tracking-tighter uppercase mb-4">Study <span class="text-secondary">Simulator</span></h1>
    <p class="text-sm font-medium opacity-60 leading-relaxed mb-10 px-4">
      The AI-driven spaced repetition simulator is currently undergoing final calibration. This engine will analyze your recall patterns and optimize your study schedule.
    </p>

    <!-- Navigation -->
    <div class="flex items-center gap-4">
      <router-link to="/dashboard" class="btn btn-secondary btn-md px-10 font-black uppercase tracking-tight shadow-lg shadow-secondary/20">
        Return to Dashboard
      </router-link>
    </div>
  </div>
</template>
