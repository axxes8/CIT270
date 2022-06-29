# This is the vase iamge we are inheriting from
FROM node

WORKDIR /app

# We are copying the package.json file first so there isn't a conflict with the node_modules directory
COPY package.json ./

RUN npm install

COPY . ./

# This is the last command we need to start the container/server
CMD npm start