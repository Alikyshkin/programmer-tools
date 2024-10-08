<template>
  <NuxtLink :to="link" class="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition flex flex-col items-center text-center">
    <div class="mt-4">
      <h3 class="text-lg font-bold">{{ title }}</h3>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
