FROM golang:latest

WORKDIR /app

ARG ENV_PATH=.env
ARG FB_PATH=firebase.json

COPY ${ENV_PATH} .
COPY ${FB_PATH} .

COPY go.mod Makefile ./

RUN make install

COPY main.go .
COPY auth auth
COPY common common
COPY config config
COPY loader loader
COPY storage storage
COPY images images

ENV PORT=8080

RUN make build

EXPOSE ${PORT}

CMD ["./main"]