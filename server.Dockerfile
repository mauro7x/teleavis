FROM node:16
WORKDIR /usr/src/app

# Install dependencies
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install

# Copy application bundle
COPY ./server ./
COPY ./client ../client/

# Generate Prisma Client
RUN yarn prisma generate

# Build application
RUN yarn build

# Document default port
EXPOSE 3000

# Start app in production mode
CMD [ "yarn", "start:prod" ]
