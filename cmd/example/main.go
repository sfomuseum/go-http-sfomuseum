package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"github.com/sfomuseum/go-http-sfomuseum"
	"github.com/sfomuseum/go-http-sfomuseum/templates/html"
	"html/template"
	"log"
	"net/http"
)

type ExampleVars struct {
	IncludeNaviSearch bool
	Title             string
}

func ExampleHandler(templates *template.Template, example_vars *ExampleVars) (http.Handler, error) {

	t := templates.Lookup("example")

	if t == nil {
		return nil, errors.New("Missing 'example' template")
	}

	fn := func(rsp http.ResponseWriter, req *http.Request) {

		err := t.Execute(rsp, example_vars)

		if err != nil {
			http.Error(rsp, err.Error(), http.StatusInternalServerError)
		}

		return
	}

	return http.HandlerFunc(fn), nil
}

func main() {

	host := flag.String("host", "localhost", "The host name to listen for requests on.")
	port := flag.Int("port", 8080, "The host port to listen for requests on.")

	flag.Parse()

	ctx := context.Background()

	t, err := html.LoadTemplates(ctx, "*.html")

	if err != nil {
		log.Fatalf("Failed to parse templates, %v", err)
	}

	mux := http.NewServeMux()

	err = sfomuseum.AppendAssetHandlers(mux)

	if err != nil {
		log.Fatalf("Failed to append SFOMuseum assets handler, %v", err)
	}

	sfomuseum_opts := sfomuseum.DefaultSFOMuseumOptions()

	example_vars := &ExampleVars{
		Title:             "Example",
		IncludeNaviSearch: true,
	}

	example_handler, err := ExampleHandler(t, example_vars)

	if err != nil {
		log.Fatalf("Failed to create example handler, %v", err)
	}

	example_handler = sfomuseum.AppendResourcesHandler(example_handler, sfomuseum_opts)

	mux.Handle("/", example_handler)

	endpoint := fmt.Sprintf("%s:%d", *host, *port)
	log.Printf("Listening for requests on %s\n", endpoint)

	err = http.ListenAndServe(endpoint, mux)

	if err != nil {
		log.Fatalf("Failed to serve requests, %v", err)
	}

}
