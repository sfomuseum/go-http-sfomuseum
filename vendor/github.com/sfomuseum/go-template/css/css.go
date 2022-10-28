// Package css provides methods for loading CSS (.css) templates with default functions
package css

import (
	"context"
	"github.com/sfomuseum/go-template/funcs"
	"io/fs"
	"text/template"
)

// LoadTemplates loads CSS (.css) from 't_fs' with default functions assigned.
func LoadTemplates(ctx context.Context, t_fs fs.FS) (*template.Template, error) {

	funcs := TemplatesFuncMap()
	t := template.New("css").Funcs(funcs)
	return t.ParseFS(t_fs, "*.css")
}

// TemplatesFuncMap() returns a `template.FuncMap` instance with default functions assigned.
func TemplatesFuncMap() template.FuncMap {

	return template.FuncMap{
		// For example: {{ if (IsAvailable "Account" .) }}
		"IsAvailable": funcs.IsAvailable,
	}
}
