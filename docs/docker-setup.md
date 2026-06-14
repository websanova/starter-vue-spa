# Docker Setup

Start the containers.

```bash
docker compose up -d
```

The containers boot but won't serve the apps yet. Dependencies aren't installed
automatically to avoid modifying `yarn.lock` without your say-so. Install them and
restart.

```bash
./dev install
docker compose restart
```

On subsequent runs, just start the containers. The entrypoint detects an installed
`node_modules` and serves automatically.

```bash
docker compose up -d
```

App runs at `http://localhost:5173`, admin at `http://localhost:5174`.

To wipe the install and start fresh, drop the `node_modules` volume.

```bash
docker compose down -v
```
