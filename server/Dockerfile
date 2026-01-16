FROM golang:1.23.6-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest
ENV TZ='America/New_York'

COPY . .

RUN go mod download

COPY . .

EXPOSE 3000

CMD [ "air", "-c", ".air.toml" ]
