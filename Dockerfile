ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache \
    nodejs \
    npm

# Copy data for add-on
COPY run.sh /
COPY package.json /
COPY /src /src
COPY /prisma /prisma

RUN /run.sh

RUN npm install
RUN npm build
RUN npx prisma db push

CMD node /build/index.js