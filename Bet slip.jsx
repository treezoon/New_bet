// frontend/src/BetSlip.jsx
import React, { useState } from 'react';

export default function BetSlip() {
  const [bets, setBets] = useState([]);

  const addBet = (matchId, market, odds) => {
    setBets([...bets, { matchId, market, odds }]);
  };

  const totalOdds = bets.reduce((acc, b) => acc * b.odds, 1);

  return (
    <div>
      <h2>Accumulator Slip</h2>
      <ul>
        {bets.map((b, i) => (
          <li key={i}>{b.matchId} - {b.market} @ {b.odds}</li>
        ))}
      </ul>
      <p>Total Odds: {totalOdds.toFixed(2)}</p>
      <button onClick={() => addBet('match1', 'Home Win', 1.8)}>Add Home Win</button>
    </div>
  );
}
