FROM node:18

WORKDIR /usr/src/app


ENV DOCKERIZE_VERSION v0.9.3

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

    #pode verificar se o outro container esta proonto
# RUN dockerize -wait tcp://db:3306 
#fica espserando o service do banco de dados

COPY package*.json . 
#copia o conteudo do pc para o container

RUN npm install
#instala as dependencias
COPY . . 

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
#comando para executar o arquivo index.js