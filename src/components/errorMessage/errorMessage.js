import styles from "./style.module.css";

export default function ErrorMessage({ message }) {
  return <div className={styles.error}>{message}</div>;
}
