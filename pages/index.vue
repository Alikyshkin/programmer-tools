<template>
  <BaseLayout>
    <div class="tools-grid">
      <AppTile title="Beautifier" link="/beautify" />
      <AppTile title="Minifier" link="/minify" />
      <AppTile title="Obfuscator" link="/obfuscate" />
      <AppTile title="Images Converter" link="/image-converter" />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '~/components/BaseLayout.vue';
import AppTile from '~/components/AppTile.vue';
</script>