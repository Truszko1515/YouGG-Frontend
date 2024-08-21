import { useState } from "react";
import styles from "../CSS/Form.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Form() {
  const [summonerName, setsummonerName] = useState("joohn senna");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Extract the summonerName and tag from the input
    const [name, tag] = summonerName.split('#');
  
    // If the tag exists, add it to the URL
    const url = tag ? `/summoner/${name}/${tag}` : `/summoner/${name}`;
  
    // Navigate to the constructed URL
    navigate(url);
  };
  return (
     <div className="body">
       <form className={styles.Searchform} onSubmit={handleSubmit}>
         <div className={styles.inputContainer}>
           <input
             className={styles.modernInput}
             onChange={(e) => setsummonerName(e.target.value)}
             value={summonerName}
             type="text"
             placeholder="Enter summoner name..."
           />
           <button
             className={styles.modernButton}
             type="submit"
           >
             Search
           </button>
         </div>
       </form>
     </div>
  );
}

/* return (
    <div className={styles.FormContainer}>
    <form className={styles.Searchform} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={styles.modernInput}
          onChange={(e) => setsummonerName(e.target.value)}
          value={summonerName}
          type="text"
          placeholder="Enter summoner name..."
        />
        <button
          className={styles.modernButton}
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  </div>
  );
   */

