#!/usr/bin/with-contenv bashio
host=$(bashio::services "mysql" "host")
password=$(bashio::services "mysql" "password")
port=$(bashio::services "mysql" "port")
username=$(bashio::services "mysql" "username")
DATABASE_URL="mysql://${username}:${password}@${host}:${port}/photodash?schema=public"
npx prisma db push
node /build/index.js