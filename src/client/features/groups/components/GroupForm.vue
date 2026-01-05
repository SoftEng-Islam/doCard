<script setup lang="ts">
import { ref } from 'vue';
import { useGroupsStore } from '@/features/groups/groups.store';
import { useToast } from 'vue-toastification';

const emit = defineEmits<{
    (e: 'success', group: any): void;
    (e: 'cancel'): void;
}>();

const store = useGroupsStore();
const toast = useToast();

const name = ref('');
const description = ref('');
const loading = ref(false);

async function submit() {
    if (!name.value) return;

    loading.value = true;
    let group;
    try {
        group = await store.createGroup(name.value, description.value);
    } catch (err: any) {
        const msg = err.message || 'Failed to create group';
        toast.error(msg);
        console.error(err);
    } finally {
        loading.value = false;
    }

    if (group) {
        toast.success('Group created successfully!');
        emit('success', group);
        name.value = '';
        description.value = '';
    }
}
</script>

<template>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text font-bold uppercase text-xs opacity-50">Group Name</span>
            </label>
            <input v-model="name" type="text" placeholder="e.g. Spanish Vocabulary" class="input input-bordered w-full" required />
        </div>

        <div class="form-control w-full">
            <label class="label">
                <span class="label-text font-bold uppercase text-xs opacity-50">Description (Optional)</span>
            </label>
            <textarea v-model="description" class="textarea textarea-bordered h-24" placeholder="Brief description..."></textarea>
        </div>

        <div class="flex justify-end gap-2 mt-2">
            <button type="button" @click="$emit('cancel')" class="btn btn-ghost">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                Create Group
            </button>
        </div>
    </form>
</template>
