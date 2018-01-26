FROM node:5.8
MAINTAINER Samuel Kitono <samuel@kitono.id>

# Create app directory
RUN mkdir -p /usr/src/ifgf-backend
WORKDIR /usr/src/ifgf-backend

RUN npm install -g yarn@0.17.9 && npm install -g node-inspector

# Install dependencies first so we do not have to this everytime
COPY package.json /usr/src/ifgf-backend
COPY npm-shrinkwrap.json /usr/src/ifgf-backend
RUN npm install

# Copy in the application code from your work station at the current directory
# over to the working directory.
COPY . .

# Expose port and then start the app
EXPOSE 4040 8080 
RUN yarn build
CMD [ "node", "dist/index.js" ]
