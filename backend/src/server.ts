import express from "express";
import router from "./router/router";

const app = express();
app.use(express.json());

app.get("/health-check", (_, res) => {
  res.send("Server is healthy");
});
app.use("/api/v1", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is activated on port", PORT);
});