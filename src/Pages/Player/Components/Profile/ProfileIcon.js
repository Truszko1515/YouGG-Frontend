import React, { useEffect, useState } from "react";
import styles from "../CSS/ProfileIcon.module.css";

export default function ProfileIcon({ summonerName }) {
  // const [summonerInfo, setSummonerInfo] = useState();
  // const [isLoaded, setIsLoaded] = useState(false);

  const [summonerInfo, setSummonerInfo] = useState({
    profileIconId: 3556,
    summonerLevel: 427,
  });
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://localhost:7041/api/summoner/" + summonerName
      );
      const data = await response.json();
      setSummonerInfo(data);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  return isLoaded ? (
    <div className={styles.imgTextWrapper}>
      <div className={styles.imgWrapper}>
        <img
          src={
            process.env.PUBLIC_URL +
            "/ProfileIcon/" +
            summonerInfo.profileIconId +
            ".png"
          }
          className={styles.imageStyle}
        ></img>
        <div className={styles.summonerName}>
          {summonerName} {<span style={{ color: "grey" }}>{"#EUW"}</span>}
        </div>
      </div>

      <div className={styles.textOnImage}>{summonerInfo.summonerLevel} </div>
    </div>
  ) : (
    <>Niezaładowane</>
  );
}
