// minify is a command line tool for minifying CSS and JavaScript assets.
package main

import (
	"flag"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/js"
	"log"
	"os"
)

func main() {

	media_type := flag.String("media-type", "", "A media-type to use for minifying. Valid options are: text/css, text/js.")
	flag.Parse()

	m := minify.New()
	m.AddFunc("text/css", css.Minify)
	m.AddFunc("text/js", js.Minify)

	wr := os.Stdout

	for _, path := range flag.Args() {

		r, err := os.Open(path)

		if err != nil {
			log.Fatalf("Failed to open %s, %v", path, err)
		}

		defer r.Close()

		err = m.Minify(*media_type, wr, r)

		if err != nil {
			log.Fatalf("Failed to minify %s, %v", path, err)
		}
	}
}
