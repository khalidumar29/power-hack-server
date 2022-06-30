const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

/** middleware */
app.use(cors());
app.use(express.json());

/** database connection */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7yqur.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  /** data collection */
  await client.connect();
  const dataCollection = client.db("data").collection("data");

  /** api operation */
  try {
    app.get("/data", async (req, res) => {
      const data = await dataCollection.find({}).toArray();
      res.send(data);
    });
  } finally {
    /** nothing to be happen here */
  }
};

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("<h1>server e mutamuti vab ayce 🤠</h1>");
});

app.listen(port, () => console.log(`listening on port ${port}`));
