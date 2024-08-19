import Form from "../../Components/Form";
import Logo from "../../Components/LogoSVG";
//import styles from "../../CSS/Home.module.css
import styles from "../../CSS/Logo.module.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from "../../Components/Popup"; // Import the Popup component

export default function Home() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.errorMessage) {
      setErrorMessage(location.state.errorMessage);
      setShowPopup(true);
    }
  }, [location.state]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="body">
      <div className={styles.logo}>
        <Logo />
      </div>

      {showPopup && <Popup message={errorMessage} onClose={handleClosePopup} />}

      <Form />
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className={styles.home}}>
//       <div className={styles.logo}>
//       <Logo />
//       </div>

//       <Form />
//     </div>
//   );
// }
