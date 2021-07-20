package static

import (
	"embed"
)

//go:embed css/* images/* favicon.png
var FS embed.FS
