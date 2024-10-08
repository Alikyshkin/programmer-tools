# Указываем базовый образ Node.js
FROM node:18

# Устанавливаем автора
LABEL maintainer="Alika Alikyshkin@gmail.com"

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем Nuxt приложение
RUN npm run build

# Указываем порт, который будет слушаться
EXPOSE 3000

# Команда для запуска Nuxt приложения
CMD ["npm", "run", "start"]
