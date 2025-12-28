<script setup lang="ts">
import ProfileCard from './ProfileCard.vue';
import ProfileCardSkeleton from './ProfileCardSkeleton.vue';
</script>
<template lang="pug">
	Suspense
		template(#default)
			profile-card
		template(#fallback)
			ProfileCardSkeleton
</template>
