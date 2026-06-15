# Docker Setup

Start the containers.

```bash
docker compose up -d
```

The containers boot but won't serve the apps yet. Dependencies aren't installed
automatically to avoid modifying `yarn.lock` without your say-so. Install them and
restart.

```bash
./run install
docker compose restart
```

Leaving off the service name restarts every container. If only one app needs a bounce, name it.

```bash
docker compose restart app
```

On subsequent runs, just start the containers. The entrypoint detects an installed
`node_modules` and serves automatically.

```bash
docker compose up -d
```

App runs at `http://localhost:5173`, admin at `http://localhost:5174`.

## Viewing logs

The dev servers run inside the containers, so their output goes to the container logs, not your terminal. Follow everything at once.

```bash
docker compose logs -f
```

Each line is prefixed with the service name (`app` or `admin`) so you can tell the two apart. To follow just one.

```bash
docker compose logs -f app
docker compose logs -f admin
```

## Resetting

To wipe the install and start fresh, drop the `node_modules` volume.

```bash
docker compose down -v
```
