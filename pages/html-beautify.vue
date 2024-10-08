<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">HTML Beautify</h1>
    <TextEditor label="Введите HTML код" :action="beautifyCode" button-text="Beautify" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import TextEditor from '@/components/TextEditor.vue';

async function beautifyCode(code) {
  const response = await fetch('/api/beautify-html', {
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
