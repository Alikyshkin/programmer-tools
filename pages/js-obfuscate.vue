<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">JavaScript Obfuscator</h1>
    <TextEditor label="Введите JavaScript код" :action="obfuscateCode" button-text="Obfuscate" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import TextEditor from '@/components/TextEditor.vue';

async function obfuscateCode(code) {
  const response = await fetch('/api/obfuscate-js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  return data.obfuscatedCode;
}
</script>
