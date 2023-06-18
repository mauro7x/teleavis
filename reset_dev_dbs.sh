#!/bin/bash

cd server
echo "Resetting databases..."
yarn db:reset
echo "Databases reset"
