FROM node:5.8
MAINTAINER Samuel Kitono <samuel@kitono.id>

# Create app directory
RUN mkdir -p /usr/src/finliv-backend
WORKDIR /usr/src/finliv-backend

RUN npm install -g yarn && npm install -g pm2 && npm install -g sequelize-cli

# Install dependencies first so we do not have to this everytime
COPY package.json /usr/src/finliv-backend
RUN yarn

# Copy in the application code from your work station at the current directory
# over to the working directory.
COPY . .

# Expose port and then start the app
EXPOSE 4040
CMD [ "yarn", "start" ]

