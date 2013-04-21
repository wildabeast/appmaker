#!/bin/bash
# https://devcenter.heroku.com/articles/ssl-certificate-self
DOMAIN=$1
openssl genrsa -des3 -out $DOMAIN.orig.key 2048
openssl rsa -in $DOMAIN.orig.key -out $DOMAIN.key
openssl req -new -key $DOMAIN.key -out $DOMAIN.csr
openssl x509 -req -days 365 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt
