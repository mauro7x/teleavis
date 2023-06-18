#!/bin/bash

cd server
echo "Stopping databases..."
docker compose -f docker-compose-dbs.yaml down -v
echo "Databases stopped"
