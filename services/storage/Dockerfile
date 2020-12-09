FROM golang:latest

WORKDIR /app

ARG ENV_PATH=.env

COPY ${ENV_PATH} .

COPY go.mod Makefile ./

RUN make install

COPY main.go .
COPY config config

ENV PORT=8080

RUN make build

EXPOSE ${PORT}

CMD ["./main"]