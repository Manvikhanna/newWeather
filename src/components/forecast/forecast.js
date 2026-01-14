import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ForecastCard from "../forecastCard/forecastCard";
import styles from "./style.module.css";

export default function Forecast({ forecast }) {
  const scrollRef = useRef(null);

  if (!forecast || forecast.length === 0) return null;

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>5-Day Forecast</h3>
        <div className={styles.scrollButtons}>
          <button className={styles.scrollBtn} onClick={() => scroll("left")} aria-label="Scroll left">
            <HiChevronLeft />
          </button>
          <button className={styles.scrollBtn} onClick={() => scroll("right")} aria-label="Scroll right">
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.wrapper} ref={scrollRef}>
        <div className={styles.gradient}></div>
        {forecast.map((item, index) => (
          <div key={item.dt} className={styles.cardWrapper} style={{ animationDelay: `${index * 0.1}s` }}>
            <ForecastCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
