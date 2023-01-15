ARG BUILD_FROM
FROM $BUILD_FROM

ARG BUILD_ARCH

RUN apk add --update nodejs nodejs-npm

# Copy data for add-on
COPY run.sh /
COPY package.json /
COPY /src /src
COPY /prisma /prisma

RUN run.sh

RUN npm install
RUN npm build
RUN npx prisma db push

CMD node /build/index.js