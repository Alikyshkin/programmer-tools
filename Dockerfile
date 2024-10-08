# Указываем базовый образ Node.js
FROM node:18

# Устанавливаем автора
LABEL maintainer="Alika Alikyshkin@gmail.com"

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package.json и package-lock.json для кеширования зависимостей
COPY package*.json ./

# Устанавливаем зависимости с ограничением памяти
RUN npm install --no-optional --max-old-space-size=256

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start"]
