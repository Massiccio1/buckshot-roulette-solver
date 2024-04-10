FROM node:21-alpine3.18


COPY . /app
WORKDIR /app
RUN npm install

CMD node app.js


#    docker build -t dockerhub.outer-heaven.duckdns.org/waifu:latest .
#    docker run dockerhub.outer-heaven.duckdns.org/waifu



#    docker build -t waifu .
#    docker run -p 80:8060 waifu