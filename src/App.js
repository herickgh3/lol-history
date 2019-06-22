import React, { useState, Suspense, useRef } from 'react';
import { useGlobal, setGlobal } from 'reactn';
import { getHistoryMatches, getChampionById, getRuneById } from './requests';
import './App.css';

const HistoryMatchCard = React.lazy(() => import('./Components/HistoryMatchCard/HistoryMatchCard'));

function App() {
  const [matchList, setMatchList] = useState([]);
  const [summonerName] = useGlobal('summonerName');
  return (
    <div className="App">
      <input type="text" name="summonerName" placeholder="nome do invocador" value={summonerName} onChange={ e => {setGlobal({summonerName: e.currentTarget.value})}} />

      <button onClick={() => getHistoryMatches(summonerName, { endIndex: 5 }).then(res => setMatchList(res.map(match => match.gameId)))} >Get History Matches</button>
          { matchList && matchList.map(matchId =>  <Suspense key={matchId} fallback={<div>Loading...</div>}><HistoryMatchCard key={matchId + '--card'}matchId={matchId} /> </Suspense>)}
    </div>
  );
}

export default App;
