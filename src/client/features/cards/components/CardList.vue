<template>
	<div v-if="cards.length" class="flex flex-col gap-6 w-full">
		<div class="relative group">
			<Flashcard :key="cards[index]._id" :card="cards[index]" @delete="remove" />

			<!-- Overlay controls for mouse users -->
			<div class="absolute inset-y-0 left-0 flex items-center -ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
				<button @click="prev" class="btn btn-circle btn-primary btn-sm shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
			</div>
			<div class="absolute inset-y-0 right-0 flex items-center -mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
				<button @click="next" class="btn btn-circle btn-primary btn-sm shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Controls & Info -->
		<div class="card card-border border-base-300 bg-base-100 card-sm shadow-sm flex flex-row items-center justify-between gap-4 p-4 mt-2">
			<div class="flex items-center gap-2">
				<div class="radial-progress text-primary font-black text-[10px]" :style="`--value:${((index + 1) / cards.length) * 100}; --size: 3rem; --thickness: 4px;`" role="progressbar">
					{{ Math.round(((index + 1) / cards.length) * 100) }}%
				</div>
				<div class="flex flex-col">
					<span class="text-xs font-bold tracking-widest uppercase opacity-40 leading-none mb-1">Session Progress</span>
					<span class="text-sm font-black">{{ index + 1 }} <span class="opacity-30">of</span> {{ cards.length }}</span>
				</div>
			</div>

			<div class="flex gap-2">
				<button @click="prev" class="btn btn-ghost btn-sm hover:bg-base-200" title="Previous Card">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button @click="next" class="btn btn-primary btn-sm px-6 font-bold uppercase tracking-tight shadow-lg shadow-primary/20" title="Next Card">
					Next Card
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div v-else class="text-center py-20 opacity-40 italic">
		No flashcards available in this session.
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Flashcard from './FlashCard.vue';
import api from '@/features/cards/services/cards.service';

import type { ICard } from 'shared/types/models';

const props = defineProps<{
	cards: ICard[];
}>();

const emit = defineEmits<{
	(e: 'delete', id: string): void;
}>();

const index = ref(0);

watch(
	() => props.cards.length,
	() => {
		if (index.value >= props.cards.length) {
			index.value = 0;
		}
	}
);

async function remove(id: string) {
	await api.deleteCard(id);
	emit('delete', id);
}

function next() {
	if (!props.cards.length) return;
	index.value = (index.value + 1) % props.cards.length;
}

function prev() {
	if (!props.cards.length) return;
	index.value = (index.value - 1 + props.cards.length) % props.cards.length;
}
</script>
