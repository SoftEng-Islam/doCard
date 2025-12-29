<template>
  <div class="flex flex-col">
    <!-- Hero Section -->
    <section class="hero min-h-[90vh] bg-base-100 relative overflow-hidden">
      <!-- Background Accents -->
      <div class="absolute inset-0 pointer-events-none opacity-40">
        <div class="absolute top-[-20%] right-[-10%] size-[800px] rounded-full bg-primary/20 blur-[150px] animate-pulse"></div>
        <div class="absolute bottom-[-20%] left-[-10%] size-[800px] rounded-full bg-secondary/20 blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div class="hero-content text-center z-10">
        <div class="max-w-3xl">
          <div class="badge badge-primary badge-outline font-black uppercase tracking-tighter mb-4 py-3 px-4 h-auto animate-bounce">Version 2.0 Now Live</div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Master Anything <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Faster than ever</span>
          </h1>
          <p class="text-xl md:text-2xl opacity-60 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate open-source flashcard platform powered by GraphQL. Simple, beautiful, and built for retention.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link to="/register" class="btn btn-primary btn-lg px-12 rounded-2xl shadow-xl shadow-primary/30 font-black uppercase tracking-tight">
              Get Started Free
            </router-link>
            <router-link to="/login" class="btn btn-ghost btn-lg px-10 font-bold uppercase tracking-tight border-base-300">
              Sign In
            </router-link>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-base-300 border-dashed">
            <div>
              <div class="text-4xl font-black tracking-tighter">100%</div>
              <div class="text-[10px] font-bold uppercase tracking-widest opacity-40">Open Source</div>
            </div>
            <div>
              <div class="text-4xl font-black tracking-tighter">24/7</div>
              <div class="text-[10px] font-bold uppercase tracking-widest opacity-40">GraphQL Powered</div>
            </div>
            <div>
              <div class="text-4xl font-black tracking-tighter">∞</div>
              <div class="text-[10px] font-bold uppercase tracking-widest opacity-40">Learning Space</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-base-200/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-[11px] font-bold uppercase tracking-widest opacity-40 mb-4">Core Ecosystem</h2>
          <h3 class="text-4xl font-black tracking-tighter uppercase px-1">Engineered for Performance</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card card-border border-base-300 bg-base-100 hover:border-primary/50 transition-colors shadow-sm">
            <div class="card-body gap-4 p-8">
              <div class="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold tracking-tight">Lightning Fast</h4>
              <p class="text-sm opacity-60 leading-relaxed">Built with Vite and Vue 3 for sub-millisecond interaction speeds and a seamless user experience.</p>
            </div>
          </div>

          <div class="card card-border border-base-300 bg-base-100 hover:border-primary/50 transition-colors shadow-sm">
            <div class="card-body gap-4 p-8">
              <div class="size-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 0 1 8.716 2.253M12 3a9.015 9.015 0 0 0-8.716 2.253m0 0L4.25 12l5.75 3m0 0-4.006 3.433" />
                </svg>
              </div>
              <h4 class="text-xl font-bold tracking-tight">Global Schema</h4>
              <p class="text-sm opacity-60 leading-relaxed">Modern GraphQL API ensures efficient data retrieval and real-time updates across your entire workspace.</p>
            </div>
          </div>

          <div class="card card-border border-base-300 bg-base-100 hover:border-primary/50 transition-colors shadow-sm">
            <div class="card-body gap-4 p-8">
              <div class="size-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25" />
                </svg>
              </div>
              <h4 class="text-xl font-bold tracking-tight">3D Integration</h4>
              <p class="text-sm opacity-60 leading-relaxed">Revolutionary 3D flashcard interaction system designed to maximize visual memory and recall.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-24 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="card card-border border-base-300 bg-neutral text-neutral-content p-12 text-center rounded-3xl overflow-hidden relative">
          <div class="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <h2 class="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Ready to evolve?</h2>
          <p class="text-lg opacity-80 mb-10 max-w-xl mx-auto font-medium">Join thousands of students and professionals mastering new skills with doCard today.</p>
          <router-link to="/register" class="btn btn-primary btn-lg px-12 rounded-2xl font-black shadow-xl shadow-primary/20">Create My Board</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
