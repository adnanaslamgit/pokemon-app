import React from "react";
import styles from "./Loader.module.scss"; 
import pokeball from "../../assets/pokeball.png"; 

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader-container">
      <img src={pokeball} alt="Loading..." className={styles.loaderImage} />
      <p className={styles.loaderText}>Loading Pokemon...</p>
    </div>
  );
};

export default Loader;
