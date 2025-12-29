<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
    <div class="relative mb-8">
      <div class="text-[180px] md:text-[240px] font-black tracking-tighter opacity-[0.03] select-none leading-none">404</div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="size-32 bg-error/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="text-6xl md:text-8xl font-black tracking-tighter uppercase text-base-content leading-none">Oops<span class="text-error">.</span></div>
      </div>
    </div>

    <div class="max-w-md">
      <h1 class="text-2xl font-bold tracking-tight mb-3">Page Not Found</h1>
      <p class="text-sm opacity-60 mb-10 leading-relaxed font-semibold">
        It looks like the resource you're searching for has been moved or deleted. Our engineers have been notified.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link to="/" class="btn btn-primary btn-md px-8 font-black uppercase tracking-tight shadow-lg shadow-primary/20">
          Return Home
        </router-link>
        <button @click="$router.go(-1)" class="btn btn-ghost btn-md px-8 font-bold uppercase tracking-tight border-base-300">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
