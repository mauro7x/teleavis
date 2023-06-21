# [Téléavis](https://filieres.rezel.net/)

## Local development

> **Prerequisites:**
>
> - **Docker** (and `docker compose`, normally installed alongside Docker).
> - **yarn** (`npm i -g yarn`).

1. **(If you haven't done this before)** Start local-dev dependencies (databases and fake oidc provider) using the provided script: `./start_dev_deps.sh`.
2. Start the server in one terminal: `cd server && yarn start:dev`
   > Note: the first time you run this command after initializing dev-deps, you may find an error:
   >
   > ```bash
   > [Nest] 116402  - 06/21/2023, 10:53:32 PM   ERROR [ExceptionHandler] outgoing request timed out after 3500ms
   > ```
   >
   > Just hit `Ctrl + C` and re-run the command.
3. Start the client in another terminal: `cd client && yarn start:dev`
4. Go to `http://localhost:3000/` and develop :P

### Credentials

Some users were already configured:

- Username: `user` / Password: `pass`
- Username: `user2` / Password: `pass`
- Username: `user3` / Password: `pass`

> You can add or delete users in `./server/oidc-server-mock/users-config.json`, but if you do, you will need to restart dev-deps (`./stop_dev_deps.sh && ./start_dev_deps.sh`).

### Known issues

- Automatic redirection after log out is not working with the fake provider, so please once you've logged out, manually navigate to the root of the application (http://localhost:3000/).
