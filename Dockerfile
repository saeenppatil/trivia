# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# ----- Backend Setup -----

# Copy backend package.json and package-lock.json
COPY trivia-backend/package*.json ./

# Install backend dependencies (including TypeScript)
RUN npm install

# Copy backend source code
COPY trivia-backend/ ./

# Build the backend TypeScript code
RUN npm run build

# ----- Frontend Setup -----

# Set working directory for frontend
WORKDIR /app/trivia

# Copy frontend package.json and package-lock.json
COPY trivia/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY trivia/ ./

# Build the frontend application
RUN npm run build

# ----- Final Setup -----

# Set working directory back to /app
WORKDIR /app

# Expose the port your app runs on
EXPOSE 3000

# Start the server using the compiled JavaScript file
CMD [ "npm", "start" ]