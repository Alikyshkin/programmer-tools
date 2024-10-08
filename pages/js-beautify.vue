<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">Javascript Beautify</h1>
    <TextEditor label="Введите JS код" :action="beautifyJs" button-text="Beautify" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import TextEditor from '@/components/TextEditor.vue';

async function beautifyJs(code) {
  const response = await fetch('/api/beautify-js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  return data.beautifiedCode;
}
</script>
