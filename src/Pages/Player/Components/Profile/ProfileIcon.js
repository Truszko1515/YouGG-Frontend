import React, { useEffect, useState } from "react";
import styles from "../../../../CSS/ProfileIcon.module.css";
import RankIconStyles from "../../../../CSS/RankIcon.module.css";

export default function ProfileIcon({
  summonerName,
  summonerLevel,
  ProfileIconId,
}) {
  return (
    <>
      <div className="body">
        <div className={styles.profileIcon}>
          <div className={styles.imgTextWrapper}>

            <div className={RankIconStyles.profileContainer}>
              <img
                src={`path_to_rank_icon_image/${ProfileIconId}.png`}
                alt="Rank Icon"
                className={RankIconStyles.rankIcon}
              />
              <div className={RankIconStyles.profileInfo}>
                <h3 className={RankIconStyles.rankType}>Ranked Solo</h3>
                <p className={RankIconStyles.summonerName}>{summonerName}</p>
                <p className={RankIconStyles.rankDetails}>Challenger 1</p>
                <p className={RankIconStyles.rankStats}>701 LP / 0W 0L</p>
                <p className={RankIconStyles.winRatio}>Win Ratio 50%</p>
              </div>
            </div>

            <div className={styles.imgWrapper}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/ProfileIcon/" +
                  ProfileIconId +
                  ".png"
                }
                className={styles.imageStyle}
              ></img>
              <div className={styles.summonerName}>
                {summonerName + " #EUW"}
              </div>
              <div className={styles.textOnImage}>{summonerLevel} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// useEffect(() => {
//   const fetchData = async () => {
//     const response = await fetch(
//       "https://localhost:7041/api/summoner/" + summonerName
//     );
//     const data = await response.json();
//     setSummonerInfo(data);
//     setIsLoaded(true);
//     console.log("Profile Icon - pobieranie ikonki")
//   };

//   fetchData();
// }, [state]);
