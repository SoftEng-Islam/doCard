<script setup lang="ts">
import type { IGroup } from 'shared/types/models';
import { useGroupsStore } from '@/features/groups/groups.store';
import { useToast } from 'vue-toastification';

const props = defineProps<{
    group: IGroup;
}>();

const store = useGroupsStore();
const toast = useToast();

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this group?')) return;

    try {
        await store.deleteGroup(props.group._id);
        toast.success('Group deleted');
    } catch (err) {
        toast.error('Failed to delete group');
    }
}
</script>

<template>
    <div class="card bg-base-100 border border-base-200 hover:shadow-lg transition-all hover:-translate-y-1 h-full">
        <div class="card-body">
            <h3 class="card-title font-black tracking-tight text-xl">{{ group.name }}</h3>
            <p class="text-xs opacity-50 uppercase font-bold tracking-widest mb-2">
                {{ group.cardCount || 0 }} Cards
            </p>
            <p class="text-sm opacity-70 line-clamp-2 block mb-4 flex-grow">{{ group.description || 'No description' }}</p>

            <div class="card-actions justify-end mt-auto gap-2">
                <button @click="handleDelete" class="btn btn-sm btn-ghost text-error hover:bg-error/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <router-link :to="`/groups/${group._id}`" class="btn btn-sm btn-primary btn-outline font-bold">
                    View
                </router-link>
            </div>
        </div>
    </div>
</template>
