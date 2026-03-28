# 1. Base image
FROM oven/bun:1 AS base
WORKDIR /src/bins/frontend

# 2. Install ALL dependencies (including devDeps like Vite and Tailwind)
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --no-cache

# 3. Build stage (This generates the .output folder)
FROM base AS build
COPY --from=install /src/bins/frontend/node_modules node_modules
COPY . .
# This runs 'vite build' via your package.json
RUN bun run build

# 4. Release stage (The lean production image)
FROM base AS release
# We only need the compiled output and the production runtime
COPY --from=build /src/bins/frontend/.output .output

# Nitro/SolidStart production settings
ENV NODE_ENV=production
ENV PORT=3000

USER bun
EXPOSE 3000

# Run the compiled Nitro server directly
# We don't use 'vite start' because vite is a devDependency
CMD [ "bun", "./.output/server/index.mjs" ]