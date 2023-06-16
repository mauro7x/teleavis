#!/bin/bash
echo "Building client..."
cd client
yarn build

echo "Running server..."
cd ../server/
yarn start

