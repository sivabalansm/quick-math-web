#! /bin/bash

echo "Starting HTTP server on port 8080..."
echo "Go to http://127.0.0.1:8080/index.html"
cd src; python3 -m http.server 8080
