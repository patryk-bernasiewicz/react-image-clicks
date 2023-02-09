import { useContext } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import styles from "./TotalClicksCounter.module.scss";

const TotalClicksCounter = () => {
  const { totalImageClicks } = useContext(ImagesContext);

  return (
    <div className={styles.counter}>
      Total clicks: <strong>{totalImageClicks}</strong>
    </div>
  );
};

export default TotalClicksCounter;
