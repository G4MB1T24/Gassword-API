const express = require("express");
const morgan = require("morgan");
const connectToMongo = require("../databse/db");
const cors = require("cors");
const ipfilter = require("express-ipfilter").IpFilter;

const app = express();
const ips = ["0.0.0.0/0"];
const port = 4000 || process.env.PORT;

const Auth = require("../routes/auth");
const GasswordDB = require("../routes/gasswordDB");
const UserRoute = require("../routes/user");
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

connectToMongo();

app.get("/", async (req, res) => {
  res.send("Gassword up and running!");
});

app.use("/auth/api", Auth);
app.use("/api/gass", GasswordDB);
app.use("/api/user", UserRoute);

app.listen(port, () => {
  console.log(`Server Serving at http://localhost:${port}`);
});
