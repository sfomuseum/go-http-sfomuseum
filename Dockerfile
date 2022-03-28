FROM golang:1.18-alpine as builder

RUN mkdir /build

COPY . /build/go-sfomuseum-http

RUN apk update && apk upgrade \
    && apk add gcc libc-dev \
    && cd /build/go-sfomuseum-http \
    && go build -mod vendor -o /usr/local/bin/sfomuseum-sweater-server cmd/example/main.go    

FROM alpine:latest

COPY --from=builder /usr/local/bin/sfomuseum-sweater-server /usr/local/bin/

RUN apk update && apk upgrade \
    && apk add ca-certificates

ENTRYPOINT /usr/local/bin/sfomuseum-sweater-server -server-uri http://0.0.0.0:8080