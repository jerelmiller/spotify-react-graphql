#!/bin/bash

certs_dir=$PWD/cert/

mkdir $certs_dir
mkcert localhost
cat localhost.pem >> localhost-key.pem
mv localhost-key.pem "$certs_dir/server.pem"
rm -f localhost.pem
