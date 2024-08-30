// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-nzmbh6ci6-dimple-harjanis-projects.vercel.app/", // replace with your frontend domain
    methods: "GET,POST,PUT,DELETE,OPTIONS", // specify allowed methods
    credentials: true, // if you're sending cookies
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// include before other routes

app.use("/api/v2", rootRouter);
app.options("/api/v2/buttons/bulk", cors());
app.get("/", (req, res) => {
  res.json({
    message: "hello from backend",
  });
});
const port = process.env.port;
app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
