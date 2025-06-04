A PFX certificate (Personal Information Exchange) is a digital certificate that uses the PKCS#12 (Public Key Cryptography Standards #12) format to store cryptographic information, including:

* The private key
* The public key
* The SSL/TLS certificate
* Intermediate and root certificates (if applicable)

## Run the OpenSSL Command to Create the .pfx File
```bash
openssl pkcs12 -export \
  -out yourdomain.pfx \
  -inkey yourdomain.key \
  -in yourdomain.pem \
  -passin pass:"PRIVATEKEY_PASSWORD" \
  -passout pass:"PFX_FILE_PASSWORD"

* -export → Creates a .pfx file.
* -out yourdomain.pfx → Outputs the final PFX file.
* -inkey yourdomain.key → Specifies your private key.
* -in yourdomain.crt → Specifies your domain certificate.
* -passin is optional if your .key file is not encrypted.
* -passout is required to protect the .pfx file from unauthorized access.

```
## How to Verify the PFX File?
```bash
openssl pkcs12 -info -in yourdomain.pfx
