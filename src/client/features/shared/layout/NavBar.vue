<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeControllerMini from '../themeController/ThemeControllerMini.vue';
</script>

<template>
  <div class="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 border-b border-base-300 border-dashed">
    <div class="flex-none lg:hidden">
      <label for="main-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>

    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost px-2 gap-2 text-xl font-bold tracking-tight">
        <div class="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-content shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Z" />
            <path fill-rule="evenodd" d="M2.25 6.75a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V6.75Zm4.5 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 3.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3-7.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
        </div>
        do<span class="text-primary">Card</span>
      </RouterLink>
    </div>

    <div class="flex-none hidden lg:block mr-4">
      <ul class="menu menu-horizontal p-0 gap-1">
        <li>
          <RouterLink to="/dashboard" active-class="menu-active" class="rounded-lg">Dashboard</RouterLink>
        </li>
      </ul>
    </div>

    <div class="flex-none gap-3 items-center">
      <ThemeControllerMini />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-base-300">
          <div class="w-10 rounded-full">
            <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
          <li><a class="justify-between">Profile<span class="badge badge-primary badge-sm">New</span></a></li>
          <li><a>Settings</a></li>
          <li><a class="text-error">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-active {
  background-color: var(--color-primary);
  color: var(--color-primary-content) !important;
}
</style>
