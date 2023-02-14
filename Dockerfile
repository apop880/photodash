ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache \
    nodejs \
    npm

# Copy data for add-on
COPY photodash /

RUN chmod a+x /run.sh

RUN npm install
RUN npm run build

CMD ./run.sh