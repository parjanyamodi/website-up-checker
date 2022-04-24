const { MongoClient, ServerApiVersion } = require("mongodb");
const dbData = require("./db.config");
const uri = `mongodb+srv://parjanyamodi-mongodb:${dbData.password}@cluster0.2obzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
