<template>
  <div class="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
    <div v-if="group" class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard" class="btn btn-circle btn-ghost btn-sm text-base-content/50 hover:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </router-link>
          <h1 class="text-4xl font-black tracking-tighter">{{ group.name }}</h1>
        </div>
        <p class="text-base-content/60 font-medium max-w-2xl pl-12">{{ group.description }}</p>
      </div>

      <div class="flex items-center gap-3 pl-12 md:pl-0">
        <button @click="showAddCardModal = true" class="btn btn-outline font-bold">
           Add Card
        </button>
        <router-link :to="`/study/${group._id}`" class="btn btn-primary font-bold shadow-lg shadow-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Start Study
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="flex justify-center p-20">
       <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Cards Stats -->
    <div v-if="group" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat bg-base-100 shadow-sm rounded-2xl border border-base-200">
            <div class="stat-title font-bold text-xs uppercase tracking-widest opacity-60">Total Cards</div>
            <div class="stat-value text-primary">{{ cards.length }}</div>
        </div>
    </div>

    <!-- Cards Grid -->
    <div v-if="group && cards.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="card in cards" :key="card._id" class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all group">
        <div class="card-body p-6">
          <div class="flex justify-between items-start mb-2">
             <span class="badge badge-ghost badge-xs font-bold tracking-wider uppercase opacity-50">Term</span>
             <button @click="deleteCard(card._id)" class="btn btn-ghost btn-xs btn-circle text-error opacity-0 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                 <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149-.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
               </svg>
             </button>
          </div>
          <h3 class="font-black text-xl mb-1 line-clamp-2">{{ card.word }}</h3>
          <div class="divider my-2"></div>
          <p class="opacity-70 text-sm line-clamp-3 leading-relaxed">{{ card.meaning }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="group" class="text-center py-20 opacity-40">
        <h3 class="text-xl font-bold mb-2">No cards yet</h3>
        <p>Create your first card to get started</p>
    </div>

    <!-- Add Card Modal -->
    <ModalDialog :show="showAddCardModal" @close="showAddCardModal = false">
       <template #title>Add New Card</template>
       <template #default>
          <CardForm :group-id="group._id" @success="onCardAdded" />
       </template>
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import groupsService from '@/features/groups/services/groups.service';
import cardsService from '@/features/cards/services/cards.service';
import ModalDialog from '@/features/shared/ui/ModalDialog.vue';
import CardForm from '@/features/cards/components/CardForm.vue';
import type { IGroup, ICard } from 'shared/types/models';

const route = useRoute();
const groupId = route.params.id as string;

const group = ref<IGroup | null>(null);
const cards = ref<ICard[]>([]);
const loading = ref(true);
const showAddCardModal = ref(false);

async function fetchData() {
    loading.value = true;
    try {
        const [groupData, cardsData] = await Promise.all([
            groupsService.getGroup(groupId),
            cardsService.getCards(groupId)
        ]);
        group.value = groupData;
        cards.value = cardsData;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}

function onCardAdded(newCard: ICard) {
    cards.value.unshift(newCard);
    showAddCardModal.value = false;
}

async function deleteCard(id: string) {
    if(!confirm('Are you sure?')) return;
    try {
        await cardsService.deleteCard(id);
        cards.value = cards.value.filter(c => c._id !== id);
    } catch(e) {
        console.error(e);
    }
}

onMounted(fetchData);
</script>
