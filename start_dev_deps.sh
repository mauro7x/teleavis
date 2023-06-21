#!/bin/bash

cd server
echo "Starting dev dependencies..."
docker compose -f docker-compose-dev.yaml up -d
echo "Dev dependencies started"
echo "Waiting for databases to become ready..."
sleep 3
echo "Deploying databases..."
echo "NOTE: If this command fails, re-run it manually: (cd server && yarn db:reset)"
yarn db:reset
echo "Databases deployed"
