<template>
    <BaseLayout>
      <h1 class="text-2xl font-bold mb-4">Beautify Code</h1>
      <TextEditor label="Введите HTML, CSS или JS код" :action="beautifyCode" button-text="Beautify" />
    </BaseLayout>
  </template>
  
  <script setup>
  import BaseLayout from '~/components/BaseLayout.vue';
  import TextEditor from '@/components/TextEditor.vue';
  
  async function beautifyCode(code) {
    const response = await fetch('/api/beautify', {
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
  
    return data.beautifiedCode;
  }
  </script>
  