package controller

import (
	"encoding/json"
	"log"
	"net/http"
)

func (c *Controller) getRandom(w http.ResponseWriter, r *http.Request) {
	log.Printf("GET MISSIONS REQUEST FROM: %s", r.RemoteAddr)
	var missions string

	missionJson, err := json.Marshal(missions)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	writeResponse(w, missionJson)
}
