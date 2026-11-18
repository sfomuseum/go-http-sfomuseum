// disabled is a simple HTTP web server that displays a webpage using the common SFO Museum header and footer elements
// with a message indicating this website is disabled.
package main

import (
	"context"
	"errors"
	"html/template"
	"log"
	"net/http"

	"github.com/aaronland/go-http/v4/server"
	"github.com/sfomuseum/go-flags/flagset"
	"github.com/sfomuseum/go-http-sfomuseum/v3"
	"github.com/sfomuseum/go-http-sfomuseum/v3/templates/html"
)

// DisabledVars is struct containing template variables for the disabled website.
type DisabledVars struct {
	// Title is the value assigned to the disabled website's HTML `title` element.
	Title string
	Message string
}

// DisabledHandler is a `http.Handler` for rendering the disabled website templates.
func DisabledHandler(templates *template.Template, disabled_vars *DisabledVars) (http.Handler, error) {

	t := templates.Lookup("disabled")

	if t == nil {
		return nil, errors.New("Missing 'disabled' template")
	}

	fn := func(rsp http.ResponseWriter, req *http.Request) {

		err := t.Execute(rsp, disabled_vars)

		if err != nil {
			http.Error(rsp, err.Error(), http.StatusInternalServerError)
		}

		return
	}

	return http.HandlerFunc(fn), nil
}

func main() {

	var server_uri string
	var js_eof bool
	var rollup_assets bool
	
	fs := flagset.NewFlagSet("disabled")

	fs.StringVar(&server_uri, "server-uri", "http://localhost:8080", "A valid aaronland/go-http-server URI.")

	fs.BoolVar(&js_eof, "javascript-at-eof", false, "Append JavaScript resources to end of HTML file.")
	fs.BoolVar(&rollup_assets, "rollup-assets", false, "Rollup (minify and bundle) JavaScript and CSS assets.")

	flagset.Parse(fs)

	err := flagset.SetFlagsFromEnvVars(fs, "SFOMUSEUM")

	if err != nil {
		log.Fatalf("Failed to set flags from environment variables, %v", err)
	}

	ctx := context.Background()

	t, err := html.LoadTemplates(ctx)

	if err != nil {
		log.Fatalf("Failed to parse templates, %v", err)
	}

	mux := http.NewServeMux()

	sfomuseum_opts := sfomuseum.DefaultSFOMuseumOptions()

	sfomuseum_opts.EnableCollectionNavi()

	sfomuseum_opts.AppendJavaScriptAtEOF = js_eof
	sfomuseum_opts.RollupAssets = rollup_assets

	err = sfomuseum.AppendAssetHandlers(mux, sfomuseum_opts)

	if err != nil {
		log.Fatalf("Failed to append SFOMuseum assets handler, %v", err)
	}

	disabled_vars := &DisabledVars{
		Title: "This website is currently disabled",
	}

	disabled_handler, err := DisabledHandler(t, disabled_vars)

	if err != nil {
		log.Fatalf("Failed to create disabled handler, %v", err)
	}

	disabled_handler = sfomuseum.AppendResourcesHandler(disabled_handler, sfomuseum_opts)

	mux.Handle("/", disabled_handler)

	s, err := server.NewServer(ctx, server_uri)

	if err != nil {
		log.Fatalf("Failed to create server, %v", err)
	}

	log.Printf("Listening for requests on %s\n", s.Address())

	err = s.ListenAndServe(ctx, mux)

	if err != nil {
		log.Fatalf("Failed to serve requests, %v", err)
	}

}
