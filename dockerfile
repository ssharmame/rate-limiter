From node:18-alpine
WORKDIR /ASSIGNMENT-RATELIMITER
COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]