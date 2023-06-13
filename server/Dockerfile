FROM node:16
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy application bundle
COPY ./client/build/ ./client/build/
COPY ./src/ ./src/
COPY ./scripts/ ./scripts/
COPY ./prisma/ ./prisma/
COPY ./data/ ./data/
COPY tsconfig*.json ./

# Generate Prisma Client
RUN yarn prisma generate

# Build application
RUN yarn build

# Document default port
EXPOSE 3000

# Start app in production mode
CMD [ "yarn", "start" ]
