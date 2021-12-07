FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i -g npm@7

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]