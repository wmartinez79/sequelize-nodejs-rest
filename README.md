A simple project to access postgresql db with sequelize

Stack:
* Node.js
* Sequelize
* Typescript
* Swagger
* Postgresql
* Jest

# Getting started
1. Update ```.env.example``` file to setup your postgresql credentials and also the app port
```
# App config
APP_PORT=3000

# PostgreSQL Database credentials
DB_USER=admin
DB_PASS=password
DB_NAME=practice
DB_HOST=localhost
```

2. rename ```.env.example``` to ```.env```
3. install packages
```
npm install
```
4. run app in development mode
```
npm run dev
```
