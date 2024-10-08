<template>
    <div>
      <AppHeader />
      <div class="container mx-auto p-8">
        <slot/>
      </div>
    </div>
  </template>
  
  <script setup>
  import AppHeader from '~/components/AppHeader.vue';
  </script>
  