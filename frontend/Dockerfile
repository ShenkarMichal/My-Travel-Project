#OS
FROM node:18-alpine3.16

#Create app folder
WORKDIR /app

#Copy only package,json + package-lock.json
COPY package*.json /app

#Install node_modules
RUN npm i 

#Copy app to workdir
COPY . /app

#Execute command
ENTRYPOINT npm start