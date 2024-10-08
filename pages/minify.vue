<template>
    <BaseLayout>
      <h1 class="text-2xl font-bold mb-4">Minify Code</h1>
      <TextEditor label="Введите HTML, CSS или JS код" :action="minifyCode" button-text="Minify" />
    </BaseLayout>
  </template>
  
  <script setup>
  import BaseLayout from '~/components/BaseLayout.vue';
  import TextEditor from '@/components/TextEditor.vue';
  
  async function minifyCode(code) {
    const response = await fetch('/api/minify', {
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
  
    return data.minifiedCode;
  }
  </script>
  