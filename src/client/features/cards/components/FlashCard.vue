<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	card: any;
}>();

const emit = defineEmits<{
	(e: 'delete', id: string): void;
}>();

const flipped = ref(false);
</script>

<template>
	<div class="flashcard-container perspective-1000 w-full min-h-[400px] cursor-pointer" @click="flipped = !flipped">
		<div class="flashcard-inner relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl rounded-3xl" :class="{ 'rotate-y-180': flipped }">
			<!-- Front Side -->
			<div class="flashcard-front absolute inset-0 backface-hidden card border-2 border-base-300 bg-base-100 flex flex-col items-center justify-center p-8 text-center ring-1 ring-base-content/5 z-20">
				<div class="absolute top-6 left-6 badge badge-ghost badge-sm font-bold opacity-30 tracking-widest uppercase">Question</div>

				<div class="grow flex items-center justify-center w-full">
					<h2 class="text-4xl font-black tracking-tighter text-primary leading-tight line-clamp-6">
						{{ card.word }}
					</h2>
				</div>

				<div class="flex flex-col items-center gap-2 animate-bounce opacity-25 mt-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					<span class="text-[10px] font-bold uppercase tracking-widest">Flip to reveal</span>
				</div>
			</div>

			<!-- Back Side -->
			<div class="flashcard-back absolute inset-0 backface-hidden rotate-y-180 card border-2 border-primary/30 bg-primary/5 flex flex-col items-center justify-center p-8 text-center ring-1 ring-primary/20 backdrop-blur-xl z-10">
				<div class="absolute top-6 left-6 badge badge-primary badge-sm font-bold tracking-widest uppercase">Answer</div>

				<div class="grow flex items-center justify-center w-full px-4 overflow-y-auto custom-scrollbar">
					<p class="text-2xl font-bold leading-relaxed opacity-90">
						{{ card.meaning }}
					</p>
				</div>

				<!-- Delete Button -->
				<div class="absolute top-4 right-4 z-30">
					<button class="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/20" @click.stop="emit('delete', card._id)" v-tippy="{ content: 'Delete this flashcard', placement: 'left' }">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.perspective-1000 {
	perspective: 1000px;
}

.transform-style-3d {
	transform-style: preserve-3d;
}

.backface-hidden {
	backface-visibility: hidden;
}

.rotate-y-180 {
	transform: rotateY(180deg);
}

.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: hsl(var(--p) / 0.3);
	border-radius: 10px;
}
</style>
