import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import styles from "./Image.module.scss";

export type ImageProps = {
  url: string;
  alt: string;
  onClick: () => void;
  children?: ReactNode;
  disabled?: boolean;
};

const COLOR_CLASSES = ["primary", "red", "purple", "green", "yellow"];

const getRandomColor = () =>
  COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)];

const Image = (props: ImageProps) => {
  const [color, setColor] = useState<(typeof COLOR_CLASSES)[number]>(
    getRandomColor()
  );

  useEffect(() => {
    setColor(getRandomColor());
  }, [props.url]);

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={clsx(styles.button, styles[color])}
      disabled={props.disabled}
    >
      <img src={props.url} alt="" className={styles.image} />
      {props.children && <div className={styles.content}>{props.children}</div>}
    </button>
  );
};

export default Image;
