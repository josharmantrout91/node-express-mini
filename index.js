// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

//middleware
server.use(express.json());

//Test function
server.get("/", (req, res) => {
  res.send("Hello! Is This Thing On??");
});

//GET to /api/users Returns an array of all the user objects contained in the database.
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

//POST to /api/users Creates a user using the information sent inside the request body.
server.post("/users", (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

//GET /api/users/:id Returns the user object with the specified id.
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//DELETE /api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//PUT /api/users/:id Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log(id);

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ updated });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." })
        .end();
    });
});

//Make sure our server is listening on the correct port
server.listen(4000, () => {
  console.log("Server Running on http://localhost:5000");
});
