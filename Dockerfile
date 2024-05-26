# Используйте образ с Node.js версии 20
FROM node:20-alpine

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте остальные файлы проекта
COPY . .

# Соберите проект
RUN npm run build

# Установите сервер для статических файлов
RUN npm install -g serve

# Определите команду запуска
CMD ["serve", "-s", "dist"]
