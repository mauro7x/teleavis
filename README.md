# [Téléavis](https://filieres.rezel.net/)

## Local development

> **Prerequisites:**
> 
> - **Docker** (and `docker compose`, normally installed alongside Docker).
> - **yarn** (`npm i -g yarn`).

1. **(If you haven't done this before)** Start local-dev databases using the provided script: `./start_dev_dbs.sh`.
2. Start the server in one terminal: `cd server && yarn start:dev`
3. Start the client in another terminal: `cd client && yarn start:dev`
4. Go to `http://localhost:3000/` and develop :P
