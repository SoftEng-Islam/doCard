<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGroupsStore } from '@/features/groups/groups.store';
import GroupCard from '@/features/groups/components/GroupCard.vue';
import GroupForm from '@/features/groups/components/GroupForm.vue';
import ModalDialog from '@/features/shared/ui/ModalDialog.vue';

const groupsStore = useGroupsStore();
const showCreateModal = ref(false);

onMounted(() => {
    groupsStore.fetchGroups();
});

function onGroupCreated() {
    showCreateModal.value = false;
}
</script>

<template>
  <div class="max-w-7xl mx-auto flex flex-col gap-8 p-6 md:p-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black tracking-tighter uppercase mb-2">My <span class="text-primary">Groups</span></h1>
        <p class="text-base-content/60 font-medium">Manage your study decks and collections.</p>
      </div>
      <button @click="showCreateModal = true" class="btn btn-primary font-bold shadow-lg shadow-primary/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Group
      </button>
    </div>

    <!-- Groups Grid -->
    <div v-if="groupsStore.loading" class="flex justify-center p-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="groupsStore.groups.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GroupCard v-for="group in groupsStore.groups" :key="group._id" :group="group" />
    </div>

    <div v-else class="text-center py-20 border-2 border-dashed border-base-300 rounded-3xl opacity-60">
        <div class="flex flex-col items-center gap-4">
            <div class="size-16 bg-base-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            </div>
            <h3 class="text-xl font-bold">No groups yet</h3>
            <button @click="showCreateModal = true" class="btn btn-outline btn-sm">Create your first group</button>
        </div>
    </div>

    <!-- Create Modal -->
    <ModalDialog :show="showCreateModal" @close="showCreateModal = false">
        <template #title>Create New Group</template>
        <GroupForm @success="onGroupCreated" @cancel="showCreateModal = false" />
    </ModalDialog>
  </div>
</template>
