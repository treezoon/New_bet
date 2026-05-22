// frontend/src/App.jsx
import React from 'react';
import MatchStream from './MatchStream';
import BetSlip from './BetSlip';

export default function App() {
  return (
    <div>
      <h1>Soccer Betting Simulation</h1>
      <MatchStream matchId="match1" />
      <BetSlip />
    </div>
  );
}
