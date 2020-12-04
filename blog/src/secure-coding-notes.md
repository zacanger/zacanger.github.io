---
title: pluralsight 'secure coding, preventing sensitive data exposure' notes
created: 2020-12-04
tags:
  - security
  - notes
---

had to run through this for compliance so i took a few notes

* not all user data is "sensitive", depends on regulations:
    * logs are not sensitive data (assuming they're clean)
    * acls are not sensitive data
* attack vectors:
    * connection between browser and application (in transit)
    * connection between app and db (in transit)
    * db itself (at rest)
    * browser itself (at rest)
* sensitive data can be either plain text or ciphertext (encrypted or hashed)
* attack stuff:
  * in transit:
      * mitm
          * sniffing, or sitting in the path/shaping traffic
          * dns-based
      * tls
          * tls is at tcp layer
          * https is http over tls
          * how it works:
              * browser generates shared secret, encrypts using the cert's public key
              * app decrypts shared secret
              * then the application generates a shared symmetric key for the actual traffic
          * there can be another attack by stealing the private key
      * private key storage:
          * software: no physical access restrictions (cryptographic module)
          * hardware: physical access restrictions
      * perfect forward secrecy
          * attacker only sniffing/recording, not tampering
          * negotiation of DH params is in plaintext
          * backend signs params, client verifies signature
          * prevents decryption of previous traffic (but not current traffic)
      * more on certificates
          * the 'which directory?' problem comes up when the chain can't be followed (for example, if the root cert isn't available)
          * public key pinning is associating a cert with a known host
              * pins cert, public key, or hash of either. hashing is preferred.
      * protocol downgrade attack
          * get cookies, headers, etc
          * no mixed content, hsts
* at rest:
    * passwords
        * inexpensive to work with
        * convenient
        * password (in)security
        * some overhead on policies, proper storage
        * ACLs on the db
        * hashing, salting (hashing is one-way, fixed output length)
        * vulnerable to brute force attacks depending on password lengths and probability of known strings (dictionary attacks)
        * rainbow tables (known hashed passwords, try to match to plaintext)
        * salt has to be stored with computed hash
            * with a salt, basically no lookup tables will actually work, since there would need to be a different table per salt
            * salts hide identical passwords
        * hashing function can be ~1s, run as slow as possible without hurting regular user perf
    * crypto alone is not enough. ACLs, other access restrictions, prevent db tampering
        * admin roles
        * signed columns
* owasp recommendations:
    * never put sensitive data in the url (caching, referrer - `a` tag `rel`s help here too)
    * tls everywhere, no mixed content or requests
    * always use recent versions of tls and strong ciphers
    * at least 2048 bits in key
    * multiple domain certificates (SANs)
    * never use unqualified domains
    * wildcard certs might be shady
    * no self-signed certs
    * return all necessary certs to clients
    * don't use sha-1
    * salt should be generated with cryptographically strong random data generator
    * salt should be unique per credential (not per user)
    * pw security should not depend on hiding or obscuring salt
    * good hashing functions (in this order): argon2, pbkdf2, scrypt, bcrypt, hmacs
    * max length for pws with no limited character set (160 chars)
    * hash as part of several steps
    * design password storage keeping in mind potential compromise
