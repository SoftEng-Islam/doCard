import { defineStore } from "pinia";
import { ref } from "vue";
import groupsService from "./services/groups.service";
import type { IGroup } from "shared/types/models";

export const useGroupsStore = defineStore("groups", () => {
	const groups = ref<IGroup[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	async function fetchGroups() {
		loading.value = true;
		error.value = null;
		try {
			groups.value = await groupsService.getGroups();
		} catch (err: any) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	}

	async function createGroup(name: string, description?: string) {
		try {
			const newGroup = await groupsService.createGroup({ name, description });
			groups.value.unshift(newGroup);
			return newGroup;
		} catch (err: any) {
			error.value = err.message;
			throw err;
		}
	}

	async function deleteGroup(id: string) {
		try {
			await groupsService.deleteGroup(id);
			groups.value = groups.value.filter((g) => g._id !== id);
		} catch (err: any) {
			error.value = err.message;
			throw err;
		}
	}

	return {
		groups,
		loading,
		error,
		fetchGroups,
		createGroup,
		deleteGroup,
	};
});
