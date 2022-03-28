package sfomuseum

import (
	"fmt"
	"github.com/aaronland/go-http-bootstrap"
	"github.com/aaronland/go-http-rewrite"
	"github.com/sfomuseum/go-http-sfomuseum/static"
	"io/fs"
	_ "log"
	"net/http"
	"path/filepath"
	"strings"
)

// SFOMuseumOptions provides a list of JavaScript and CSS link to include with HTML output.
type SFOMuseumOptions struct {
	JS  []string
	CSS []string
}

// Return a *SFOMuseumOptions struct with default paths and URIs.
func DefaultSFOMuseumOptions() *SFOMuseumOptions {

	opts := &SFOMuseumOptions{
		CSS: []string{
			"/css/css_W0cKvDTOIvYQGze2fQgYetVT_LTYEp1XuXvz4AdVYjE.css",
			"/css/css_tYMnZJENio3fbqTvIRK7wb8dpGIx2TaK1n--M2StjfQ.css",
			"/css/sfomuseum.org.social.css",
			"/css/sfomuseum.org.bootstrap.css",
		},
		JS: []string{
			/*
				"/javascript/js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU.js",
				"/javascript/js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0.js",
				"/javascript/js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak.js",
			*/
		},
	}

	return opts
}

// AppendResourcesHandler will rewrite any HTML produced by previous handler to include the necessary markup to load SFOMuseum JavaScript and CSS files and related assets.
func AppendResourcesHandler(next http.Handler, opts *SFOMuseumOptions) http.Handler {
	return AppendResourcesHandlerWithPrefix(next, opts, "")
}

// AppendResourcesHandlerWithPrefix will rewrite any HTML produced by previous handler to include the necessary markup to load SFOMuseum JavaScript files and related assets ensuring that all URIs are prepended with a prefix.
func AppendResourcesHandlerWithPrefix(next http.Handler, opts *SFOMuseumOptions, prefix string) http.Handler {

	// The order of events here is important. We want to load the Bootstrap
	// first so that /css/sfomuseum.org.bootstrap.css follows it and applies
	// any necessary fixes for layout issues.

	bootstrap_opts := bootstrap.DefaultBootstrapOptions()

	bootstrap_opts.JS = []string{
		"/javascript/bootstrap.bundle.min.js",
	}

	handler := bootstrap.AppendResourcesHandler(next, bootstrap_opts)

	js := opts.JS
	css := opts.CSS

	if prefix != "" {

		for i, path := range js {
			js[i] = appendPrefix(prefix, path)
		}

		for i, path := range css {
			css[i] = appendPrefix(prefix, path)
		}
	}

	ext_opts := &rewrite.AppendResourcesOptions{
		JavaScript:  js,
		Stylesheets: css,
	}

	handler = rewrite.AppendResourcesHandler(handler, ext_opts)
	return handler
}

// AssetsHandler returns a net/http FS instance containing the embedded SFOMuseum assets that are included with this package.
func AssetsHandler() (http.Handler, error) {

	http_fs := http.FS(static.FS)
	return http.FileServer(http_fs), nil
}

// AssetsHandler returns a net/http FS instance containing the embedded SFOMuseum assets that are included with this package ensuring that all URLs are stripped of prefix.
func AssetsHandlerWithPrefix(prefix string) (http.Handler, error) {

	fs_handler, err := AssetsHandler()

	if err != nil {
		return nil, err
	}

	prefix = strings.TrimRight(prefix, "/")

	if prefix == "" {
		return fs_handler, nil
	}

	rewrite_func := func(req *http.Request) (*http.Request, error) {
		req.URL.Path = strings.Replace(req.URL.Path, prefix, "", 1)
		return req, nil
	}

	rewrite_handler := rewrite.RewriteRequestHandler(fs_handler, rewrite_func)
	return rewrite_handler, nil
}

// Append all the files in the net/http FS instance containing the embedded SFOMuseum assets to an *http.ServeMux instance.
func AppendAssetHandlers(mux *http.ServeMux) error {
	return AppendAssetHandlersWithPrefix(mux, "")
}

// Append all the files in the net/http FS instance containing the embedded SFOMuseum assets to an *http.ServeMux instance ensuring that all URLs are prepended with prefix.
func AppendAssetHandlersWithPrefix(mux *http.ServeMux, prefix string) error {

	err := bootstrap.AppendAssetHandlersWithPrefix(mux, prefix)

	if err != nil {
		return fmt.Errorf("Failed to append Bootstrap asset handlers, %v", err)
	}

	asset_handler, err := AssetsHandlerWithPrefix(prefix)

	if err != nil {
		return nil
	}

	walk_func := func(path string, info fs.DirEntry, err error) error {

		if path == "." {
			return nil
		}

		if info.IsDir() {
			return nil
		}

		if prefix != "" {
			path = appendPrefix(prefix, path)
		}

		if !strings.HasPrefix(path, "/") {
			path = fmt.Sprintf("/%s", path)
		}

		mux.Handle(path, asset_handler)
		return nil
	}

	return fs.WalkDir(static.FS, ".", walk_func)
}

func appendPrefix(prefix string, path string) string {

	prefix = strings.TrimRight(prefix, "/")

	if prefix != "" {
		path = strings.TrimLeft(path, "/")
		path = filepath.Join(prefix, path)
	}

	return path
}
