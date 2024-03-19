const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const DB = require('./database.js');
const PORT = process.env.PORT || 4000;


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
    res.status(401).send({ msg: 'Unauthorized' });
  });
  







// Dummy database for storing player scores
const playerScores = {};
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/scores/win', (req, res) => {
    const { playerName } = req.body;
    if (!playerScores[playerName]) {
        playerScores[playerName] = { wins: 0, losses: 0 };
    }
    playerScores[playerName].wins++;
    res.json({ success: true, message: 'Win count updated', scores: playerScores[playerName] });
});

app.post('/scores/loss', (req, res) => {
    const { playerName } = req.body;
    if (!playerScores[playerName]) {
        playerScores[playerName] = { wins: 0, losses: 0 };
    }
    playerScores[playerName].losses++;
    res.json({ success: true, message: 'Loss count updated', scores: playerScores[playerName] });
});

app.get('/scores/:playerName', (req, res) => {
    const { playerName } = req.params;
    if (playerScores[playerName]) {
        res.json({ success: true, scores: playerScores[playerName] });
    } else {
        res.status(404).json({ success: false, message: 'Player not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
