package css

import (
	"context"
	"embed"
	"text/template"
	sfom_css "github.com/sfomuseum/go-template/css"	
)

//go:embed *.css
var FS embed.FS

// LoadTemplates loads the templates in the `html` package's embedded filesystem
// and returns a new `template.Template` instance with support for the (template)
// functions defined in `TemplatesFuncMap`.
func LoadTemplates(ctx context.Context) (*template.Template, error) {

	return sfom_css.LoadTemplates(ctx, FS)
}
