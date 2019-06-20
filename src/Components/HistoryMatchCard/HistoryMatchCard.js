import React, { useEffect, useState } from 'react';
import classNames from 'classnames';


export default props => {

    const obj = {
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
        spells: [4, 14], // spell1Id, spell2Id
        items: [3117, 3050, 2031, 3107, 3069, 0, 3340], // item0, item1...
        perks: [8400, 8300], // perkPrimaryStyle, perkSubStyle
        participants: {
            team1: [
            { summonerName: 'Arikier',championId: 412},
            { summonerName: 'Arikier',championId: 412},
            { summonerName: 'Arikier',championId: 412},
            { summonerName: 'Arikier',championId: 412},
            { summonerName: 'Arikier',championId: 412},
            ], // championId dos participantes
            team2: [
                { summonerName: 'Arikier',championId: 412},
                { summonerName: 'Arikier',championId: 412},
                { summonerName: 'Arikier',championId: 412},
                { summonerName: 'Arikier',championId: 412},
                { summonerName: 'Arikier',championId: 412},
            ] 
        },
        gameType: "MATCHED_GAME",
        mapId: 11,
        gameDuration: 1960
    }

    return (
        <div className="history-match-card--container">
            <div className="win-indicator"></div>
            <div className="champion-image"></div>
            {/* STATS */}
            <div className="stats">
                <span className="win-loss">Vitória</span>
                <span className="stat">Thresh</span>
                <span className="stat">Suporte</span>
            </div>
            <div className="stats">
                <span className="kda">3.8 KDA</span>
                <span className="stat">5 / 3 / 12</span>
                <span className="stat">234 Dano/min.</span>
            </div>
            <div className="stats">
                <span className="damage">14.560 Gold</span>
                <span className="stat">123 cs</span>
                <span className="stat">5 wards</span>
            </div>

            {/* Spells nad Runes */}
            <div className="spells-runes">
                <div className="spells">
                    <div className="spell-1"></div>
                    <div className="spell-2"></div>
                </div>
                <div className="runes">
                    <div className="rune-1"></div>
                    <div className="rune-2"></div>
                </div>
            </div>

            {/* ITEMS */}
            <div className="items">

            </div>
        </div>
    )
}