FROM postgres:latest

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=123
ENV POSTGRES_DB=calendar-server-db
ENV TZ='America/New_York'

COPY init.sql /docker-entrypoint-initdb.d/
