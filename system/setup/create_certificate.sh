#!/bin/bash
# https://devcenter.heroku.com/articles/ssl-certificate-self
domain=$1
openssl genrsa -des3 -out $domain.orig.key 2048
openssl rsa -in $domain.orig.key -out $domain.key
openssl req -new -key $domain.key -out $domain.csr
openssl x509 -req -days 365 -in $domain.csr -signkey $domain.key -out $domain.crt
