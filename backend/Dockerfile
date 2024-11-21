FROM node:16

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies, including `nodemon`
RUN npm install

# Copy all files to the container
COPY . .

# Expose the backend port
EXPOSE 5001

# Start the development server
CMD ["npm", "run", "dev"]
