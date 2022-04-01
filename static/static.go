// package static provides static assets for SFO Museum web applications.
package static

import (
	"embed"
)

//go:embed javascript/* css/* images/* fonts/* favicon.png
var FS embed.FS
