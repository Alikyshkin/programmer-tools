<template>
  <div>
    <Header />
    <section id="functionalities" class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Tile v-for="(tile, index) in tiles" :key="index" :title="tile.title" :description="tile.description" :image="tile.image" :link="tile.link" />
    </section>
  </div>
</template>

<script setup>
import Header from '~/components/AppHeader.vue';
import Tile from '~/components/AppTile.vue';

const tiles = [
  { title: "HTML Beautify", description: "Beautify HTML code", image: "/images/html.png", link: "/html-beautify" },
  { title: "CSS Minify", description: "Minify CSS code", image: "/images/css.png", link: "/css-minify" },
  { title: "JavaScript Minify", description: "Minify JavaScript code", image: "/images/js.png", link: "/js-minify" },
  { title: "JavaScript Obfuscator", description: "Obfuscate JavaScript code", image: "/images/obfuscate.png", link: "/js-obfuscate" },
  { title: "CSS Beautify", description: "Beautify CSS code", image: "/images/css-beautify.png", link: "/css-beautify" }
];
</script>
