# Password Vault
- [Password Vault](#password-vault)
  - [Installation](#installation)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
  - [Tech Stack](#tech-stack)
  - [Encryption is explained below](#encryption-is-explained-below)
  - [future](#future)

## Installation

```bash
git clone https://github.com/G4MB1T24/Gassword-API.git

```
```bash
  cd /your-folder/Gassword-API
  npx nodemon server/core.js
```
    
## Features

- 1 . Stores you data in mongodb cloud or locally its up to you.
- 2 . Y'our passwords are encrypted with the help of [Cryptojs](https://www.npmjs.com/package/crypto-js)
- 3 . Has MPIN for added Security
- 4 . Run on your local machine or Your Web server or in my **free** hosted server
- 5 . Zero knowledge encryption, passwords are encrypted via user given key 
   - which is not stored in the server (unhashed) 
- 6 . (hashed key is stored but in no way i can decrypt it)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`JWT_SEC`  ````To get jwtToken````

`MONGO_URI`  ````Your local or cloud mongoDb database connection string````


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express , Cryptojs

## Encryption is explained below 
  
<img src="https://i.imgur.com/6VBRnsW.jpg"> </img>

## ToDo
  - Currently server is encrypting only important details like password, mpin, enc_key
    - will decrypt whole user and gassword object in future

