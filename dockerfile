FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

ENV WEATHER_API_KEY=8fcb9e44076e4eb476fe77e0b86bdf67

ENV PORT=5000
ENV OPEN_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/group?id=
ENV MONGO_URI=mongodb+srv://davidhailu0:asdfghjkl123@cluster0.5fssp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

COPY . .

EXPOSE 5000

CMD ["pnpm", "dev"]