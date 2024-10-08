<template>
    <BaseLayout>
      <h1 class="text-2xl font-bold mb-4">Obfuscate Code</h1>
      <TextEditor label="Введите JavaScript код" :action="obfuscateCode" button-text="Obfuscate" />
    </BaseLayout>
  </template>
  
  <script setup>
  import BaseLayout from '~/components/BaseLayout.vue';
  import TextEditor from '@/components/TextEditor.vue';
  
  async function obfuscateCode(code) {
    const response = await fetch('/api/obfuscate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
  
    const data = await response.json();
    if (data.error) {
      return data.error;
    }
  
    return data.obfuscatedCode;
  }
  </script>
  