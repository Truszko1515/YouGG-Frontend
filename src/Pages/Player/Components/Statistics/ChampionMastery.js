import React from "react";
import styles from "../../../../CSS/ChampionMastery.module.css";

const ChampionMastery = ({ masteryPoints, heroPoints, champions }) => {
  return (
    <div className={styles.containerChampionMastery}>
      <div className={styles.pointsSummary}>
        <div className={styles.pointsSection}>
          <div className={styles.totalPoints}>
            <img
              src={process.env.REACT_APP_MASTERY_ICON_PATH}
              alt="Mastery Icon"
              className={styles.icon}
            />
            <span className={styles.points}>{masteryPoints}</span>
            <span className={styles.label}>Punkty maestrii całkowite</span>
          </div>
        </div>

        <div className={styles.separator}></div> {/* Separator */}

        <div className={styles.pointsSection}>
          <div className={styles.totalPoints}>
            <img
              src={process.env.REACT_APP_CHAMP_POINTS_ICON_PATH}
              alt="Hero Points Icon"
              className={styles.icon}
            />
            <span className={styles.points}>{heroPoints}</span>
            <span className={styles.label}>Punkty bohatera całkowite</span>
          </div>
        </div>
      </div>
      <div className={styles.championsList}>
        {champions.map((champion, index) => (
          <div key={index} className={styles.champion}>
            <img
              src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${champion.name}.png`}
              alt={champion.name}
              className={styles.championImage}
            />
            <div className={styles.masteryLevel}>{champion.masteryLevel}</div>
            <span className={styles.championName}>{champion.name}</span> <br></br>
            <span className={styles.championPoints}>{champion.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default ChampionMastery;


