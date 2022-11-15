const express = require("express");
const morgan = require("morgan");
const connectToMongo = require("../databse/db");
const app = express();
const Auth = require("../routes/auth");
app.use(morgan("combined"));
app.use(express.json())
const port = 4000 || process.env.PORT;
connectToMongo();
// app.get("/", async (req, res) => {
//     res.send("Hello")
// })
app.use("/auth/api", Auth);
app.listen(port, () => {
  console.log(`Server Serving at http://localhost:${port}`);
});
