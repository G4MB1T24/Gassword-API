const express = require("express");
const morgan = require("morgan");
const connectToMongo = require("../databse/db");
const cors = require("cors");
const ipfilter = require("express-ipfilter").IpFilter;

const app = express();
const Auth = require("../routes/auth");
const GasswordDB = require("../routes/gasswordDB");
const ips = [["127.0.0.1", "127.0.0.10"], process.env.SERVER_IP];
const port = 4000 || process.env.PORT;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

connectToMongo();

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.use("/auth/api", ipfilter(ips, { mode: "allow" }), Auth);
app.use("/api/gass", ipfilter(ips, { mode: "allow" }), GasswordDB);

app.listen(port, () => {
  console.log(`Server Serving at http://localhost:${port}`);
});
