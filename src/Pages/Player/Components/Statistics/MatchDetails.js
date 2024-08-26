import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../../CSS/MatchDetails.module.css";

const MatchDetails = ({ match }) => {
  const [tooltip, setTooltip] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (fullName) => {
    setTooltip(fullName);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handlePlayerClick = (name, tagLine) => {
    console.log(name);
    // let urlName = name.replace(" ", "%20");
    // console.log(`/summoner/${urlName}/${tagLine}`)
     const url = `/summoner/${name}/${tagLine}`;
     navigate(url);
     setTimeout(() => {
        window.location.reload();
     }, 1150);
    
  };

  const truncatePlayerName = (name) => {
    return name.length > 8 ? `${name.slice(0, 8)}...` : name;
  };

  const backgroundColor = match.result === "Zwycięstwo" ? "#B3CDFF" : "#FFBAC3";
  const borderClass = match.result === "Zwycięstwo" ? styles.win : styles.loss;

  const items = [...match.items];
  while (items.length < 7) {
    items.push(null);
  }

  return (
    <div
      className={`${styles.matchContainer} ${borderClass}`}
      style={{ backgroundColor }}
    >
      <div className={styles.leftSection}>
        <div className={styles.type}>{match.type}</div>
        <div className={styles.timeAgo}>{match.timeAgo}</div>
        <hr className={styles.divider} />
        <div className={styles.result}>{match.result}</div>
        <div className={styles.gameDuration}>{match.gameDuration}</div>
      </div>

      <div className={styles.centerSection}>
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
          <div className={styles.kdaContainer}>
            <div className={styles.kda}>
              <span className={styles.kills}>{match.kills}</span>
              <span className={styles.separator}> / </span>
              <span className={styles.deaths}>{match.deaths}</span>
              <span className={styles.separator}> / </span>
              <span className={styles.assists}>{match.assists}</span>
            </div>
            <div className={styles.kdaRatio}>{match.kdaRatio.toFixed(2)} KDA</div>
          </div>
        </div>
        <div className={styles.items}>
          {items.map((item, index) =>
            item ? (
              <img
                key={index}
                src={`${process.env.REACT_APP_ITEM_ICON_PATH}${item}.png`}
                alt={`Item ${index}`}
                className={styles.itemIcon}
              />
            ) : (
              <div key={index} className={styles.emptySlot}></div>
            )
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.teamInfo}>
          <div className={styles.teamColumn}>
            {match.team.map((player, index) => (
              <div
                key={index}
                className={styles.player}
                onMouseEnter={() => handleMouseEnter(player.fullName)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handlePlayerClick(player.name, player.tagLine)}
                style={{ cursor: 'pointer' }} // Change cursor on hover
              >
                <img
                  src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${player.champion}.png`}
                  alt={player.name}
                  className={styles.playerIcon}
                />
                <span className={styles.playerName}>
                  {truncatePlayerName(player.name)}
                </span>
                {tooltip === player.fullName && (
                  <div className={styles.tooltip}>{player.fullName}</div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.teamColumn}>
            {match.opponents.map((player, index) => (
              <div
                key={index}
                className={styles.player}
                onMouseEnter={() => handleMouseEnter(player.fullName)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handlePlayerClick(player.name, player.tagLine)}
                style={{ cursor: 'pointer' }} // Change cursor on hover
              >
                <img
                  src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${player.champion}.png`}
                  alt={player.name}
                  className={styles.playerIcon}
                />
                <span className={styles.playerName}>
                  {truncatePlayerName(player.name)}
                </span>
                {tooltip === player.fullName && (
                  <div className={styles.tooltip}>{player.fullName}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
