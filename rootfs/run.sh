#!/usr/bin/with-contenv bashio
host=$(bashio::services "mysql" "host")
password=$(bashio::services "mysql" "password")
port=$(bashio::services "mysql" "port")
username=$(bashio::services "mysql" "username")
export DATABASE_URL="mysql://${username}:${password}@${host}:${port}/photodash?schema=public"
npx prisma db push
cd build/client
ln -s /share share
cd /
node /build/index.js