#!/usr/bin/with-contenv bashio
host=$(bashio::services "mysql" "host")
password=$(bashio::services "mysql" "password")
port=$(bashio::services "mysql" "port")
username=$(bashio::services "mysql" "username")
export DATABASE_URL="mysql://${username}:${password}@${host}:${port}/photodash?schema=public"
export SUPERVISOR_URL="http://192.168.1.6:8123"
export ORIGIN=http://192.168.1.6:8800
npx prisma db push
node /build/index.js