<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/features/cards/services/cards.service';
import CardList from '@/features/cards/components/CardList.vue';
import CardForm from '@/features/cards/components/CardForm.vue';

import type { ICard } from 'shared/types/models';

const cards = ref<ICard[]>([]);
const loading = ref(true);

const fetchCards = async () => {
    try {
        loading.value = true;
        cards.value = await api.getCards();
    } catch (err) {
        console.error('Failed to fetch cards:', err);
    } finally {
        loading.value = false;
    }
};

const onCardCreated = (newCard: any) => {
    cards.value.unshift(newCard);
};

const onCardDeleted = (id: string) => {
    cards.value = cards.value.filter((c: any) => c._id !== id);
};

onMounted(fetchCards);
</script>

<template>
  <div class="max-w-6xl mx-auto flex flex-col gap-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="badge badge-primary badge-outline badge-sm font-black uppercase tracking-tighter">Live</div>
          <p class="text-[11px] font-bold uppercase tracking-widest opacity-40">Your Personal Repository</p>
        </div>
        <h1 class="text-4xl font-black tracking-tighter uppercase">Dash<span class="text-primary">board</span></h1>
      </div>

      <div class="flex items-center gap-2 text-sm font-medium opacity-60">
        <span class="badge badge-neutral badge-sm">{{ cards.length }}</span>
        <span>Total Flashcards</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Sidebar Column: Form -->
      <div class="lg:col-span-4 flex flex-col gap-6 sticky top-24">
        <CardForm @success="onCardCreated" />

        <div class="card card-border border-base-300 bg-base-100 card-sm shadow-sm hidden lg:flex">
          <div class="card-body p-4 text-xs opacity-60 italic">
            Tip: Use flashcards daily to significantly improve long-term retention of new terminology.
          </div>
        </div>
      </div>

      <!-- Main Column: Card Display -->
      <div class="lg:col-span-8">
        <div class="flex items-center justify-between mb-4 px-1">
          <h2 class="text-lg font-bold tracking-tight opacity-80 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            Active Session
          </h2>
        </div>

        <div v-if="loading" class="card card-border border-base-300 bg-base-100 min-h-[300px] flex items-center justify-center">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else-if="cards.length === 0" class="card card-border border-base-300 bg-base-100 min-h-[300px] flex items-center justify-center border-dashed">
          <div class="text-center p-8">
            <div class="size-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <p class="text-lg font-bold opacity-60">No flashcards yet</p>
            <p class="text-sm opacity-40">Add your first card using the form on the left</p>
          </div>
        </div>

        <CardList v-else :cards="cards" @delete="onCardDeleted" />
      </div>
    </div>
  </div>
</template>
