<script setup>
import { ref, watch } from 'vue';
import Flashcard from './Flashcard.vue';
import api from '@/services/api';

const props = defineProps({
	cards: Array
});

const emit = defineEmits(['delete']);

const index = ref(0);

watch(
	() => props.cards.length,
	() => {
		if (index.value >= props.cards.length) {
			index.value = 0;
		}
	}
);

async function remove(id) {
	await api.deleteCard(id);
	emit('delete', id);
}

function next() {
	if (!props.cards.length) return;
	index.value = (index.value + 1) % props.cards.length;
}
</script>

<template>
	<div v-if="cards.length" class="space-y-4">
		<Flashcard :card="cards[index]" @delete="remove" />

		<button @click="next" class="border px-4 py-2">
			Next
		</button>

		<p class="text-sm text-gray-500">
			{{ index + 1 }} / {{ cards.length }}
		</p>
	</div>

	<p v-else>No cards yet</p>
</template>
