import { defineEventHandler, readMultipartFormData } from 'h3';
import sharp from 'sharp';
import JSZip from 'jszip';

const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'heic'];

export default defineEventHandler(async (event) => {
  try {
    console.log('Starting image processing...');

    // Чтение данных формы
    const formData = await readMultipartFormData(event);
    
    if (!formData || formData.length === 0) {
      console.error('No files uploaded.');
      return { error: 'No files uploaded.' };
    }

    console.log(`Received ${formData.length} items in the form data:`);
    formData.forEach(item => {
      console.log(`Item name: ${item.name}, Item type: ${item.type}`);
    });

    // Получаем формат, в который нужно конвертировать
    const formatItem = formData.find(item => item.name === 'format');
    
    if (!formatItem) {
      console.error('Format not provided in form data.');
      return { error: 'Format not provided.' };
    }
    
    const format = formatItem.value;
    console.log(`Target format for conversion: ${format}`);

    if (!supportedFormats.includes(format)) {
      console.error(`Unsupported format requested: ${format}`);
      return { error: `Unsupported format: ${format}` };
    }

    const zip = new JSZip();
    let processedFiles = 0;

    // Обрабатываем каждый загруженный файл
    for (const file of formData) {
      if (file.type !== 'file') continue; // Пропускаем не файловые поля

      const buffer = file.data; // Получаем данные файла
      console.log(`Processing file: ${file.filename}, size: ${buffer ? buffer.length : 'no data'}`);

      if (!buffer || buffer.length === 0) {
        console.warn(`File ${file.filename} is empty, skipping.`);
        continue;
      }

      const fileExtension = file.filename.split('.').pop().toLowerCase();
      if (fileExtension === format) {
        console.log(`File ${file.filename} is already in desired format (${format}), adding without conversion.`);
        zip.file(file.filename, buffer); // Добавляем файл без изменений
        processedFiles++;
        continue;
      }

      try {
        console.log(`Converting file ${file.filename} to ${format}`);
        const convertedBuffer = await sharp(buffer)
          .toFormat(format)
          .toBuffer();

        const convertedFileName = `${file.filename.split('.').slice(0, -1).join('.')}.${format}`;
        console.log(`Successfully converted file: ${convertedFileName}`);

        zip.file(convertedFileName, convertedBuffer); // Добавляем конвертированный файл в ZIP
        processedFiles++;

      } catch (conversionError) {
        console.error(`Failed to process file ${file.filename}: ${conversionError.message}`);
        continue;
      }
    }

    if (processedFiles === 0) {
      console.error('No files were successfully processed.');
      return { error: 'No files were processed. Please check the file formats.' };
    }

    console.log(`Successfully processed ${processedFiles} files, generating ZIP archive...`);

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    if (!zipBuffer || zipBuffer.length === 0) {
      console.error('Generated ZIP archive is empty.');
      return { error: 'Failed to create ZIP archive.' };
    }

    console.log(`ZIP archive generated successfully, size: ${zipBuffer.length} bytes`);

    event.res.setHeader('Content-Disposition', 'attachment; filename="converted_images.zip"');
    event.res.setHeader('Content-Type', 'application/zip');
    event.res.setHeader('Content-Length', zipBuffer.length);  // Указываем длину контента

    return zipBuffer;

  } catch (error) {
    console.error('Error processing images:', error.message);
    return { error: 'An error occurred while processing the images. Please try again later.' };
  }
});
