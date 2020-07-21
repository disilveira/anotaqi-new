FROM node:12

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Criando o diretório do app
WORKDIR /home/node/app

# Instalando as dependências
COPY package*.json ./
RUN npm install

COPY . .
COPY --chown=node:node . .

USER node

EXPOSE 3000
CMD [ "node", "src/app.js" ]