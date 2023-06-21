#!/bin/bash

cd server
echo "Stopping databases..."
docker compose -f docker-compose-dev.yaml down -v
echo "Databases stopped"
