#!/bin/bash

cd server
docker compose down --remove-orphans --volumes && docker compose up -d
