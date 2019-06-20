import React, {useState} from 'react';
import { getMatchById, getRunesData, getHistoryMatches, getChampionById, getRuneById, getSpellIdByKey } from './requests';

import './App.css';

function App() {
  const [matchList, setMatchList] =  useState({});
  return (
    <div className="App">
      <button onClick={() => getHistoryMatches('Arikier', {endIndex: 5}).then(res => console.log(res))} >Get History Matches</button>
      <button onClick={() => (getRuneById(8446, 'pt_BR')).then(res => console.log(res))} >Get Rune By Id</button>
      <button onClick={() => (getRuneById(8439, 'pt_BR')).then(res => console.log(res))} >Get Rune By Id</button>
      <button onClick={() => (getRuneById(8473, 'pt_BR')).then(res => console.log(res))} >Get Rune By Id</button>
      <button onClick={() => getChampionById(157, 'pt_BR').then(res => console.log(res))} >Get Spells data</button>
    </div>
  );
}

export default App;
