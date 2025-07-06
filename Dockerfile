FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app
RUN adduser -S appuser
COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile
COPY --from=build /app/dist .
USER appuser
EXPOSE 5173
CMD ["bunx", "serve", "-s", ".", "-l", "5173"]
