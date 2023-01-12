# Overview

Speed Reader API

# Stacks

- MongoDB
- Node
- Express
- Babel (Transpile ES6)

# Installation

- `git clone git@github.com:mfalfath25/sr-backend-new.git`
- `cd sr-backend-new`
- `yarn`
- `yarn dev` Run as Development

# API Routes

`http://localhost:8080/api/v1/auth`

- post `/register`
- post `/login`
- get `/users`
- get `/users/:userId`
- put `/users/:userId`
- delete `/users/:userId`

`http://localhost:8080/api/v1/setting`

- get `/setting/:userId`
- put `/setting/:userId`

`http://localhost:8080/api/v1/training`

- get `/all`
- get `/user/:userId`
- post `/add/:userId`
- delete `/delete/:trainingId`
