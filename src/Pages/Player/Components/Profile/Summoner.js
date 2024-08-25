import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import styles from "../../../../CSS/Summoner.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import ChampionMastery from "../Statistics/ChampionMastery";
import ProfileIcon from "../Statistics/ProfileIcon";
import MatchList from "../Statistics/MatchList";

export default function Summoner() {
  const navigate = useNavigate();
  const { summonerName, tag } = useParams();
  const SummonerInfo = useLoaderData();
  const [summonerExists, setSummonerExists] = useState(SummonerInfo);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [fullName, setFullName] = useState(
    summonerName + (tag ? `%23${tag}` : "")
  );
  const [summonerLeagueEntry, setSummonerLeagueEntry] = useState(null);
  const [championsPlayRate, setChampionsPlayRate] = useState(null);
  const [KDA, setKDA] = useState(null);
  const [killParticipation, setKillParticipation] = useState(null);
  const [positions, setPositions] = useState(null);
  const [gamesRatio, setGamesRatio] = useState(null);
  const [championsMastery, setChampionsMastery] = useState(null);
  const [matches, setMatches] = useState(null);

  const matchesDetails = [
    {
      type: "Ranked Solo",
      timeAgo: "1 dzień temu",
      champion: "Aatrox",
      kills: 4,
      deaths: 3,
      assists: 4,
      kdaRatio: 2.67,
      items: ["item1", "item2", "item3", "item4"],
      lanePhase: "Faza laningu 47:53",
      spell1: "SummonerFlash.png",
      spell2: "SummonerTeleport.png",
      runePrimary: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
      runeSecondar: "perk-images/Styles/7203_Whimsy.png",
      cs: "CS 198 (8.4)",
      result: "Zwycięstwo",
      additionalInfo: "Odporność",
      team: [
        { name: "Pantless", champion: "Yasuo" },
        { name: "letmechaos", champion: "Zed" },
        { name: "Blütenduft", champion: "Ahri" },
        { name: "Flakkardo", champion: "Ashe" },
        { name: "Yuank Le", champion: "Leona" },
      ],
      opponents: [
        { name: "tukaan", champion: "Akali" },
        { name: "NGX Slayer", champion: "Diana" },
        { name: "Samsara", champion: "Lux" },
        { name: "ROI DES", champion: "Ezreal" },
        { name: "Desmond", champion: "Thresh" },
      ],
    },
    {
      type: "Ranked Solo",
      timeAgo: "2 dni temu",
      champion: "Khazix",
      kills: 10,
      deaths: 2,
      assists: 4,
      kdaRatio: 7,
      items: ["item1", "item2", "item3", "item4"],
      lanePhase: "Faza laningu 10:53",
      cs: "CS 225 (10.4)",
      result: "Zwycięstwo",
      additionalInfo: "Odporność",
      team: [
        { name: "Pantless", champion: "Yasuo" },
        { name: "letmechaos", champion: "Zed" },
        { name: "Blütenduft", champion: "Ahri" },
        { name: "Flakkardo", champion: "Ashe" },
        { name: "Yuank Le", champion: "Leona" },
      ],
      opponents: [
        { name: "tukaan", champion: "Akali" },
        { name: "NGX Slayer", champion: "Diana" },
        { name: "Samsara", champion: "Lux" },
        { name: "ROI DES", champion: "Ezreal" },
        { name: "Desmond", champion: "Thresh" },
      ],
    },
    {
      type: "Ranked Solo",
      timeAgo: "2 dni temu",
      champion: "Nami",
      kills: 1,
      deaths: 4,
      assists: 23,
      kdaRatio: 7,
      items: ["item1", "item2", "item3", "item4"],
      lanePhase: "Faza laningu 15:13",
      cs: "CS 227 (1.2)",
      result: "Zwycięstwo",
      additionalInfo: "Odporność",
      team: [
        { name: "Pantlesssssssssssss", champion: "Yasuo" },
        { name: "letmechaos", champion: "Zed" },
        { name: "Blütenduft", champion: "Ahri" },
        { name: "Flakkardo", champion: "Ashe" },
        { name: "Yuank Le", champion: "Leona" },
      ],
      opponents: [
        { name: "tukaan", champion: "Akali" },
        { name: "NGX Slayer", champion: "Diana" },
        { name: "Samsara", champion: "Lux" },
        { name: "ROI DES", champion: "Ezreal" },
        { name: "Desmond", champion: "Thresh" },
      ],
    },
    // kolejne mecze...
  ];

  const fetchMatchesDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/MatchesDetails/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMatches(response.data);
      console.log("Matches Details - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Matches Details: ", error);
    }
  };
  const fetchChampionsPlayRate = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/ChampionsPlayed/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChampionsPlayRate(response.data);
      console.log("Champions play rate chart - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Champions Play Rate: ", error);
    }
  };
  const fetchChampionsMastery = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/ChampionsMastery/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChampionsMastery(response.data);
      console.log("Champions Mastery - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Champions Play Rate: ", error);
    }
  };
  const fetchLeagueEntry = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/LeagueEntries/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummonerLeagueEntry(response.data);
      console.log("League entry - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching league entry:", error);
    }
  };
  const fetchGamesRatio = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/LastGamesRatio/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGamesRatio(response.data);
      console.log("Games ratio - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Games Ratio:", error);
    }
  };
  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/Positions/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPositions(response.data);
      console.log("Positions - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Positions:", error);
    }
  };
  const fetchKDA = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/KDA/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKDA(response.data);
      console.log("KDA - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching KDA: ", error);
    }
  };
  const fetchKP = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/Summoner/KillParticipation/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKillParticipation(response.data);
      console.log("KP - success");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Kill Participation: ", error);
    }
  };

  useEffect(() => {
    if (!summonerExists) {
      setLoading(true);
      setTimeout(() => {
        navigate("/", {
          state: { errorMessage: "Summoner with given name does not exist" },
        });
      }, 1150);
    } else {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Fetch data sequentially
          await fetchKDA();
          await fetchMatchesDetails()
          await fetchChampionsPlayRate();
          await fetchChampionsMastery();
          await fetchLeagueEntry();
          await fetchGamesRatio();
          await fetchPositions();
          await fetchKP();

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Stop loading even if there is an error
        }
      };

      fetchData();
    }
  }, [summonerExists, navigate]);

  const totalMasteryPoints = championsMastery
    ? championsMastery.reduce((acc, champ) => acc + champ.masteryLevel, 0)
    : 0;
  const totalChampionPoints = championsMastery
    ? championsMastery.reduce((acc, champ) => acc + champ.points, 0)
    : 0;

  // Render after data is fetched and loading is complete
  return loading ||
  !summonerLeagueEntry ||
  !championsPlayRate ||
  !KDA ||
  !killParticipation ||
  !championsMastery ||
  !gamesRatio ||
  !positions ||
  !matches ? (
    <div className={styles.loadingContainer}>
      <ClipLoader size={300} color={"#123abcd"} loading={loading} />
    </div>
  ) : (
    <div className={styles.summoner}>
      <ProfileIcon
        summonerName={summonerName}
        summonerLevel={SummonerInfo.summonerLevel}
        ProfileIconId={SummonerInfo.profileIconId}
        summonerTagLine={tag ? `#${tag}` : "#EUW"}
        //
        tier={summonerLeagueEntry?.tier || "Unranked"}
        rank={summonerLeagueEntry?.rank || ""}
        leaguePoints={summonerLeagueEntry?.leaguePoints0}
        wins={summonerLeagueEntry?.wins}
        losses={summonerLeagueEntry?.losses}
        //
        positions={positions || []}
        champions={championsPlayRate}
        kda={KDA}
        kp={killParticipation}
        gamesRatio={gamesRatio}
      />
      <ChampionMastery
        masteryPoints={totalChampionPoints}
        heroPoints={totalMasteryPoints}
        champions={championsMastery}
      />
      <MatchList 
        matches={matches || []} 
      />
    </div>
  );
}
export const summonerLoader = async ({ params }) => {
  const { summonerName, tag } = params; // Adjust this based on your URL structure
  let fullName = summonerName;

  // If the tag exists, append it to the summonerName
  if (tag) {
    fullName += `%23${tag}`;
  }

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // Send the GET request with the full summoner name including the tag (if present)
  try {
    const response = await axios.get(
      "https://localhost:7041/api/summoner/info/" + fullName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("summonerLoader - successful request: ");
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("summonerLoader - failed request");
    console.log(err.response);
    return false;
  }
};

// const champions = [
//   { name: "JarvanIV", masteryLevel: 8, points: 357969 },
//   { name: "Renekton", masteryLevel: 6, points: 541928 },
//   { name: "Ezreal", masteryLevel: 6, points: 485273 },
//   { name: "Tristana", masteryLevel: 5, points: 298737 },
//   { name: "Kalista", masteryLevel: 5, points: 298026 },
//   { name: "Yasuo", masteryLevel: 4, points: 271644 },
// ];

// const itemsAndRunes = [{ firstSpell: "Flash" }];