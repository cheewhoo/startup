const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

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
