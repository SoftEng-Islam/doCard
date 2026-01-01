<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
    <!-- Hero Visualization -->
    <div class="relative w-full aspect-square max-w-md mb-12 group">
      <!-- Glow Background -->
      <div class="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse group-hover:bg-primary/30 transition-colors duration-700"></div>

      <!-- Central Hub -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="size-32 bg-base-100 border-2 border-primary/30 rounded-[2rem] flex items-center justify-center text-primary shadow-2xl z-20 transform group-hover:scale-110 transition-transform duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-10.5v10.5" />
          </svg>
        </div>

        <!-- Orbiting Icons -->
        <div v-for="(icon, index) in orbitIcons" :key="index"
             class="absolute size-12 bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl flex items-center justify-center text-primary/60 shadow-lg orbit-animation"
             :style="{
               '--delay': `${index * -3}s`,
               '--radius': '140px'
             }">
          <component :is="icon" class="size-6" />
        </div>
      </div>
    </div>

    <!-- Content Card -->
    <div class="card bg-base-100/50 backdrop-blur-sm border border-base-300 shadow-xl p-1 text-center overflow-hidden">
      <div class="card-body p-8 lg:p-12 items-center">
        <div class="badge badge-primary badge-outline font-black uppercase tracking-tighter mb-4 py-3 h-auto animate-bounce">
          Phase 2 Incoming
        </div>

        <h1 class="text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
          Group <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ecosystem</span>
        </h1>

        <p class="text-base lg:text-lg font-medium opacity-60 leading-relaxed mb-10 max-w-2xl">
          We're architecting a revolutionary way to organize your knowledge. Groups will feature <strong>smart-tagging</strong>,
          <strong>collaborative decks</strong>, and <strong>deep-link integration</strong>. Our GraphQL backbone is 100% ready.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <router-link to="/dashboard" class="btn btn-primary btn-lg px-12 font-black uppercase tracking-tight shadow-xl shadow-primary/20 w-full sm:w-auto">
            Back to Hub
          </router-link>

          <button class="btn btn-ghost btn-lg px-8 font-bold opacity-60 hover:opacity-100 transition-opacity" v-tippy="{ content: 'Join our early access beta for Groups' }">
            Notify Me
          </button>
        </div>
      </div>
    </div>

    <!-- Features Preview Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
      <div v-for="feature in previewFeatures" :key="feature.title" class="card bg-base-200/50 border border-base-300/50 p-6 flex flex-col gap-3 group/item">
        <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-primary-content transition-colors">
          <component :is="feature.icon" class="size-5" />
        </div>
        <h3 class="font-bold uppercase tracking-tight text-sm">{{ feature.title }}</h3>
        <p class="text-xs opacity-50 leading-relaxed">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';

const orbitIcons = [
  markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>' }),
  markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>' }),
  markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0-10.628a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0 12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/></svg>' }),
  markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/></svg>' }),
];

const previewFeatures = [
  {
    title: 'Smart Folders',
    description: 'Auto-categorize cards using AI-powered semantic analysis.',
    icon: markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.625-12.125L9.375 3.75h1.5l3.75-3z"/></svg>' })
  },
  {
    title: 'Shared Decks',
    description: 'Collaborate with friends or students in real-time on shared card sets.',
    icon: markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/></svg>' })
  },
  {
    title: 'Deep Analytics',
    description: 'Track group-wide performance and identify weak areas across entire decks.',
    icon: markRaw({ template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>' })
  }
];
</script>

<style scoped>
@keyframes orbit {
  from { transform: rotate(0deg) translateX(var(--radius)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg); }
}

.orbit-animation {
  animation: orbit 20s linear infinite;
  animation-delay: var(--delay);
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
