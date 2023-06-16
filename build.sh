#!/bin/bash
echo "Building client..."
cd client
yarn
yarn build
cd ..

echo "Building server..."
docker build -f server.Dockerfile -t server:latest .

