# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Copy env file from the local folder to the Docker build context
# Make sure to have this env file for local-staging. Include it in .gitignore
# but not in .dockerignore.
COPY staging.env .env

# Build the React app
RUN npm run build

# Install the serve package globally
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the app, serving the build output
CMD ["serve", "-s", "dist"]