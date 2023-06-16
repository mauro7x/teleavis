#!/bin/bash

cd server
docker compose down --remove-orphans --volumes && docker compose up -d
sleep 1
yarn db:init
