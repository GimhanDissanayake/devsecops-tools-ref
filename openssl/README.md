# Commands
```bash
# Generate a new private key and CSR (Unix)
openssl req -utf8 -nodes -sha256 -newkey rsa:2048 -keyout server.key -out server.csr

# Generate a CSR for an existing private key
openssl req -out CSR.csr -key privateKey.key -new

# Generate a CSR based on an existing certificate
openssl x509 -x509toreq -in MYCRT.crt -out CSR.csr -signkey privateKey.key

# Generate a self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt

# Remove a password from a private key
openssl rsa -in privateKey.pem -out newPrivateKey.pem

# Check a CSR
openssl req -text -noout -verify -in CSR.csr

# Check a private key
openssl rsa -in privateKey.key -check

# Check a certificate
openssl x509 -in certificate.crt -text -noout

# Check a PKCS#12 file (.pfx or .p12)
openssl pkcs12 -info -in keyStore.p12

* -noout prevents unnecessary output like the actual encoded data, making the command output cleaner.
```


1. Using OpenSSL to generate CSR’s with Subject Alternative Name 

- Step 1 – Create an OpenSSL configuration file
```
more openssl-csr.conf
[ req ]
default_bits       = 2048
distinguished_name = req_distinguished_name
req_extensions     = req_ext
prompt = no 
[ req_distinguished_name ]
countryName                = AU
stateOrProvinceName        = Victoria
localityName               = Melbourne
organizationName           = Net Assured Limited
commonName                 = dev.dev-api.net-assured-platform.com
[ req_ext ]
subjectAltName = @alt_names
[alt_names]
DNS.1   = dev.dev-api.net-assured-platform.com
DNS.2   = qa.dev-api.net-assured-platform.com  
```

- Step 2 – Using OpenSSL to generate CSR’s with Subject Alternative Name extensions
```
sudo openssl req -out dev.dev-api.net-assured-platform.com.csr -newkey rsa:2048 -nodes -keyout dev.dev-api.net-assured-platform.com.key -config openssl-csr.conf
```

- Step 3 - View CSR
```
openssl req -noout -text -in dev.dev-api.net-assured-platform.com.csr
```
# Commands:
```
# check the certificate’s SAN field to confirm whether it’s a wildcard or SAN certificate
openssl s_client -connect www.mobilsmiles.co.nz:443 -showcerts | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```