import { useContext } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import styles from "./ResetClicksButton.module.scss";
import { ReactComponent as RefreshIcon } from "../../svg/refresh-icon.svg";

const ResetClicksButton = () => {
  const { resetAllClicks } = useContext(ImagesContext);

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button} onClick={resetAllClicks}>
        <RefreshIcon className={styles.icon} />
        Reset regenerations
      </button>
    </div>
  );
};

export default ResetClicksButton;
