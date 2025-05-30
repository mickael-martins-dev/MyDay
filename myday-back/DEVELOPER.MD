# Project

# Build
```sh
npm ci && npm run build
```

# Docker
## Build
```sh
docker build -t myday:latest .
```

## Run
```sh
docker run --env-file dev.env myday
```