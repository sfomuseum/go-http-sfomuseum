package html

import (
	"context"
	"embed"
	"html/template"
	"reflect"
)

//go:embed *.html
var FS embed.FS

func LoadTemplates(ctx context.Context, path_templates string) (*template.Template, error) {

	funcs := TemplatesFuncMap()
	
	t := template.New("sfomuseum").Funcs(funcs)

	return t.ParseFS(FS, "*.html")
}

func TemplatesFuncMap() template.FuncMap {

	return template.FuncMap{
		"IsAvailable": avail,
	};
}

// this is to account for the absense of SFOM properties in the go-http-fault
// TemplatedFaultHandler variables struct, specifically things like .Account
// we may want to revisit that in the future but today we'll just do this
// (20200807/thisisaaronland)
//
// https://stackoverflow.com/questions/44675087/golang-template-variable-isset

func avail(name string, data interface{}) bool {
	v := reflect.ValueOf(data)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	if v.Kind() != reflect.Struct {
		return false
	}
	return v.FieldByName(name).IsValid()
}
