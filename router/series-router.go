package router

import (
	"html/template"
	"log"
	"net/http"
)

type seriesRouter struct {
	seriesContent seriesContent
	templates     *Templates
}

type seriesContent struct {
	Content string
}

func newSeriesTemplate() *Templates {
	return &Templates{templates: template.Must(template.ParseGlob("views/series.html"))}
}

func newSeriesRouter() *seriesRouter {
	return &seriesRouter{
		seriesContent: seriesContent{
			Content: "VOICI LE CONTENT DE SERIES"},
		templates: newSeriesTemplate(),
	}
}

func (sr *seriesRouter) routeSeriesContent(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE series")
	err := sr.templates.Render(w, "series-content", sr.seriesContent)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}
