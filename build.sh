#!/bin/bash
echo "Building client..."
cd client
yarn build

echo "Building server..."
cd ../server/
yarn build
