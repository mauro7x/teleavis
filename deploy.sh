#!/bin/bash

# Build
./build.sh

# Stop containers
cd server
docker compose down
docker compose up -d
