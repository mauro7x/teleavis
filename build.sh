#!/bin/bash
echo "Building client..."
cd client
yarn
yarn build
echo "Client built..."
cd ..

echo "Building server..."
docker build -f server.Dockerfile -t server:latest .
docker image prune -f
echo "Server built"
