import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProfileIcon from "./Components/Profile/ProfileIcon";
import styles from "../../CSS/Summoner.module.css";
import React, { useState } from "react";
import axios from "axios";
import MyComponent from "./Components/Profile/MyComponent";

export default function Summoner() {
  const { summonerName } = useParams();
  const SummonerInfo = useLoaderData();
  const [summonerExists, setSummonerExists] = useState(SummonerInfo);

  return summonerExists ? (
    <div className={styles.summoner}>
      <ProfileIcon summonerName={summonerName} />
    </div>
  ) : (
    <>
      Summoner with given name doesn't exist <br></br>
      <MyComponent />
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
    console.log("summonerLoader - udany Request: " + response.data);
    return { summonerInfo: response.data };
  } 
  catch (err) {
    console.log("summonerLoader - nieudany request");
    console.log(err.response.data)
    return false;
  }
};
