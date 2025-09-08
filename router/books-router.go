package router

import (
	"html/template"
	"log"
	"net/http"
)

type booksRouter struct {
	booksContent BooksContent
	templates    *Templates
}

type BooksContent struct {
	Foundation          string
	FoundationAmdEmpire string
	SecondeFoundation   string
	FoundationFoud      string
	FoundationAndEarth  string
}

func newBooksTemplate() *Templates {
	return &Templates{templates: template.Must(template.ParseGlob("views/books.html"))}
}

func newBooksRouter() *booksRouter {
	return &booksRouter{
		booksContent: BooksContent{
			Foundation:          "VOICI FONDATION",
			FoundationAmdEmpire: "VOICI FONDATION ET EMPIRE",
			SecondeFoundation:   "VOICI SECONDE FONDATION",
			FoundationFoud:      "VOICI FONDATION FOUDROYEE",
			FoundationAndEarth:  "VOICE FONDATION ET LA TERRE",
		},
		templates: newBooksTemplate(),
	}
}

func (br *booksRouter) routeBooksContent(w http.ResponseWriter, r *http.Request) {
	log.Println("ROUTE BOOKS")
	err := br.templates.Render(w, "books-content", br.booksContent)
	if err != nil {
		log.Printf("An error occurred while sending HTML file: %s \n", err)
	}
}
