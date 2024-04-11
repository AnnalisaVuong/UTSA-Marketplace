FROM node AS dev-frontend

WORKDIR /app

VOLUME ["/app"]

CMD ["npm", "run", "dev"]

FROM node AS prod-frontend

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
