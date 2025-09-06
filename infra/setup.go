package infra

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Config struct {
	host     string
	port     string
	user     string
	password string
	dbname   string
}

type DBInterface interface{}

type DB struct {
	DB   *sql.DB
	Conf *Config
}

const (
	host     = "projet3-db"
	port     = "5432"
	user     = "inf3995"
	password = "123"
	dbname   = "server-db"
)

func Setup() (*DB, error) {
	config := newConfig(host, port, user, password, dbname)
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+"password=%s dbname=%s sslmode=disable",
		config.host, config.port, config.user, config.password, config.dbname)
	sqldb, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		return nil, err
	}

	err = sqldb.Ping()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	db := newDB(config, sqldb)
	return db, nil
}

func newDB(c *Config, db *sql.DB) *DB {
	return &DB{
		Conf: c,
		DB:   db,
	}
}

func newConfig(host string, port string, user string, password string, dbname string) *Config {
	return &Config{
		host: host, port: port, user: user, password: password, dbname: dbname}
}
