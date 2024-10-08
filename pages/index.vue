<template>
  <BaseLayout>
    <div class="tools-grid">
      <AppTile title="HTML Beautify" link="/html-beautify" />
      <AppTile title="CSS Beautify" link="/css-beautify" />
      <AppTile title="JS Beautify" link="/js-beautify" />
      <AppTile title="HTML Minify" link="/html-minify" />
      <AppTile title="CSS Minify" link="/css-minify" />
      <AppTile title="JS Minify" link="/js-minify" />
      <AppTile title="JS Obfuscate" link="/js-obfuscate" />
      <AppTile title="Конвертер изображений" link="/image-converter" />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import AppTile from '~/components/AppTile.vue';
</script>