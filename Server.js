const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./Models"); // all models are imported here

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to App." });
});

app.use("/api", require("./Routes").Tutorial);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
