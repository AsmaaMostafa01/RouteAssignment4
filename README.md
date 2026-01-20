# RouteAssignment4
 practicing on expressjs , Simple CRUD operations .

# 🚀 Users CRUD API

A simple **Node.js CRUD API** for managing users using a JSON file as storage.

---
## 🛠️ Requirements

- Node.js 
- npm
- No database required (uses `users.json` file)

---

## ⚡ Installation

1. Clone the repository:

## 🛠️ install dependencies
- npm install
---
## start server🚀
- npm run start:dev
-Server will run on: http://localhost:3000

.
├── main.js         # Main server file
├── users.json      # JSON file storing users
├── package.json
├── package-lock.json
└── .gitignore


| Method | Route           | Description                 | Body / Query                |
| ------ | --------------- | --------------------------- | --------------------------- |
| POST   | /user           | Add new user                | JSON: {name, age, email}    |
| PATCH  | /user/:id       | Update user by ID           | JSON: {name?, age?, email?} |
| DELETE | /user/:id       | Delete user by ID           | —                           |
| GET    | /user/:id       | Get user by ID              | —                           |
| GET    | /user/getByName | Get user by name            | Query: ?name=USERNAME       |
| GET    | /users          | Get all users               | —                           |
| GET    | /users/filter   | Filter users by minimum age | Query: ?minAge=AGE          |
----------------------------------------------------------------------------------------

## Notes
- users.json should exist in the root folder; if empty, it should contain [].
- Validation ensures name, age, and email are provided when adding a new user.
- Email must be unique.
- Server runs on port 3000 by default.

- 
