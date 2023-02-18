#!/usr/bin/with-contenv bashio
host=$(bashio::services "mysql" "host")
password=$(bashio::services "mysql" "password")
port=$(bashio::services "mysql" "port")
username=$(bashio::services "mysql" "username")
export DATABASE_URL="mysql://${username}:${password}@${host}:${port}/photodash?schema=public"
export SUPERVISOR_URL="http://supervisor/core"
npx prisma db push
ln -s share build/client/share
node build/index.js