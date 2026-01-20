const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const app = express();
app.use(express.json());
const port = 3000;
const filePath = path.join(__dirname, "./users.json");

function readUsers() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeUsers(data) {
  fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));
}

// 1- add new user (POST/user)
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;
  if (!name || !age || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const users = readUsers();

  const emailExists = users.find((user) => user.email === email);
  if (emailExists) {
    return res.json({ message: "Email already exists." });
  }
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age,
    email,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: "User added successfully" });
});

//2- update user by id (PATCH/user/:id)
app.patch("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User id not found" });
  }

  const { name, age, email } = req.body;

  if (name) user.name = name;
  if (age !== undefined) user.age = age;

  if (email) {
    const emailExists = users.find((u) => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    user.email = email;
  }

  writeUsers(users);
  res.status(200).json({ message: "user updated successfully" });
});

// 3-Delete user by id (DELETE/user/:id)
app.delete("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  writeUsers(users);
  res.status(200).json({ message: "User deleted successfully" });
});

// 4- get user by name (Get/user/getByName)
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;
  const users = readUsers();
  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(404).json({ message: "user name not found" });
  }
  res.status(200).json(user);
});

// 5- get all users
app.get("/user", (req, res) => {
  const users = readUsers();
  res.status(200).json(users);
});

// 6- filter user by minmum age
app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query.minAge);
  const users = readUsers();
  const usersFiltered = users.filter((u) => u.age >= minAge);
  if (usersFiltered.length === 0) {
    return res.status(404).json({ message: "no user found" });
  }
  res.status(200).json(usersFiltered);
});

// 7-get user by id
app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
