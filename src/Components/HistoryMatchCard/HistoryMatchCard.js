import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getMatchById } from '../../requests';
import { filterMatchData } from '../../helpers';
import { useGlobal } from 'reactn'
import './HistoryMatchCard.css';

export default props => {

    const [data, setData] =  useState(null);
    const [summonerName] = useGlobal('summonerName');
    useEffect(() => {
        getMatchById(props.matchId).then(res => filterMatchData(res, summonerName, 'pt_BR').then(res => {
            setData(res)
        }));

    }, [props.matchId])
    if(!data) {
        return ( <div>Loading.....</div>)
    }
    return (
        data && <div className="history-match-card--container">
            <div className="win-indicator"></div>
            <div className="champion-image"><span>{props.matchId}</span></div>
            {/* STATS */}
            <div className="stats">
                <span className="win-loss">{data.stats.win ? 'Vitória' : 'Derrota'}</span>
                <span className="stat">Champion Name</span>
                <span className="stat">{data.stats.role}</span>
            </div>
            <div className="stats">
                <span className="kda">{((data.stats.kills + data.stats.assists) / data.stats.deaths).toFixed(1)} KDA</span>
                <span className="stat">{`${data.stats.kills} / ${data.stats.deaths} / ${data.stats.assists}`}</span>
                <span className="stat">{data.stats.totalDamageDealtToChampions} Dano Total</span>
            </div>
            <div className="stats">
                <span className="damage">{data.stats.goldEarned} Gold</span>
                <span className="stat">{data.stats.totalMinionsKilled} cs</span>
                <span className="stat">{data.stats.wardsPlaced} {data.stats.wardsPlaced > 1 ? 'wards' : 'ward'}</span>
            </div>

            {/* Spells nad Runes */}
            <div className="spells-runes">
                <div className="spells">
                    <div className="spell-1" title={data.spells[0].name} style={{backgroundImage: `url("${data.spells[0].imageUrl}")`}}></div>
                    <div className="spell-2" title={data.spells[1].name} style={{backgroundImage: `url("${data.spells[1].imageUrl}")`}}></div>
                </div>
                <div className="runes">
                    <div className="rune-1" title={data.perks[0].name} style={{backgroundImage: `url("${data.perks[0].imageUrl}")`}}></div>
                    <div className="rune-2" title={data.perks[1].name} style={{backgroundImage: `url("${data.perks[1].imageUrl}")`}}></div>
                </div>
            </div>

            {/* ITEMS */}
            <div className="items">
                items
            </div>
        </div>
    )
}