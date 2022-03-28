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
