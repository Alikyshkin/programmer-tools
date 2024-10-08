<template>
  <header class="flex justify-between items-center p-4 bg-blue-600">
    <NuxtLink to="/" class="text-white text-2xl font-bold">
      Programmer Tools
    </NuxtLink>
    <button class="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200" @click="scrollToFunctionalities">
      Начать
    </button>
  </header>
</template>

<script setup>
function scrollToFunctionalities() {
  const element = document.getElementById('functionalities');
  element.scrollIntoView({ behavior: 'smooth' });
}
</script>
