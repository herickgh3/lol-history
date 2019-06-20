
import { getMatchById, getProfileIconImage, getSpellById, getRuneById, getItemByID, getItemImage, getChampionImageById, getChampionById } from './requests';


export const filterMatchData = matchData => {

    let data = {
        stats: {
            win: true,
            championId: 412,
            role: "SUPPORT",
            kills: 5,
            deaths: 2,
            assists: 12,
            totalDamageDealtToChampions: 15332,
            goldEarned: 12422,
            totalMinionsKilled: 142,
            wardsPlaced: 12
        },
        spells: [{ name: 'flash', id: 4 }, { name: "ignite", id: 14 }], // spell1Id, spell2Id
        items: [{ name: 'item', id: 3117 }, 3050, 2031, 3107, 3069, 0, 3340], // item0, item1...
        perks: [{ name: "namePerk", id: 8400 }, 8300], // perkPrimaryStyle, perkSubStyle
        participants: {
            team1: [
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
            ], // championId dos participantes
            team2: [
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
                { summonerName: 'Arikier', championId: 412 },
            ]
        },
        gameType: "MATCHED_GAME",
        mapId: 11,
        gameDuration: 1960
    }
}