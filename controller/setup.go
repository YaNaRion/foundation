package controller

import (
	"main/infra"
	"net/http"
)

const ContentTypeJSON = "application/json"

type Controller struct {
	db  *infra.DB
	mux *http.ServeMux
}

func newController(db *infra.DB, mux *http.ServeMux) *Controller {
	return &Controller{
		db:  db,
		mux: mux,
	}
}

func SetUpController(mux *http.ServeMux, db *infra.DB) *Controller {
	controller := newController(db, mux)
	mux.HandleFunc("GET /missions/", controller.getRandom)
	return controller
}

func writeResponse(w http.ResponseWriter, data []byte) {
	w.Header().Set("Contend-Type", ContentTypeJSON)
	_, err := w.Write(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
}
