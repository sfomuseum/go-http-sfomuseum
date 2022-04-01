// example is a simple HTTP web server that displays a webpage using the common SFO Museum header and footer elements.
package main

import (
	"context"
	"errors"
	"github.com/aaronland/go-http-server"
	"github.com/sfomuseum/go-flags/flagset"
	"github.com/sfomuseum/go-http-sfomuseum"
	"github.com/sfomuseum/go-http-sfomuseum/templates/html"
	"html/template"
	"log"
	"net/http"
)

// ExampleVars is struct containing template variables for the example website.
type ExampleVars struct {
	// Title is the value assigned to the example website's HTML `title` element.
	Title string
}

// ExampleHandler is a `http.Handler` for rendering the example website templates.
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

	fs := flagset.NewFlagSet("example")

	server_uri := fs.String("server-uri", "http://localhost:8080", "A valid aaronland/go-http-server URI.")

	flagset.Parse(fs)

	err := flagset.SetFlagsFromEnvVars(fs, "EXAMPLE")

	if err != nil {
		log.Fatalf("Failed to set flags from environment variables, %v", err)
	}

	ctx := context.Background()

	t, err := html.LoadTemplates(ctx)

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
		Title: "Example",
	}

	example_handler, err := ExampleHandler(t, example_vars)

	if err != nil {
		log.Fatalf("Failed to create example handler, %v", err)
	}

	example_handler = sfomuseum.AppendResourcesHandler(example_handler, sfomuseum_opts)

	mux.Handle("/", example_handler)

	s, err := server.NewServer(ctx, *server_uri)

	if err != nil {
		log.Fatalf("Failed to create server, %v", err)
	}

	log.Printf("Listening for requests on %s\n", s.Address())

	err = s.ListenAndServe(ctx, mux)

	if err != nil {
		log.Fatalf("Failed to serve requests, %v", err)
	}

}
