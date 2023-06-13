#!/bin/bash

# Source .env

# Build static client
echo "Building client..."
cd client
yarn
yarn build
cd ..

# Build server
echo "Building server..."
docker build -t server:latest server/
