<script setup lang="ts">
import type { IGroup } from 'shared/types/models';

defineProps<{
    group: IGroup;
}>();
</script>

<template>
    <div class="card bg-base-100 border border-base-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
        <div class="card-body">
            <h3 class="card-title font-black tracking-tight text-xl">{{ group.name }}</h3>
            <p class="text-xs opacity-50 uppercase font-bold tracking-widest mb-2">
                {{ group.cardCount || 0 }} Cards
            </p>
            <p class="text-sm opacity-70 line-clamp-2 block mb-4 flex-grow">{{ group.description || 'No description' }}</p>

            <div class="card-actions justify-end mt-auto">
                <router-link :to="`/groups/${group._id}`" class="btn btn-sm btn-primary btn-outline font-bold">
                    View
                </router-link>
            </div>
        </div>
    </div>
</template>
