#!/usr/bin/env sh

if [[ $ENV = "production" ]]; then
  npm run serve:ssr
else
  pnpm install --omit=optional
  ./node_modules/.bin/prisma generate
  pnpm run dev:ssr
fi
