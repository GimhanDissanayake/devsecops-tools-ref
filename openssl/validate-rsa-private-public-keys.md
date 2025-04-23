# How to verify if a public key corresponds to a private key.

```bash
# Get the modulus from private key
openssl rsa -in private.pem -modulus -noout | md5sum

# If you have a public key in SSH format (starts with "ssh-rsa"), you'll need to convert it first:
ssh-keygen -f public.pub -e -m PKCS8 > public.pem

# Get the modulus from public key
openssl rsa -in public.pem -pubin -modulus -noout | md5sum
```
## If both commands produce the same MD5 hash, then the keys are a matching pair.

# AWS: You can use this command to retrieve the public key for a given key-pair using key pair name:
```bash
aws ec2 describe-key-pairs \
    --key-names <key-pair-name here> \
    --include-public-key \
    --query "KeyPairs[].PublicKey"

#OR

aws ec2 describe-key-pairs \
    --key-pair-ids <key pair id here> \
    --include-public-key \
    --query "KeyPairs[].PublicKey"
```
