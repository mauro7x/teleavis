FROM node:16
WORKDIR /usr/src/app

# Install dependencies
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn

# Copy application bundle
# COPY ./data/ ./data/
# COPY ./prisma/ ./prisma/
# COPY ./scripts/ ./scripts/
# COPY ./src/ ./src/
# COPY ../client/build/ ../client/build/
# COPY tsconfig*.json ./
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
