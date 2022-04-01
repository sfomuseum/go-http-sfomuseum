package secure

import (
	"net/http"
)

// https://github.com/unrolled/secure/blob/v1/secure.go

// SecuresHeadersHandler is a middleware `http.Handler` that appends specific HTTP headers
// for improved security.
func SecureHeadersHandler(next http.Handler) http.Handler {

	headers := map[string][]string{
		"X-Content-Type-Options": []string{"nosniff"},
		"X-Frame-Options":        []string{"DENY"},
		"Cache-Control":          []string{`no-cache="Set-Cookie"`},
	}

	fn := func(rsp http.ResponseWriter, req *http.Request) {

		for key, values := range headers {
			for _, value := range values {
				rsp.Header().Set(key, value)
			}
		}

		next.ServeHTTP(rsp, req)
	}

	return http.HandlerFunc(fn)
}
