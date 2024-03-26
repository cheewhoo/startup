const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const DB = require('./database.js');
const PORT = process.env.PORT || 4000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);
const authCookieName = 'token';
const { peerProxy } = require('./peerProxy.js');


app.get('/score/:playerName', async (req, res)=>{
let name = req.params.playerName;
let user = await DB.collectscores(name);
res.status(200).json(user);
})

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.username, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });
  
  // GetAuth token for the provided credentials
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Username and/or Password is incorrect. Please try again or create a new accout.' });
  });
  
  apiRouter.post('/updatescores', async(req, res) =>{
    const user = (req.body.username);
    console.log(user)
    const win = req.body.win;
    if (win){
      DB.updatewins(user)
    }
    else{
      DB.updatelosses(user)
    }
  })

  apiRouter.post('/getscores', async(req, res) =>{
    const user = (req.body.username);
    let scores = await DB.grabscore(user)
    console.log(scores)
    res.send(scores)
  })

  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

peerProxy(httpService);