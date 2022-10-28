// Package html provides methods for loading HTML (.html) templates with default functions
package html

import (
	"context"
	"github.com/sfomuseum/go-template/funcs"
	"html/template"
	"io/fs"
)

// LoadTemplates loads HTML (.html) from 't_fs' with default functions assigned.
func LoadTemplates(ctx context.Context, t_fs fs.FS) (*template.Template, error) {

	funcs := TemplatesFuncMap()
	t := template.New("html").Funcs(funcs)
	return t.ParseFS(t_fs, "*.html")
}

// TemplatesFuncMap() returns a `template.FuncMap` instance with default functions assigned.
func TemplatesFuncMap() template.FuncMap {

	return template.FuncMap{
		// For example: {{ if (IsAvailable "Account" .) }}
		"IsAvailable": funcs.IsAvailable,
	}
}
