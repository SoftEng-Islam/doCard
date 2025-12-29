<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center">
    <!-- Animated Icon -->
    <div class="relative mb-12 flex items-center justify-center">
      <div class="absolute inset-0 size-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
      <div class="size-20 bg-base-100 border border-base-300 border-dashed rounded-3xl flex items-center justify-center text-primary rotate-12 rotate-animation">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="badge badge-primary badge-outline font-black uppercase tracking-tighter mb-4 py-3 h-auto">Feature In Development</div>
    <h1 class="text-4xl font-black tracking-tighter uppercase mb-4">Group <span class="text-primary">Ecosystem</span></h1>
    <p class="text-sm font-medium opacity-60 leading-relaxed mb-10 px-4">
      We're currently architecting the Group Management system to allow seamless collaboration and deck sharing. GraphQL infrastructure is fully migrated and ready for launch.
    </p>

    <!-- Navigation -->
    <div class="flex items-center gap-4">
      <router-link to="/dashboard" class="btn btn-primary btn-md px-10 font-black uppercase tracking-tight shadow-lg shadow-primary/20">
        Return to Dashboard
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@keyframes rotate {
  0%, 100% { transform: rotate(12deg); }
  50% { transform: rotate(-5deg); }
}
.rotate-animation {
  animation: rotate 4s ease-in-out infinite;
}
</style>
