package router

import (
	"html/template"
	"io"
	"log"
	"net/http"
)

type Router struct {
	Mux       *http.ServeMux
	templates *Templates
}

type Count struct {
	Count int
	Error *string
}

type Templates struct {
	templates *template.Template
}

var ErrorFrom string = "MAUVAIS NOM D'UTILISATEUR OU MDP"

func newTemplate() *Templates {
	return &Templates{templates: template.Must(template.ParseGlob("views/*.html"))}
}

func (t *Templates) Render(w io.Writer, name string, data any) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

/*
* Fonction de Setup du router pour le site web
 */
func Setup(mux *http.ServeMux) *Router {
	router := newRouter(mux)

	// Serve static file
	router.Mux.Handle(
		"/assets/",
		http.StripPrefix("/assets/", http.FileServer(http.Dir("./views/assets/"))),
	)

	router.Mux.Handle(
		"/js/service",
		http.StripPrefix("/js/service", http.FileServer(http.Dir("./views/js/component"))),
	)

	router.Mux.Handle(
		"/js/component",
		http.StripPrefix("/js/component", http.FileServer(http.Dir("./views/js/component"))),
	)

	router.Mux.Handle(
		"/js/class",
		http.StripPrefix("/js/class", http.FileServer(http.Dir("./views/js/class"))),
	)

	router.Mux.Handle(
		"/js/",
		http.StripPrefix("/js/", http.FileServer(http.Dir("./views/js/"))),
	)

	// Route pour test
	router.Mux.HandleFunc("/test", router.routeTest)

	// Route par defaut
	router.Mux.HandleFunc("/", router.routeHome)

	return router
}

func newRouter(mux *http.ServeMux) *Router {
	return &Router{
		Mux:       mux,
		templates: newTemplate(),
	}
}

func (rt *Router) routeHome(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE HOME")
	err := rt.templates.Render(w, "index.html", nil)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}
func (rt *Router) routeTest(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE Test")
	err := rt.templates.Render(w, "test.html", nil)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}
