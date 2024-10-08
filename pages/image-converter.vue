<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">Конвертер изображений</h1>
    <input type="file" multiple @change="onFileChange">  <!-- Поле выбора файлов -->
    <select v-model="selectedFormat">
      <option value="jpg">JPG</option>
      <option value="jpeg">JPEG</option>
      <option value="png">PNG</option>
      <option value="webp">WEBP</option>
      <option value="heic">HEIC</option>
    </select>
    <button @click="convertImages">Конвертировать</button>
    <div v-if="loading">Конвертация...</div>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';

const files = ref([]); // Храним выбранные файлы
const selectedFormat = ref('jpg');  // По умолчанию формат установлен в 'jpg'
const loading = ref(false);

const onFileChange = (event) => {
  // Логируем событие выбора файлов
  console.log('File input event:', event);
  
  // Проверяем наличие файлов
  const fileList = event.target.files;
  if (fileList.length > 0) {
    files.value = Array.from(fileList);  // Конвертируем FileList в массив
    console.log('Selected files:', files.value);
  } else {
    files.value = [];
    console.warn('No files selected.');
  }
};

const convertImages = async () => {
  if (files.value.length === 0) {
    alert('Please select files to convert.');
    return;
  }

  loading.value = true;
  
  const formData = new FormData();

  // Добавляем файлы в formData
  files.value.forEach(file => {
    formData.append('files', file);
    console.log(`Added file to formData: ${file.name}, size: ${file.size}`);
  });

  // Добавляем формат в formData
  formData.append('format', selectedFormat.value);
  console.log('Selected format for conversion:', selectedFormat.value);

  try {
    const response = await fetch('/api/convert-images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to convert images');
    }

    // Получаем zip-файл и загружаем его
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_images.zip';
    a.click();
    
  } catch (error) {
    console.error('Error during image conversion:', error.message);
    alert('Произошла ошибка при конвертации изображений. Попробуйте еще раз.');
  } finally {
    loading.value = false;
  }
};
</script>
