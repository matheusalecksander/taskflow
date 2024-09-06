FROM node:20-alpine

WORKDIR /home/node/app
COPY package*.json /home/node/app/

RUN npm install

COPY . .

EXPOSE 5174
CMD ["npm", "run", "start:dev"]
