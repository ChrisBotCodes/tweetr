"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // we now have a connection to the "test-tweets" db
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // get all tweets
  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});