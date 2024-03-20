const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username:username,
    password: passwordHash,
    token: uuid.v4(),
    wins: 0,
    losses: 0
  };
  await userCollection.insertOne(user);

  return user;
}

function collectscores(username){
  userCollection.findOne(
    {username:username}
)
}

function addScore(score) {
  scoreCollection.insertOne(score);
}

function updatewins(username){
  console.log(username)
  userCollection.findOneAndUpdate(
    { "username" : username },
    { $inc: { "wins" : 1 } }
 )
}

function updatelosses(username){
  userCollection.findOneAndUpdate(
    { "username" : username },
    { $inc: { "losses" : 1 } }
 )
}

async function grabscore(username){
  score = await userCollection.findOne({ "username": username });
  wins = score.wins
  losses = score.losses
  return {wins: wins, losses: losses}
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  collectscores,
  updatelosses,
  updatewins,
  grabscore
};
//export obj with methods inside