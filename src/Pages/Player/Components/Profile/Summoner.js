import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "../../../../CSS/Summoner.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

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
    } catch (error) {
      console.log("Error fetching Champions Play Rate: ", error);
    }
  };
  const fetchLeagueEntry = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7041/api/summoner/LeagueEntry/${fullName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummonerLeagueEntry(response.data);
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

          // Fetch all data in parallel
          await Promise.all([
            fetchChampionsPlayRate(),
            fetchLeagueEntry(),
            fetchGamesRatio(),
            fetchPositions(),
            fetchKDA(),
            fetchKP(),
          ]);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Stop loading even if there is an error
        }
      };

      fetchData();
    }
  }, [summonerExists, navigate]);

  // Render after data is fetched and loading is complete
  return loading ||
    !summonerLeagueEntry ||
    !championsPlayRate ||
    !KDA ||
    !killParticipation ? (
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
