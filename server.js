const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "The Matrix", year: 1999 },
];

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const { title, year } = req.body;

  if (!title || !year) {
    return res.status(400).json({ error: "You must input title and year" });
  }

  if (typeof year !== "number") {
    return res.status(400).json({
      error: "Year must be a number",
    });
  }

  const newMovie = {
    id: movies.length + 1,
    title,
    year,
  };

  movies.push(newMovie);
  console.log("New movie added:", newMovie);
  res.status(201).json({ message: "Movie added successfully", data: newMovie });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
