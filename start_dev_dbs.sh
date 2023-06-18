#!/bin/bash

cd server
echo "Starting databases..."
docker compose -f docker-compose-dbs.yaml up -d
echo "Databases started"
echo "Waiting for them to become ready..."
sleep 5
echo "Deploying databases..."
echo "NOTE: If this command fails, re-run it manually: (cd server && yarn db:reset)"
yarn db:reset
echo "Databases deployed"
