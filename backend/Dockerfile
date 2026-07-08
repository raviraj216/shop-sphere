# Base image
FROM node:24-alpine

# Working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]