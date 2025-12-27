<script setup>
import { ref, onMounted } from 'vue';
import AddCardForm from './components/AddCardForm.vue';
import FlashcardViewer from './components/FlashcardViewer.vue';
import api from './services/api';

const cards = ref([]);
const loading = ref(true);

async function loadCards() {
	loading.value = true;
	cards.value = await api.getCards();
	loading.value = false;
}

async function handleAdd(card) {
	cards.value.unshift(card);
}

async function handleDelete(id) {
	cards.value = cards.value.filter(c => c._id !== id);
}

onMounted(loadCards);
</script>

<template>
	<main class="max-w-md mx-auto p-4 space-y-6">
		<h1 class="text-xl font-bold">Flashcards</h1>

		<AddCardForm @created="handleAdd" />

		<p v-if="loading">Loading...</p>

		<FlashcardViewer v-else :cards="cards" @delete="handleDelete" />
	</main>
</template>
