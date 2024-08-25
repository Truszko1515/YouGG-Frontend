import React from "react";
import styles from "../../../../CSS/MatchDetails.module.css";

const MatchDetails = ({ match }) => {
  const truncatePlayerName = (name) => {
    return name.length > 8 ? `${name.slice(0, 8)}...` : name;
  };

  const backgroundColor = match.result === "Zwycięstwo" ? "#B3CDFF" : "#FFBAC3";
  const borderClass = match.result === "Zwycięstwo" ? styles.win : styles.loss;

  return (
    <div
      className={`${styles.matchContainer} ${borderClass}`}
      style={{ backgroundColor }}
    >
      <div className={styles.header}>
        <span className={styles.type}>{match.type}</span>
        <span className={styles.time}>{match.timeAgo}</span>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.championInfo}>
            <img
              src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${match.champion}.png`}
              alt={match.champion}
              className={styles.championIcon}
            />
            <div className={styles.spellsAndRunes}>
              <div className={styles.spells}>
                <img
                  src={`${process.env.REACT_APP_SUMMONER_SPELL_PATH}${match.spell1}`}
                  alt="Spell 1"
                  className={styles.spellIcon}
                />
                <img
                  src={`${process.env.REACT_APP_SUMMONER_SPELL_PATH}${match.spell2}`}
                  alt="Spell 2"
                  className={styles.spellIcon}
                />
              </div>
              <div className={styles.runes}>
                <img
                  src={`${process.env.REACT_APP_RUNE_ICON_PATH}${match.runePrimary}`}
                  alt="Primary Rune"
                  className={styles.runeIcon}
                />
                <img
                  src={`${process.env.REACT_APP_RUNE_ICON_PATH}${match.runeSecondary}`}
                  alt="Secondary Rune"
                  className={styles.runeIconSecondary}
                />
              </div>
            </div>
            <div className={styles.kda}>
              {match.kills} / {match.deaths} / {match.assists}
              <span className={styles.kdaRatio}>{match.kdaRatio.toFixed(2)} KDA</span>
            </div>
          </div>
          <div className={styles.items}>
            {match.items.map((item, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_ITEM_ICON_PATH}${item}.png`}
                alt={`Item ${index}`}
                className={styles.itemIcon}
              />
            ))}
          </div>
          <div className={styles.stats}>
            <span>{match.lanePhase}</span>
            <span>{match.cs}</span>
          </div>
        </div>

        <div className={styles.teamInfo}>
          <div className={styles.teamColumn}>
            {match.team.map((player, index) => (
              <div key={index} className={styles.player}>
                <img
                  src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${player.champion}.png`}
                  alt={player.name}
                  className={styles.playerIcon}
                />
                <span className={styles.playerName}>
                  {truncatePlayerName(player.name)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.teamColumn}>
            {match.opponents.map((player, index) => (
              <div key={index} className={styles.player}>
                <img
                  src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${player.champion}.png`}
                  alt={player.name}
                  className={styles.playerIcon}
                />
                <span className={styles.playerName}>
                  {truncatePlayerName(player.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
