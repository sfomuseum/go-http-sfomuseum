debug:
	go run -mod vendor cmd/example/main.go

lambda:
	if test -f main; then rm -f main; fi
	if test -f example.zip; then rm -f example.zip; fi
	GOOS=linux go build -mod vendor -o main cmd/example/main.go
	zip example.zip main
	rm -f main

docker:
	docker build -t sfomuseum-sweater-server .	

js:
	echo "// js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU_f.js\n\n" > static/javascript/sfomuseum.sweater.js
	cat static/javascript/js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU_f.js >> static/javascript/sfomuseum.sweater.js
	echo "\n" >> static/javascript/sfomuseum.sweater.js 
	echo "// js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0_f.js\n\n" >> static/javascript/sfomuseum.sweater.js
	cat static/javascript/js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0_f.js >> static/javascript/sfomuseum.sweater.js
	echo "\n" >> static/javascript/sfomuseum.sweater.js 
	echo "// js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak_f.js\n\n" >> static/javascript/sfomuseum.sweater.js
	cat static/javascript/js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak_f.js >> static/javascript/sfomuseum.sweater.js
