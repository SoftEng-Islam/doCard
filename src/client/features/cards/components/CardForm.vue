<script setup lang="ts">
import { ref } from 'vue';
import api from '@/features/cards/services/cards.service';

const emit = defineEmits<{
	(e: 'success', card: any): void;
}>();

const word = ref('');
const meaning = ref('');
const error = ref<string | null>(null);

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

	emit('success', card);

	word.value = '';
	meaning.value = '';
}
</script>

<template>
  <div class="card card-border border-base-300 bg-base-100 card-sm shadow-md overflow-hidden">
    <div class="border-b border-base-300 border-dashed bg-base-200/30">
      <div class="flex items-center gap-2 p-4">
        <div class="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <span class="text-sm font-bold tracking-tight uppercase opacity-70">Add New Card</span>
      </div>
    </div>

    <form @submit.prevent="submit" class="card-body gap-4 p-5">
      <div v-if="error" class="alert alert-error alert-sm font-medium py-2">
        <span>{{ error }}</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-[10px] font-bold uppercase tracking-widest opacity-50 px-1">Term / Word</label>
        <label class="input input-border flex items-center gap-2">
          <input v-model="word" type="text" placeholder="e.g. Ephemeral" class="grow text-sm" />
        </label>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-[10px] font-bold uppercase tracking-widest opacity-50 px-1">Definition / Meaning</label>
        <textarea v-model="meaning" class="textarea textarea-border h-24 text-sm resize-none" placeholder="Enter meaning here..."></textarea>
      </div>

      <button type="submit" class="btn btn-primary btn-sm btn-block mt-2 font-bold uppercase tracking-tight shadow-lg shadow-primary/20">
        Create Flashcard
      </button>
    </form>
  </div>
</template>
