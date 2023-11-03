const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3000;
const cors = require('cors');


// MiddleWares
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://mhmdnoman01:SqKEZucG1EKMyJzh@cluster0.vpubwbo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const blogDB = client.db("blogDB");
const blogCollection = blogDB.collection("blogCollection");

async function run() {
  try {
    // add a blog
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await blogCollection.insertOne(post);
      res.send(result);
    });

    // get all posts
    app.get("/posts", async (req, res) => {
      const posts = await blogCollection.find().toArray();
      res.send(posts);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
