import { defineEventHandler, readMultipartFormData } from 'h3';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Поддерживаемые форматы
const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'heic'];

export default defineEventHandler(async (event) => {
  try {
    // Чтение данных формы
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw new Error('No files uploaded.');
    }

    // Получаем формат, в который нужно конвертировать
    const format = formData.find(item => item.name === 'format').value;
    
    if (!supportedFormats.includes(format)) {
      throw new Error(`Unsupported format: ${format}`);
    }

    // Обрабатываем каждый загруженный файл
    const convertedFiles = [];

    for (const file of formData) {
      if (file.type !== 'file') continue;

      const buffer = file.data; // Получаем данные файла

      // Используем sharp для конвертации
      const convertedBuffer = await sharp(buffer)
        .toFormat(format) // Конвертируем в нужный формат
        .toBuffer();

      // Создаем уникальное имя для каждого файла
      const convertedFileName = `${path.basename(file.filename, path.extname(file.filename))}.${format}`;
      
      // Сохраняем файл во временную директорию или возвращаем буфер напрямую
      const outputPath = path.join('/tmp', convertedFileName);
      await fs.writeFile(outputPath, convertedBuffer);

      // Добавляем информацию о файле для клиента
      convertedFiles.push({
        name: convertedFileName,
        url: `/tmp/${convertedFileName}`, // Путь для скачивания
      });
    }

    // Возвращаем список конвертированных файлов
    return { files: convertedFiles || [] };
  } catch (error) {
    return { error: error.message };
  }
});
