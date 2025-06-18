import express from "express";

const app = express();
app.use(express.json());

app.get("/health-check", (req, res) => {
  res.send("Server is healthy")
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is activated on port", PORT);
})