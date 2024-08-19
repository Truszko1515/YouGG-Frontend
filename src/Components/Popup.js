import React, { useEffect } from 'react';
import styles from '../CSS/Popup.module.css'; // Import your CSS module

export default function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500); // Automatically close the popup after 3 seconds

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [onClose]);

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>
      </div>
    </div>
  );
}