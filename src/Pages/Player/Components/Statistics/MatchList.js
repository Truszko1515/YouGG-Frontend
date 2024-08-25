import React from "react";
import MatchDetails from "./MatchDetails";
import styles from "../../../../CSS/MatchList.module.css";

const MatchList = ({ matches = []  }) => {

  if (!matches || matches.length === 0) {
    return <div>No matches available.</div>;
  }
  return (
    <div className={styles.matchList}>
      <div className={styles.lastMatchesText}>Ostatnie 20 meczów:</div>
      {matches.map((match, index) => (
        <MatchDetails key={index} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
