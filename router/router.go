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
	count     Count
}

type Count struct {
	Count int
	Error *string
}

type Templates struct {
	templates *template.Template
}

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

	router.Mux.Handle(
		"/assets/",
		http.StripPrefix("/assets/", http.FileServer(http.Dir("./views/"))),
	)

	router.Mux.HandleFunc("POST /count", router.handleClick)
	router.Mux.HandleFunc("/admin", router.routeAdmin)
	router.Mux.HandleFunc("POST /admin-connection", router.checkAdminConnection)
	router.Mux.HandleFunc("/", router.routeHome)
	return router
}

func newRouter(mux *http.ServeMux) *Router {
	return &Router{
		Mux:       mux,
		count:     Count{Count: 0},
		templates: newTemplate(),
	}
}

type FromName struct {
	Fname string `json:"fname"`
	Lname string `json:"lname"`
}

var ErrorFrom string = "MAUVAIS NOM D'UTILISATEUR OU MDP"

func (rt *Router) checkAdminConnection(w http.ResponseWriter, r *http.Request) {
	var data FromName
	data.Fname = r.FormValue("fname")
	data.Lname = r.FormValue("lname")
	log.Println(data.Fname)
	log.Println(data.Lname)
	if data.Fname == "124" && data.Lname == "qwe" {
		http.Redirect(w, r, "/admin?id=oui", http.StatusTemporaryRedirect)
	} else {
		rt.count.Error = &ErrorFrom
		err := rt.templates.Render(w, "index", rt.count)
		if err != nil {
			log.Printf("An error occurred while sending HTML file: %s \n", err)
		}
	}
}

func (rt *Router) handleClick(w http.ResponseWriter, r *http.Request) {
	rt.count.Count++
	err := rt.templates.Render(w, "count", rt.count)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}

func (rt *Router) routeHome(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE INDEX")
	log.Println(r.RequestURI)
	err := rt.templates.Render(w, "index", rt.count)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}

func (rt *Router) routeAdmin(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE ADMIN")
	if r.URL.Query().Get("id") == "oui" {
		err := rt.templates.Render(w, "admin", rt.count)
		if err != nil {
			log.Printf("An error occurred while sending HTML file: %s \n", err)
		}
		return
	}
	http.Redirect(w, r, "/", http.StatusPermanentRedirect)

}
