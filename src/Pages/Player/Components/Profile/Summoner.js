import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "../../../../CSS/Summoner.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Summoner() {
  const navigate = useNavigate();
  const { summonerName } = useParams();
  const SummonerInfo = useLoaderData();
  const [summonerExists, setSummonerExists] = useState(SummonerInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!summonerExists) {
      setLoading(true);
      setTimeout(() => {
        navigate("/", {
          state: { errorMessage: "Summoner with given name does not exist" },
        });
      }, 1150);
    } else {
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
        />
      </div>
    </>
  );
}

export const summonerLoader = async ({ params }) => {
  const { summonerName } = params;

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  //here we check if summoner exists
  try {
    const response = await axios.get(
      "https://localhost:7041/api/summoner/info/" + summonerName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("summonerLoader - udany Request: ");
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("summonerLoader - nieudany request");
    console.log(err.response);
    return false;
  }
};
