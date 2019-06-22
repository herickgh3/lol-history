
import { getSpellIdByKey, getChampionImageById, getSpellById, getRuneById, getItemById } from './requests';


export const filterMatchData = async (matchData, summonerName, language) => {
    // pega o Id do invocador
    const summonerParticipantId = matchData.participantIdentities.filter(participant => participant.player.summonerName === summonerName)[0].participantId;
    // pega os stats do invocador na partida
    const sumStats = matchData.participants.filter(participant => participant.participantId === summonerParticipantId)[0];
    // desconstrução do objeto
    const {
        win,
        kills,
        deaths,
        assists,
        totalDamageDealtToChampions,
        goldEarned,
        totalMinionsKilled,
        wardsPlaced,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        perk0,
        perk4,
    } = sumStats.stats;

    // pega os dados do invocador
    const getParticipantIdentity = (participantId, matchData) => matchData.participantIdentities.filter(participant => participant.participantId === participantId)[0].player

    // pega os times
    const getTeams = async (matchData, summonerTeam) => await Promise.all(matchData.participants
        .filter( participant => summonerTeam ? participant.teamId === sumStats.teamId : participant.teamId !== sumStats.teamId)
        .map( async participant =>  {
            await {
            summonerName: getParticipantIdentity(participant.participantId, matchData).summonerName,
            imageUrl: await getChampionImageById(participant.championId, language)
            }
        }
        ));
    
    const { championId, spell1Id, spell2Id } = sumStats;
    const { gameDuration, mapId, gameType } = matchData;
    const { role } = sumStats.timeline;

    const team1 = await getTeams(matchData, true);
    const team2 = await getTeams(matchData, false);

    let data = {
        stats: {
            win,
            championId,
            role,
            kills,
            deaths,
            assists,
            totalDamageDealtToChampions,
            goldEarned,
            totalMinionsKilled,
            wardsPlaced
        },
        spells: [
            {
                name: (await getSpellById(await getSpellIdByKey(spell1Id, language), language)).name,
                imageUrl: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${await getSpellIdByKey(spell1Id, language)}.png`
            },
            {
                name: (await getSpellById(await getSpellIdByKey(spell2Id, language), language)).name,
                imageUrl: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${await getSpellIdByKey(spell2Id, language)}.png`
            },
        ], // spell1Id, spell2Id
        items: [
            { name: (await getItemById(item0, language)).name, imageUrl: item0 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item0}.png` : null },
            { name: (await getItemById(item1, language)).name, imageUrl: item1 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item1}.png` : null },
            { name: (await getItemById(item2, language)).name, imageUrl: item2 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item2}.png` : null },
            { name: (await getItemById(item3, language)).name, imageUrl: item3 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item3}.png` : null },
            { name: (await getItemById(item4, language)).name, imageUrl: item4 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item4}.png` : null },
            { name: (await getItemById(item5, language)).name, imageUrl: item5 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item5}.png` : null },
            { name: (await getItemById(item6, language)).name, imageUrl: item6 === 0  ? `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item6}.png` : null },
        ], // item0, item1...
        perks: [
            { name: (await getRuneById(perk0, language)).name, imageUrl: `http://ddragon.leagueoflegends.com/cdn/img/${(await getRuneById(perk0, language)).icon}` },
            { name: (await getRuneById(perk4, language)).name, imageUrl: `http://ddragon.leagueoflegends.com/cdn/img/${(await getRuneById(perk4, language)).icon}` },
        ], // Primary & Secondary Rune
        participants: {
            team1, // championId dos participantes
            team2
        },
        gameType,
        mapId,
        gameDuration
    }
    return data
}