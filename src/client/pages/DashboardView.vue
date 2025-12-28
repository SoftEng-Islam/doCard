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
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h2 class="text-xl font-semibold mb-4">Create New Card</h2>
                <CardForm @success="onCardCreated" />
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-4">Your Cards</h2>
                <div v-if="loading" class="flex justify-center py-8">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>
                <CardList v-else :cards="cards" @delete="onCardDeleted" />
            </div>
        </div>
    </div>
</template>
