# Usar a imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do Node.js
RUN npm install

# Copiar o restante dos arquivos da aplicação para o contêiner
COPY . .

# Expor a porta que o serviço vai rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "index.js"]
