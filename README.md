# go-http-sfomuseum

Go package to provide common elements for web applications, notably headers and footers.

## Important

This is work in progress and documentation is incomplete.

## Motivation

Aside from providing reusable components for Go-based web applications the hope is that we can use this package to define modular components (templates, CSS, JS) for common elements across all SFO Museum websites, notably the login applications (Go) and things like the Collection or Mills Field websites (PHP).

The templates will not be portable across languages but the idea is for this package to be the reference implementation for things like the navigation header that other application might adapt or supplement as needed.

## Usage

For now, have a look at [cmd/example/main.go](cmd/example/main.go)

