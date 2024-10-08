<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">Javascript Minify</h1>
    <TextEditor label="Введите JS код" :action="minifyJs" button-text="Minify" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import TextEditor from '@/components/TextEditor.vue';

async function minifyJs(code) {
  const response = await fetch('/api/minify-js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  return data.minifiedCode;
}
</script>
