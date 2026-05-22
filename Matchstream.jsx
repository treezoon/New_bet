// frontend/src/MatchStream.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function MatchStream({ matchId }) {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [minute, setMinute] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('update', data => {
      if (data.matchId === matchId) {
        setScore(data.score);
        setMinute(data.minute);
      }
    });

    socket.on('event', event => {
      if (event.matchId === matchId) {
        setEvents(prev => [...prev, event]);
      }
    });

    socket.on('end', data => {
      if (data.matchId === matchId) {
        alert(`Match ended: ${data.score.home} - ${data.score.away}`);
      }
    });
  }, [matchId]);

  return (
    <div>
      <h2>Match {matchId}</h2>
      <p>Minute: {minute}</p>
      <p>Score: {score.home} - {score.away}</p>
      <h3>Events</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{e.minute}' {e.type} {e.team || ''}</li>
        ))}
      </ul>
    </div>
  );
}
