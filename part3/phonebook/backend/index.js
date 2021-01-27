const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dateFormat = require("dateformat");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, res) => {
  let today = new Date();
  today = dateFormat(today, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${today}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  persons.map((person) => {
    if (person.name === body.name) {
      return res.status(400).json({
        error: "Name must be unique",
      });
    }
  });

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(100000)),
  };

  persons = persons.concat(newPerson);

  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = person.filter((person) => person.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
