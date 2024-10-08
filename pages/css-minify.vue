<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">CSS Minify</h1>
    <TextEditor label="Введите CSS код" :action="minifyCode" button-text="Minify" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import TextEditor from '@/components/TextEditor.vue';

async function minifyCode(code) {
  const response = await fetch('/api/minify-css', {
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
