<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg text-primary"></div>

    <div v-else-if="cards.length > 0" class="w-full max-w-2xl space-y-8">
       <div class="flex items-center justify-between">
         <router-link :to="`/groups/${groupId}`" class="btn btn-ghost btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Group
         </router-link>
         <h2 class="font-bold text-sm uppercase tracking-widest opacity-50">Study Session</h2>
       </div>

       <!-- Study Component -->
       <CardList :cards="cards" @delete="onCardDeleted" />
    </div>

    <div v-else class="text-center space-y-4">
        <h2 class="text-2xl font-bold">No cards to study</h2>
        <p class="opacity-60">Add some cards to this group first.</p>
        <router-link :to="`/groups/${groupId}`" class="btn btn-primary">Go to Group</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import cardsService from '@/features/cards/services/cards.service';
import CardList from '@/features/cards/components/CardList.vue';
import type { ICard } from 'shared/types/models';

const route = useRoute();
const groupId = route.params.id as string;

const cards = ref<ICard[]>([]);
const loading = ref(true);

async function fetchCards() {
    loading.value = true;
    try {
        cards.value = await cardsService.getCards(groupId);
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}

function onCardDeleted(id: string) {
    cards.value = cards.value.filter(c => c._id !== id);
}

onMounted(fetchCards);
</script>
