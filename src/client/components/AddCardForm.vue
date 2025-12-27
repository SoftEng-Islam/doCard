<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const emit = defineEmits(['created']);

const word = ref('');
const meaning = ref('');
const error = ref(null);

async function submit() {
	error.value = null;

	if (!word.value || !meaning.value) {
		error.value = 'Both fields required';
		return;
	}

	const card = await api.createCard({
		word: word.value,
		meaning: meaning.value
	});

	emit('created', card);

	word.value = '';
	meaning.value = '';
}
</script>

<template>
	<form @submit.prevent="submit" class="space-y-2">
		<input v-model="word" placeholder="Word" class="border p-2 w-full" />
		<input v-model="meaning" placeholder="Meaning" class="border p-2 w-full" />
		<button class="bg-black text-white px-4 py-2">Add</button>
		<p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
	</form>
</template>
