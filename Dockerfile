# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./

# Install application dependcies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port available to the world outside this container
EXPOSE 3000

# Healthcheck to ensure the container is healthy by running a script
HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
    CMD node healthcheck.js

# Define the command to run the app
CMD ["node", "server.js"]
