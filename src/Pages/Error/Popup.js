import { useEffect, useState } from "react";
import styles from "../../CSS/PopupStat.module.css";

const Popup = ({ onClose, data, error, filters }) => {
  useEffect(() => {
    console.log("filtry: ");
    console.log(filters);
  }, [filters]);

  const appliedFilters = [];
  const renderFilters = () => {
    

    if (filters.lane) {
      appliedFilters.push(
        <div key="lane" className={styles.filterBox}>
          <strong>Lane:</strong> {filters.lane.value}
        </div>
      );
    }

    if (filters.kills) {
      appliedFilters.push(
        <div key="kills" className={styles.filterBox}>
          <strong>Kills:</strong> {filters.kills.comparison} {filters.kills.value}
        </div>
      );
    }

    if (filters.gameLength) {
      appliedFilters.push(
        <div key="gameLength" className={styles.filterBox}>
          <strong>Game Length:</strong> {filters.gameLength.comparison} {filters.gameLength.value} minutes
        </div>
      );
    }

    if (filters.totalCS) {
      appliedFilters.push(
        <div key="totalCS" className={styles.filterBox}>
          <strong>Total CS:</strong> {filters.totalCS.comparison} {filters.totalCS.value}
        </div>
      );
    }

    if (filters.visionScore) {
      appliedFilters.push(
        <div key="visionScore" className={styles.filterBox}>
          <strong>Vision Score:</strong> {filters.visionScore.comparison} {filters.visionScore.value}
        </div>
      );
    }

    return appliedFilters.length > 0 ? appliedFilters : <p style={{color: 'black'}}>No filters applied</p>;
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        {error ? (
          <div className={styles.errorMessage}>
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.popupContent}>
            <h2>{data.ChampionName} Statistics: <strong>{data.championName}</strong></h2>
            <img src={process.env.REACT_APP_CHAMPION_ICON_PATH + (data.championName === "Wukong" ? "MonkeyKing" : data.championName) + ".png"} alt="champion" />

            <div className={styles.statsAndFilters}>
              {/* Left panel for stats */}
              <div className={styles.statsGrid}>
                {data.kills && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_KILLS_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.kills.toFixed(2)} Kills</span> / Game</span>
                  </div>
                )}
                {data.deaths && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_DEATHS_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.deaths.toFixed(2)} Deaths</span>  / Game</span>
                  </div>
                )}
                {data.assists && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_ASSISTS_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.assists.toFixed(2)} Assists</span> / Game</span>
                  </div>
                )}
                {data.winRatio && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_WINRATIO_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Win Ratio - <span className={styles.coloredText}>{(data.winRatio * 100).toFixed(2)}%</span> Average</span>
                  </div>
                )}
                {data.totalCS && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_TOTALCS_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.totalCS.toFixed(2)} Total CS</span> / Game</span>
                  </div>
                )}
                {data.kda && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_KDA_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.kda.toFixed(2)} KDA</span> / Game</span>
                  </div>
                )}
                {data.cSperMinute && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_CSPERMINUTE_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.cSperMinute.toFixed(2)} CS</span> Per Minute / Game</span>
                  </div>
                )}
                {data.visionScore && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_VISIONSCORE_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.visionScore.toFixed(2)} Vision Score</span> / Game</span>
                  </div>
                )}
                {data.gameLength && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_GAMELENGTH_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.gameLength.toFixed(2)} minutes</span> / Game</span>
                  </div>
                )}
                {data.dmgDealt && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_TOTALDMGDEALT_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.dmgDealt.toFixed(2)}</span>  Damage to Champions / Game</span>
                  </div>
                )}
                {data.minionsFirst10Minutes && (
                  <div className={styles.statBox}>
                    <img src={process.env.REACT_APP_MINIONSFIRST10MINUTES_ICON_PATH} alt="" className={styles.statIcon} />
                    <span>Average - <span className={styles.coloredText}>{data.minionsFirst10Minutes.toFixed(2)} Killed Minions</span> First 10 minutes / Game</span>
                  </div>
                )}
                
              </div>

              {/* Right panel for filters */}
              <div className={styles.filtersContainer}>
                <div className={styles.matchesCount}>
                  <strong>Matches in Database Count: {data.matchesOnGivenChamp}</strong>
                  <hr className={styles.separatorLine} /> {/* Dodana linia */}
                  {filters && (
                    <div className={styles.matchesWithFilters}>
                      <strong>Matches with filters applied: {data.matchesAfterFilters}</strong>
                      <hr className={styles.separatorLine} /> {/* Dodana linia */}
                    </div>
                  )}
                </div>

                <div className={styles.appliedFilters}>
                  <h3>Applied Filters:</h3>
                  {renderFilters()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
