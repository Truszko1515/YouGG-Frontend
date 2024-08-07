import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProfileIcon from "./Components/Profile/ProfileIcon";
import styles from "../../CSS/Summoner.module.css";

export default function Summoner() {
  const navigate = useNavigate();
  const { summonerName } = useParams();
  const name = useLoaderData(); 

  return (
    <div className={styles.summoner}> 
      <ProfileIcon summonerName={summonerName} /> 
    </div>
  );
}

export const summonerLoader = async ({ params }) => {
  const { summonerName } = params;

  //here we check if summoner exists, if not - display some proper error

  return summonerName;
};

/*  export default function Summoner() {
  const navigate = useNavigate();
  const { summonerName } = useParams();
  const name = useLoaderData();

  return (
        <div className={styles.summoner}>
          <ProfileIcon summonerName={summonerName} />
        </div>
  );
} */
