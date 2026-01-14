"use client";

import styles from "./style.module.css";

export default function RecentSearches({ searches = [], onSelect, onClear }) {
  if (searches.length === 0) return null;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.title}>Recent searches</span>

        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      </div>

      <div className={styles.list}>
        {searches.map((city) => (
          <button key={city} type="button" className={styles.item} onClick={() => onSelect(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
