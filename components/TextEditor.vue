<template>
  <div class="flex flex-col items-center">
    <label class="block mb-2 text-xl">{{ label }}</label>
    <textarea v-model="input" class="w-full p-4 h-40 border rounded mb-4 shadow-md"/>
    <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" @click="handleAction">{{ buttonText }}</button>
    <div v-if="output" class="relative mt-4 p-4 bg-gray-100 border rounded w-full break-words whitespace-pre-wrap">
      <pre>{{ output }}</pre>
      <button class="absolute top-2 right-2 bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600" @click="copyToClipboard">
        <span v-if="!copied">Copy</span>
        <span v-else>✔</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  }
});

const input = ref('');
const output = ref('');
const copied = ref(false);

async function handleAction() {
  try {
    output.value = await props.action(input.value);
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при обработке кода.');
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(output.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>