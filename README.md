
# Password Vault
## Currently this project is hosted locally 



## Installation

```bash
git clone https://github.com/G4MB1T24/Gassword-API.git

```
```bash
  cd /your-folder/
  npx nodemon server/core.js
```
    
## Features

- 1 . Stores you data in mongodb cloud or locally its up to you.
- 2 . Y'our passwords are encrypted with the help of [Cryptojs](https://www.npmjs.com/package/crypto-js)
- 3 . Has MPIN for added Security
- 4 . Run on your local machine or Your Web server or in my **free** hosted server
- 5 . (I wouldn't recommend the fourth point)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ENC_SECRET_KEY`  ````To encrypt and decrypt your password````

`JWT_SEC`  ````To get jwtToken````

`MONGO_URI`  ````Your local or cloud mongoDb database connection string````


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express , Cryptojs


## Have to add few more things before i start to code it's frontend