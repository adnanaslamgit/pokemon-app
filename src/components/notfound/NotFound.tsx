import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import sadPikachu from "../../assets/sad-pickachu.png";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <img src={sadPikachu} alt="Sad Pikachu" className={styles.image} />
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>
          Oh no! Pikachu couldn’t find the page you were looking for.
        </p>
        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
