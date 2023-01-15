#!/usr/bin/with-contenv bashio
host=$(bashio::services "mysql" "host")
password=$(bashio::services "mysql" "password")
port=$(bashio::services "mysql" "port")
username=$(bashio::services "mysql" "username")
# Create database if not exists
echo "CREATE DATABASE IF NOT EXISTS photodash;" \
    | mysql -h "${host}" -P "${port}" -u "${username}" -p"${password}"
DATABASE_URL="mysql://${username}:${password}@${host}:${port}/photodash?schema=public"
npx prisma db push
node /build/index.js