# Docker Setup

Start the containers.

```bash
./dev up
```

The containers boot but won't serve the apps yet. Dependencies aren't installed automatically to avoid modifying `yarn.lock` without your say-so. Install them and restart.

```bash
./dev install
./dev restart
```

Install runs in the `node` container rather than one of the app containers, so it doesn't matter which app you're working on.

`./dev restart` recreates everything. If only one app needs a bounce, go through compose directly and name it.

```bash
docker compose restart app
```

On subsequent runs, just start the containers. The entrypoint detects an installed `node_modules` and serves automatically.

```bash
./dev up
```

App runs at `http://localhost:5173`, admin at `http://localhost:5174`.

## Services

| Service | Detail |
| --- | --- |
| `app` | App dev server on port 5173 |
| `admin` | Admin dev server on port 5174 |
| `node` | Idle container for yarn and install commands |

The `node` service doesn't run anything, it just sits on `tail -f /dev/null`. It exists so install, update, and one-off yarn commands have a home that isn't tied to either app, which keeps them from restarting a dev server as a side effect.

## Viewing logs

The dev servers run inside the containers, so their output goes to the container logs, not your terminal. Follow everything at once.

```bash
./dev logs
```

Each line is prefixed with the service name (`app` or `admin`) so you can tell the two apart. To follow just one.

```bash
./dev logs app
./dev logs admin
```

## Resetting

To wipe the install and start fresh, drop the `node_modules` volume. `./dev down` leaves volumes alone, so this one goes through compose.

```bash
docker compose down -v
```

## Shortcuts

| Command | Runs |
| --- | --- |
| `./dev up` | Start the containers, recreating them |
| `./dev down` | Stop the containers |
| `./dev restart` | Down, then up |
| `./dev install` | `yarn install` |
| `./dev update` | `yarn install --immutable`, installs strictly from the lockfile |
| `./dev yarn <args>` | Any other yarn command |
| `./dev app <args>` | A yarn script in the app workspace |
| `./dev admin <args>` | A yarn script in the admin workspace |
| `./dev sh <service>` | A shell in the given service |
| `./dev logs [service]` | Follow logs, all services or one |
