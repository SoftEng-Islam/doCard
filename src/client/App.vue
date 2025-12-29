<script setup lang="ts">
import { onMounted } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import { Themes } from './utils/Themes.js';

onMounted(() => {
  Themes.apply(Themes.detect());
});
</script>

<template>
	<MainLayout>
		<RouterView />
	</MainLayout>
</template>
