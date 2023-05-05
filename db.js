const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "test";

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  return client.db(dbName);
};

module.exports = main;
