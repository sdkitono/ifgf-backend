FROM node:5.8
MAINTAINER Samuel Kitono <samuel@kitono.id>

# Create app directory
RUN mkdir -p /usr/src/finliv-backend
WORKDIR /usr/src/finliv-backend

RUN npm install -g yarn && npm install -g sequelize-cli && npm install -g node-inspector

# Install dependencies first so we do not have to this everytime
COPY package.json /usr/src/finliv-backend
RUN yarn cache clean
RUN yarn install

# Copy in the application code from your work station at the current directory
# over to the working directory.
COPY . .

# Expose port and then start the app
EXPOSE 4040 8080 5858
CMD [ "node", "dist/index.js" ]

