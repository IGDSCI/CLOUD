# Usa a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta que o app usará (exemplo: 3000 para o BFF)
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "js.js"]
