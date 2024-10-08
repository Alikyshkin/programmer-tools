<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">Конвертер изображений</h1>
    <input type="file" multiple @change="onFileChange">
    <select v-model="selectedFormat">
      <option value="jpg">JPG</option>
      <option value="jpeg">JPEG</option>
      <option value="png">PNG</option>
      <option value="webp">WEBP</option>
      <option value="heic">HEIC</option>
    </select>
    <button @click="convertImages">Конвертировать</button>
    <div v-if="loading">Конвертация...</div>
    <div v-if="convertedFiles && convertedFiles.length">
      <button @click="downloadZip">Скачать ZIP</button>
      <div v-for="file in convertedFiles" :key="file.name">
        <a :href="file.url" :download="file.name">Скачать {{ file.name }}</a>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import JSZip from 'jszip';

const files = ref([]);
const selectedFormat = ref('jpg');
const loading = ref(false);
const convertedFiles = ref([]);

const onFileChange = (event) => {
  files.value = event.target.files;
};

const convertImages = async () => {
  loading.value = true;
  const formData = new FormData();
  Array.from(files.value).forEach(file => {
    formData.append('files', file);
  });
  formData.append('format', selectedFormat.value);

  const response = await fetch('/api/convert-images', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  convertedFiles.value = data.files || []; // Защита от undefined
  loading.value = false;
};

const downloadZip = async () => {
  const zip = new JSZip();
  convertedFiles.value.forEach(file => {
    zip.file(file.name, file.content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted_images.zip';
  a.click();
};
</script>
