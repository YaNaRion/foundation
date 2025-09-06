package main

import (
	"log"
	"main/controller"
	"main/infra"
	"main/router"
	"net/http"
)

const (
	httpPort = ":3000"
)

type Config struct {
	Router     *router.Router
	DB         *infra.DB
	Controller *controller.Controller
}

func NewConf(
	db *infra.DB,
	router *router.Router,
	controller *controller.Controller,
) *Config {
	return &Config{DB: db, Router: router}
}

type Server struct {
	Conf *Config
}

func NewServer(config *Config) *Server {
	return &Server{
		Conf: config,
	}
}

// Write a fonction that print a chrisma tree
func Setup() *Server {
	// log.Println("Setup DB connection")
	var db *infra.DB

	// Setup des routes de l'API
	log.Println("Setup Http controller")
	mux := http.NewServeMux()
	control := controller.SetUpController(mux, db)

	// Setup HTTP request
	log.Println("Setup Web router")
	router := router.Setup(mux)

	configServer := NewConf(db, router, control)
	return NewServer(configServer)
}

func main() {
	// Setup DB connection
	server := Setup()
	log.Println("Listen on localhost:3000")
	err := http.ListenAndServe(httpPort, server.Conf.Router.Mux)
	if err != nil {
		log.Fatal(err)
	}
}
