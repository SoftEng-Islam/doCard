<script setup lang="ts">


const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function close() {
  emit('close');
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="close"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-base-100 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
       <!-- Header -->
       <div class="flex items-center justify-between p-4 border-b border-base-200 bg-base-100/50">
          <h3 class="font-bold text-lg tracking-tight"><slot name="title"></slot></h3>
          <button @click="close" class="btn btn-sm btn-circle btn-ghost">✕</button>
       </div>

       <!-- Body -->
       <div class="p-6">
          <slot></slot>
       </div>
    </div>
  </div>
</template>
