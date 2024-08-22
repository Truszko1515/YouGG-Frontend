import React from "react";
import styles from "../../../../CSS/ProfileIcon.module.css";
import RankIconStyles from "../../../../CSS/RankIcon.module.css";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// Rejestracja elementów Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ProfileIcon({
  // Profile icon
  summonerName = "NaN",
  summonerLevel = 0,
  ProfileIconId = 1,
  summonerTagLine = "EUW",
  // Rank icon
  tier = "Unknown",
  rank = 0,
  leaguePoints = 0,
  wins = 0,
  losses = 0,
  // last 20 games stats
  kda = 0,
  kp = 0,
  champions = [],
  positions = [{ roleInGame: "TOP", percentage: 0 },{ roleInGame: "Jungle", percentage: 0 },{ roleInGame: "Mid", percentage: 0 },{ roleInGame: "Adc", percentage: 0 },{ roleInGame: "Support", percentage: 0 },],
  gamesRatio = { gamesPlayed: 20, wins: 10, losses: 10 },
}) {

  const winRate = Math.round((wins / (wins + losses)) * 100);
  const kdaColor = kda > 3 ? "#00C853" : "#FF1744"; // Kolor KDA
  const tierFormatted = tier
    ? tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()
    : "Unknown";

  const doughnutData = {
    labels: ["Wygrane", "Przegrane"],
    datasets: [
      {
        label: "Procent wygranych",
        data: [winRate, 100 - winRate],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };
  const barData = {
    labels: positions.map((pos) => pos.roleInGame),
    datasets: [
      {
        label: "Preferowana Pozycja (Ranking)",
        data: positions.map((pos) => pos.percentage),
        backgroundColor: "#1a73e8",
      },
    ],
  };
  const doughnutOptions = {
    cutout: "70%", // Adjust the cutout percentage if needed
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="body">
      <div className={styles.container}>
        {/* Lewe Sekcje - Ikona Rankingu oraz Ikona Profilu */}
        <div className={styles.leftSection}>
          <div className={RankIconStyles.profileContainer}>
            <img
              src={`${process.env.REACT_APP_RANK_ICON_PATH}TFT_Regalia_${tierFormatted}.png`}
              alt="Rank Icon"
              className={RankIconStyles.rankIcon}
            />
            <div className={RankIconStyles.profileInfo}>
              <h3 className={RankIconStyles.rankType}>Ranked Solo</h3>
              <p className={RankIconStyles.summonerName}>{summonerName}</p>
              <p className={RankIconStyles.rankDetails}>
                {tier} {rank}
              </p>
              <p className={RankIconStyles.rankStats}>
                {leaguePoints} LP / {wins}W {losses}L
              </p>
              <p className={RankIconStyles.winRatio}>
                Win Ratio {Math.round((wins / (wins + losses)) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Sekcja Środkowa - Statystyki Ostatnich Meczów */}
        <div className={styles.middleSection}>
          <div className={styles.matchStats}>
            <h3>Ostatnie mecze</h3>
            <div className={styles.kdaStats}>
              <div className={styles.doughnutContainer}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className={styles.kdaText}>
                <p>
                  {gamesRatio.gamesPlayed} Games {gamesRatio.wins} Wins{" "}
                  {gamesRatio.losses} Losses
                </p>
                <p style={{ color: kdaColor }}>{kda}:1</p>
                <p>P/Kill {kp}%</p>
              </div>
            </div>

            <div className={styles.champions}>
              <h4>Najnowsze 20 rozegrane Mistrze</h4>
              <ul className={styles.champList}>
                {champions.map((champion, index) => (
                  <li key={index}>
                    <img
                      src={`${process.env.REACT_APP_CHAMPION_ICON_PATH}${champion.name}.png`}
                      alt={champion.name}
                    />
                    <span>
                      {champion.winRate}% ({champion.wins}W {champion.losses}P){" "}
                      <p
                        style={{
                          color:
                            champion.kda.toFixed(2) > 3
                              ? "#00C853"
                              : "#FF1744" > 5,
                        }}
                      >
                        {champion.kda.toFixed(2)} KDA
                      </p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.positions}>
            <h4>Preferowana Pozycja (Ranking)</h4>
            <Bar
              data={barData}
              options={{
                indexAxis: "y",
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Prawa Sekcja - Preferowana Pozycja */}
        <div className={styles.rightSection}>
          <div className={styles.profileIcon}>
            <div className={styles.imgTextWrapper}>
              <div className={styles.imgWrapper}>
                <img
                  src={
                    process.env.REACT_APP_PROFILE_ICON_PATH +
                    ProfileIconId +
                    ".png"
                  }
                  className={styles.imageStyle}
                  alt="Profile Icon"
                />
                <div className={styles.textOnImage}>{summonerLevel}</div>
              </div>
            </div>
            <div className={styles.summonerTagLine}>{`${summonerTagLine}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
