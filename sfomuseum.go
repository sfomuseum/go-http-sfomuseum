package sfomuseum

import (
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"

	"github.com/aaronland/go-http-bootstrap"
	aa_static "github.com/aaronland/go-http-static"
	"github.com/sfomuseum/go-http-rollup"
	"github.com/sfomuseum/go-http-sfomuseum/v2/static"
)

// SFOMuseumOptions provides a list of JavaScript and CSS link to include with HTML output.
type SFOMuseumOptions struct {
	JS  []string
	CSS []string
	// A bootstrap.BoostrapOptions struct
	BootstrapOptions *bootstrap.BootstrapOptions
	// AppendJavaScriptAtEOF is a boolean flag to append JavaScript markup at the end of an HTML document
	// rather than in the <head> HTML element. Default is false
	AppendJavaScriptAtEOF bool
	// Rollup (minify and bundle) JavaScript and CSS assets.
	RollupAssets bool
	Prefix       string
	Logger       *log.Logger
	// By default the go-http-protomaps package will also include and reference Bootstrap.js resources using the aaronland/go-http-bootstrap package. If you want or need to disable this behaviour set this variable to false.
	AppendBootstrapResources bool
	// By default the go-http-protomaps package will also include and reference Bootstrap.js assets using the aaronland/go-http-bootstrap package. If you want or need to disable this behaviour set this variable to false.
	AppendBootstrapAssets bool
}

// Return a *SFOMuseumOptions struct with default paths and URIs.
func DefaultSFOMuseumOptions() *SFOMuseumOptions {

	logger := log.New(io.Discard, "", 0)

	bootstrap_opts := bootstrap.DefaultBootstrapOptions()

	opts := &SFOMuseumOptions{
		CSS: []string{
			"/css/sfomuseum.org.min.css",
			"/css/sfomuseum.common.min.css",
		},
		JS: []string{
			"/javascript/sfomuseum.org.deps.min.js",
			"/javascript/sfomuseum.org.min.js",
		},
		Logger:                   logger,
		BootstrapOptions:         bootstrap_opts,
		AppendBootstrapResources: true,
		AppendBootstrapAssets:    true,
	}

	return opts
}

func (opts *SFOMuseumOptions) EnableCollectionNavi() {

	opts.CSS = append(opts.CSS, "/css/sfomuseum.collection.navi.css")
	opts.JS = append(opts.JS, "/javascript/sfomuseum.collection.navi.init.js")
}

// AppendResourcesHandler will rewrite any HTML produced by previous handler to include the necessary markup to load SFOMuseum JavaScript and CSS files and related assets.
func AppendResourcesHandler(next http.Handler, opts *SFOMuseumOptions) http.Handler {

	if opts.AppendBootstrapResources {

		opts.BootstrapOptions.AppendJavaScriptAtEOF = opts.AppendJavaScriptAtEOF
		opts.BootstrapOptions.RollupAssets = opts.RollupAssets
		opts.BootstrapOptions.Prefix = opts.Prefix
		opts.BootstrapOptions.Logger = opts.Logger

		next = bootstrap.AppendResourcesHandler(next, opts.BootstrapOptions)
	}

	static_opts := aa_static.DefaultResourcesOptions()
	static_opts.AppendJavaScriptAtEOF = opts.AppendJavaScriptAtEOF

	js_uris := opts.JS
	css_uris := opts.CSS

	if opts.RollupAssets {

		if len(opts.JS) > 1 {
			js_uris = []string{
				"/javascript/sfomuseum.rollup.js",
			}
		}

		if len(opts.CSS) > 1 {
			css_uris = []string{
				"/css/sfomuseum.rollup.css",
			}
		}
	}

	static_opts.JS = js_uris
	static_opts.CSS = css_uris

	return aa_static.AppendResourcesHandlerWithPrefix(next, static_opts, opts.Prefix)
}

// Append all the files in the net/http FS instance containing the embedded SFOMuseum assets to an *http.ServeMux instance.
func AppendAssetHandlers(mux *http.ServeMux, opts *SFOMuseumOptions) error {

	if opts.AppendBootstrapAssets {

		opts.BootstrapOptions.AppendJavaScriptAtEOF = opts.AppendJavaScriptAtEOF
		opts.BootstrapOptions.RollupAssets = opts.RollupAssets
		opts.BootstrapOptions.Prefix = opts.Prefix
		opts.BootstrapOptions.Logger = opts.Logger

		err := bootstrap.AppendAssetHandlers(mux, opts.BootstrapOptions)

		if err != nil {
			return fmt.Errorf("Failed to append Bootstrap assets, %w", err)
		}
	}

	if !opts.RollupAssets {
		return aa_static.AppendStaticAssetHandlersWithPrefix(mux, static.FS, opts.Prefix)
	}

	others := []string{
		"images",
		"fonts",
	}

	for _, label := range others {

		err := serveSubDir(mux, opts, label)

		if err != nil {
			return fmt.Errorf("Failed to serve %s sub directory, %w", label, err)
		}
	}

	// START OF this should eventually be made a generic function in go-http-rollup

	js_paths := make([]string, len(opts.JS))
	css_paths := make([]string, len(opts.CSS))

	for idx, path := range opts.JS {
		path = strings.TrimLeft(path, "/")
		js_paths[idx] = path
	}

	for idx, path := range opts.CSS {
		path = strings.TrimLeft(path, "/")
		css_paths[idx] = path
	}

	switch len(js_paths) {
	case 0:
		// pass
	case 1:
		err := serveSubDir(mux, opts, "javascript")

		if err != nil {
			return fmt.Errorf("Failed to append static asset handler for javascript FS, %w", err)
		}

	default:

		rollup_js_paths := map[string][]string{
			"sfomuseum.rollup.js": js_paths,
		}

		rollup_js_opts := &rollup.RollupJSHandlerOptions{
			FS:     static.FS,
			Paths:  rollup_js_paths,
			Logger: opts.Logger,
		}

		rollup_js_handler, err := rollup.RollupJSHandler(rollup_js_opts)

		if err != nil {
			return fmt.Errorf("Failed to create rollup JS handler, %w", err)
		}

		rollup_js_uri := "/javascript/sfomuseum.rollup.js"

		if opts.Prefix != "" {

			u, err := url.JoinPath(opts.Prefix, rollup_js_uri)

			if err != nil {
				return fmt.Errorf("Failed to append prefix to %s, %w", rollup_js_uri, err)
			}

			rollup_js_uri = u
		}

		mux.Handle(rollup_js_uri, rollup_js_handler)
	}

	// CSS

	switch len(css_paths) {
	case 0:
		// pass
	case 1:

		err := serveSubDir(mux, opts, "css")

		if err != nil {
			return fmt.Errorf("Failed to append static asset handler for css FS, %w", err)
		}

	default:

		rollup_css_paths := map[string][]string{
			"sfomuseum.rollup.css": css_paths,
		}

		rollup_css_opts := &rollup.RollupCSSHandlerOptions{
			FS:     static.FS,
			Paths:  rollup_css_paths,
			Logger: opts.Logger,
		}

		rollup_css_handler, err := rollup.RollupCSSHandler(rollup_css_opts)

		if err != nil {
			return fmt.Errorf("Failed to create rollup CSS handler, %w", err)
		}

		rollup_css_uri := "/css/sfomuseum.rollup.css"

		if opts.Prefix != "" {

			u, err := url.JoinPath(opts.Prefix, rollup_css_uri)

			if err != nil {
				return fmt.Errorf("Failed to append prefix to %s, %w", rollup_css_uri, err)
			}

			rollup_css_uri = u
		}

		mux.Handle(rollup_css_uri, rollup_css_handler)
	}

	// END OF this should eventually be made a generic function in go-http-rollup

	return nil
}

func serveSubDir(mux *http.ServeMux, opts *SFOMuseumOptions, dirname string) error {

	sub_fs, err := fs.Sub(static.FS, dirname)

	if err != nil {
		return fmt.Errorf("Failed to load %s FS, %w", dirname, err)
	}

	sub_prefix := dirname

	if opts.Prefix != "" {

		prefix, err := url.JoinPath(opts.Prefix, sub_prefix)

		if err != nil {
			return fmt.Errorf("Failed to append prefix to %s, %w", sub_prefix, err)
		}

		sub_prefix = prefix
	}

	err = aa_static.AppendStaticAssetHandlersWithPrefix(mux, sub_fs, sub_prefix)

	if err != nil {
		return fmt.Errorf("Failed to append static asset handler for %s FS, %w", dirname, err)
	}

	return nil
}

// FileHandlerFromPath will take a path and create a http.FileServer handler
// instance for the files in its root directory. The handler is returned with
// a relative URI for the filename in 'path' to be assigned to a net/http
// ServeMux instance.
func FileHandlerFromPath(path string, prefix string) (string, http.Handler, error) {

	abs_path, err := filepath.Abs(path)

	if err != nil {
		return "", nil, fmt.Errorf("Failed to determine absolute path for '%s', %v", path, err)
	}

	fname := filepath.Base(abs_path)
	root := filepath.Dir(abs_path)

	tile_dir := http.Dir(root)
	tile_handler := http.FileServer(tile_dir)

	tile_url := fmt.Sprintf("/%s", fname)

	if prefix != "" {
		tile_handler = http.StripPrefix(prefix, tile_handler)
		tile_url = filepath.Join(prefix, fname)
	}

	return tile_url, tile_handler, nil
}
