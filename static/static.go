package static

import (
	"embed"
)

//go:embed css/* images/* fonts/* favicon.png
var FS embed.FS
