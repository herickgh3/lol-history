// AXIOS
import axios from 'axios';

// JSON

// URL CONFIG
const API_KEY = 'RGAPI-6b6ac3c0-3015-438b-b49d-64036ea477bd';
const CORS = 'https://cors-anywhere.herokuapp.com/';
const language = 'pt_BR';
const requestUrl = (request, params) => {
    const getConnector = index => index === 0 ? '?' : '&'; // set query connectors on params
    params = params && Object.keys(params).map((param, i) => `${getConnector(i)}${param}=${params[param]}`).join('');
    return CORS + 'https://br1.api.riotgames.com/' + request + (params ? (params + '&') : '?') + 'api_key=' + API_KEY;
}

const lolRequest = (url, params) => axios.get(requestUrl(url, params)).then(res => res.data).catch(e => e.request.statusText);


// SUMMONER
export const getSummonerByName = summonerName => lolRequest(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
export const getSummunerByAccountId = encryptedAccountId => lolRequest(`/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`)
export const getSummunerByPuuid = puuId => lolRequest(`/lol/summoner/v4/summoners/by-puuid/${puuId}`);
export const getSummunerById = summonerId => lolRequest(`/lol/summoner/v4/summoners/${summonerId}`);

// MATCH
export const getMatchById = matchId => lolRequest(`/lol/match/v4/matches/${matchId}`);
export const getMatchByAccountId = (accountId, params) => lolRequest(`/lol/match/v4/matchlists/by-account/${accountId}`, params)
export const getMatchByMatchId = matchId => lolRequest(`/lol/match/v4/timelines/by-match/${matchId}`);


///-------------------- STATIC DATA --------------------- ///

//---- CHAMPION ----//
// json
export const getChampionByName = (championName) => axios.get(`http://ddragon.leagueoflegends.com/cdn/9.12.1/data/${language}/champion/${championName}.json`);
export const getChampionById = (championId, language) => axios.get(`http://ddragon.leagueoflegends.com/cdn/9.12.1/data/${language}/champion.json`).then(
    res => {
        const championCollection = res.data.data;
        const championName = Object.keys(championCollection)
        .filter(champName => +championCollection[champName].key === championId);// get champ who has same id as passed
        return championCollection[championName[0]];
    }
)
// images
export const getChampionImage = (championName) => `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/champion/${championName}.png`;
export const getChampionImageById = (championId, language) => getChampionById(championId, language).then(res => `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/champion/${res.image.full}`)
export const getChampionLoadingImage = (championName, skinId) => `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinId}.jpg`;
export const getChampionSplashImage = (championName, skinId) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinId}.jpg`;

// PROFILE ICON
export const getProfileIconImage = profileIconId => `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/profileicon/${profileIconId}.png`

//---- SPELLS ----//
// json
export const getSpellsData = (language) => axios.get(`http://ddragon.leagueoflegends.com/cdn/9.12.1/data/${language}/summoner.json`);

export const getSpellById = (spellId, language) => getSpellsData(language).then(res => res.data.data[spellId]);
export const getSpellIdByKey = (key, language) => getSpellsData(language).then(res => res.data.data[Object.keys(res.data.data).filter(spell => res.data.data[spell].key === '' + key)[0]].id);

// images
export const getSummonerSpellsImage = (spellId) => `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/spell/${spellId}.png`;


//  RUNES
export const getRunesData = (language) => axios.get(`https://raw.githubusercontent.com/herickgh3/lol_data/master/reforged_runes/${language}/runesReforged.json`).then(res => res.data);
export const getRuneById = (runeId, language) => getRunesData(language).then(res => res.filter(spell => spell.id === runeId)[0]);
// export const getRuneById = runeId => getRunesData('pt_BR').then(res => res.data.data[runeId]);

//---- ITEMS ----//
// json
export const getItemsData = () => axios.get(`http://ddragon.leagueoflegends.com/cdn/9.12.1/data/${language}/item.json`);
export const getItemById = itemId => itemId !== 0 ? getItemsData('pt_BR').then(res => res.data.data[itemId]) : {name: ''};

// imagens
export const getItemImage = itemId => `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/item/${itemId}.png`

// GET HISTORY DATA
export const getHistoryMatches = (summonerName, params) => getSummonerByName(summonerName)
    .then(res => getMatchByAccountId(res.accountId, params) // pega lista de partidas
        .then(res => res.matches)
    );