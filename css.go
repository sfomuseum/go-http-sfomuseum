package sfomuseum

/*

For example, if we are serving an application off of a "leaf" node like example.com/foo
and need to override the default font URL definitions which assume /fonts in the common
CSS files:

	if uri_prefix != "" {

		css_t, err := sfom_css.LoadTemplates(ctx)

		if err != nil {
			return fmt.Errorf("Failed to parse CSS templates, %w", err)
		}

		font_t := css_t.Lookup("fonts")

		if font_t == nil {
			return fmt.Errorf("Failed to find 'fonts' CSS template")
		}

		css_opts := &sfomuseum.CSSHandlerOptions{
			URIPrefix: uri_prefix,
			Logger: logger,
			Template: font_t,
		}

		css_handler, err := sfomuseum.CSSHandler(css_opts)

		if err != nil {
			return fmt.Errorf("Failed to create css handler, %w", err)
		}

		fonts_uri, err := url.JoinPath(uri_prefix, "/css/fonts.css")

		if err != nil {
			return fmt.Errorf("Failed to derive fonts URI, %w", err)
		}

		mux.Handle(fonts_uri, css_handler)
	}

*/

import (
	"log"
	"net/http"
	"text/template"
)

type CSSHandlerOptions struct {
	URIPrefix string
	Logger    *log.Logger
	Template  *template.Template
}

type CSSHandlerVars struct {
	URIPrefix string
}

func CSSHandler(opts *CSSHandlerOptions) (http.Handler, error) {

	fn := func(rsp http.ResponseWriter, req *http.Request) {

		vars := CSSHandlerVars{
			URIPrefix: opts.URIPrefix,
		}

		rsp.Header().Set("Content-type", "text/css")

		err := opts.Template.Execute(rsp, vars)

		if err != nil {
			opts.Logger.Printf("Failed to render CSS template for %s, %v", req.URL.Path, err)
			http.Error(rsp, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		return
	}

	return http.HandlerFunc(fn), nil
}
