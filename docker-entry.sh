#!/usr/bin/env sh

if [[ $ENV = "production" ]]; then
  npm run serve:ssr
else
  npm install --omit=optional
  ./node_modules/.bin/prisma generate
  npm run dev:ssr
fi
