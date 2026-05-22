// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let matches = {};

function simulateMatch(matchId) {
  let minute = 0;
  let score = { home: 0, away: 0 };

  const interval = setInterval(() => {
    minute++;

    if (Math.random() < 0.05) {
      score.home++;
      io.emit('event', { matchId, type: 'goal', team: 'home', score, minute });
    }
    if (Math.random() < 0.05) {
      score.away++;
      io.emit('event', { matchId, type: 'goal', team: 'away', score, minute });
    }
    if (Math.random() < 0.02) {
      io.emit('event', { matchId, type: 'card', team: 'home', minute });
    }

    io.emit('update', { matchId, score, minute });

    if (minute >= 90) {
      clearInterval(interval);
      io.emit('end', { matchId, score });
    }
  }, 1000);
}

app.post('/start/:id', (req, res) => {
  const matchId = req.params.id;
  matches[matchId] = { id: matchId, score: { home: 0, away: 0 } };
  simulateMatch(matchId);
  res.send({ status: 'started', matchId });
});

server.listen(3000, () => console.log('Backend running on port 3000'));
