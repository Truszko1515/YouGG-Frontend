import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "../../../../CSS/Summoner.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Summoner() {
  const navigate = useNavigate();
  const { summonerName, tag } = useParams();
  const SummonerInfo = useLoaderData();
  const [summonerExists, setSummonerExists] = useState(SummonerInfo);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [summonerLeagueEntry, setSummonerLeagueEntry] = useState();
  const [fullName, setFullName] = useState(summonerName + (tag ? `%23${tag}` : ""));

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
      console.log("fetchLeagueEntry - udany request");
      console.log(response.data);
      setSummonerLeagueEntry(response.data);
    } catch (error) {
      console.log("Error fetching league entry:", error);
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
      fetchLeagueEntry();  
      // Awaiting
      setTimeout(() => {
        setLoading(false);
      }, 1150);
    }
  }, [summonerExists, navigate]);

  return loading ? (
    <div className={styles.loadingContainer}>
      <ClipLoader size={300} color={"#123abcd"} loading={loading} />
    </div>
  ) : (
    <>
      <div className={styles.summoner}>
        <ProfileIcon
          summonerName={summonerName}
          summonerLevel={SummonerInfo.summonerLevel}
          ProfileIconId={SummonerInfo.profileIconId}
          summonerTagLine={(tag ? `#${tag}`  : "#EUW")}
          //
          tier={summonerLeagueEntry.tier}
          rank={summonerLeagueEntry.rank}
          leaguePoints={summonerLeagueEntry.leaguePoints}
          wins={summonerLeagueEntry.wins}
          losses={summonerLeagueEntry.losses}
        />
      </div>
    </>
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
