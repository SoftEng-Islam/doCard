<script setup lang="ts">
import { ref } from 'vue';
const loadUserData = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			name: 'Islam Ahmed';
			bio: 'Im a software enginner';
		}, 2000);
	});
};
const userData = ref(await loadUserData());
</script>
<template lang="pug">
div(class="profile-card")
	div(class="profile-info")
		span Written By
		h3 {{userData.name}}
		p {{userData.bio}}
</template>
