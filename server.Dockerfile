FROM node:20 as BUILDER

WORKDIR /usr/app

# Install dependencies
COPY ./server/package.json ./server/yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

# -----------------------------------------------------------------------------

FROM node:20

WORKDIR /usr/app

# Copy dependencies from previous stage
COPY --from=BUILDER /usr/app/node_modules ./node_modules

# Copy application bundle
COPY ./server ./
COPY ./client/build ../client/build/

# Generate Prisma Client
RUN yarn prisma generate

# Build application
RUN yarn build

# Document default port
EXPOSE 3000

# Start app in production mode
CMD [ "yarn", "start:prod" ]
