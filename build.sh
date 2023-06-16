#!/bin/bash
echo "Building client..."
cd client
yarn
yarn build

echo "Building server..."
cd ../server/
yarn
yarn build
