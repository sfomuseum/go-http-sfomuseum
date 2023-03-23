// package html provides HTML templates for SFO Museum web applications.
// The `common_*` HTML templates are derived from the source code of the sfomuseum.org website.
package html

import (
	"context"
	"embed"
	sfom_html "github.com/sfomuseum/go-template/html"
	"html/template"
)

//go:embed *.html
var FS embed.FS

// LoadTemplates loads the templates in the `html` package's embedded filesystem
// and returns a new `template.Template` instance with support for the (template)
// functions defined in `TemplatesFuncMap`.
func LoadTemplates(ctx context.Context) (*template.Template, error) {

	return sfom_html.LoadTemplates(ctx, FS)
}
