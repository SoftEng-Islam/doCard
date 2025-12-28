<script setup>
import { ref } from 'vue';

const props = defineProps({
	card: Object
});

const emit = defineEmits(['delete']);
const flipped = ref(false);
</script>

<template>
	<div class="border p-6 text-center cursor-pointer" @click="flipped = !flipped">
		<p class="text-lg">
			{{ flipped ? card.meaning : card.word }}
		</p>

		<button class="mt-4 text-red-500 text-sm" @click.stop="emit('delete', card._id)">
			Delete
		</button>
	</div>
</template>
