import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import styles from "./style.module.css";

export default function ForecastCard({ data }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.date}>
          {new Date(data.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <div className={styles.iconWrapper}>
        <img className={styles.icon} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="forecast" />
        <div className={styles.iconGlow}></div>
      </div>

      <div className={styles.tempContainer}>
        <div className={styles.tempRow}>
          <TbArrowUp className={styles.arrowIcon} />
          <span className={styles.maxTemp}>{Math.round(data.main.temp_max)}°</span>
        </div>
        <div className={styles.tempDivider}></div>
        <div className={styles.tempRow}>
          <TbArrowDown className={styles.arrowIconDown} />
          <span className={styles.minTemp}>{Math.round(data.main.temp_min)}°</span>
        </div>
      </div>

      <p className={styles.description}>{data.weather[0].description}</p>
    </div>
  );
}
