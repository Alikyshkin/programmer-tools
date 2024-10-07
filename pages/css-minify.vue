<template>
    <div>
      <Header />
      <div class="container mx-auto p-8">
        <h1 class="text-2xl font-bold mb-4">CSS Minify</h1>
        <TextEditor label="Введите CSS код" :action="minifyCode" button-text="Minify" />
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/AppHeader.vue';
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
    return data.minifiedCode;
  }
  </script>
  