GOMOD=readonly
MINIFY=minify

vuln:
	govulncheck ./...

debug:
	@make css
	@make js
	go run -mod $(GOMOD) cmd/example/main.go -javascript-at-eof -rollup-assets

local-scan:
	/usr/local/sfomuseum/bin/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=go-http-sfomuseum -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$(TOKEN)

lambda:
	if test -f main; then rm -f main; fi
	if test -f example.zip; then rm -f example.zip; fi
	GOOS=linux go build -mod $(GOMOD) -o main cmd/example/main.go
	zip example.zip main
	rm -f main

docker:
	docker build -t sfomuseum-sweater-server .	

# jf: https://github.com/aaronland/go-json-tools
# copy/paste in to templates/html/common_footer.html

config:
	jf -input static/javascript/config.pruned.json -output -

js:
	@make js-sfom
	@make js-deps

js-sfom:
	echo "// This file was generated by robots\n\n" > static/javascript/sfomuseum.org.js
	echo "window.addEventListener('load', function(e){\n\n" >> static/javascript/sfomuseum.org.js
	echo "// js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU.pruned.js\n\n" >> static/javascript/sfomuseum.org.js
	cat static/javascript/js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU.pruned.js >> static/javascript/sfomuseum.org.js
	echo "\n" >> static/javascript/sfomuseum.org.js 
	echo "// js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0.pruned.js\n\n" >> static/javascript/sfomuseum.org.js
	cat static/javascript/js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0.pruned.js >> static/javascript/sfomuseum.org.js
	echo "\n" >> static/javascript/sfomuseum.org.js 
	echo "// js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak.pruned.js\n\n" >> static/javascript/sfomuseum.org.js
	cat static/javascript/js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak.pruned.js >> static/javascript/sfomuseum.org.js
	echo "\n" >> static/javascript/sfomuseum.org.js 
	echo "});" >> static/javascript/sfomuseum.org.js
	$(MINIFY) -o static/javascript/sfomuseum.org.min.js \
		static/javascript/sfomuseum.org.js 

js-deps:
	echo "// This file was generated by robots\n\n" > static/javascript/sfomuseum.org.deps.min.js
	echo "// jquery-3.6.0.min.js\n\n" >> static/javascript/sfomuseum.org.deps.min.js
	cat static/javascript/jquery-3.6.0.min.js >> static/javascript/sfomuseum.org.deps.min.js
	echo "// jquery.once.min.js\n\n" >> static/javascript/sfomuseum.org.deps.min.js
	cat static/javascript/jquery.once.min.js >> static/javascript/sfomuseum.org.deps.min.js
	echo "// superfish.min.js\n\n" >> static/javascript/sfomuseum.org.deps.min.js
	cat static/javascript/superfish.min.js >> static/javascript/sfomuseum.org.deps.min.js

css:
	$(MINIFY) -b -o static/css/sfomuseum.org.min.css \
		static/css/sfomuseum.org.base.css \
		static/css/sfomuseum.org.bootstrap.css 
	$(MINIFY) -b -o static/css/sfomuseum.common.min.css \
		static/css/sfomuseum.common.css \
		static/css/sfomuseum.common.grid.css \
		static/css/sfomuseum.common.media.css 
