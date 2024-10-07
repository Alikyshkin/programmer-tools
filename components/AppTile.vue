<template>
  <div class="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition flex flex-col items-center text-center" @click="navigateToPage">
    <img :src="image" alt="" class="w-full h-32 object-cover rounded-md">
    <div class="mt-4">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
});

const router = useRouter();

function navigateToPage() {
  router.push(props.link);
}
</script>
