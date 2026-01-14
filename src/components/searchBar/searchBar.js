import styles from "./style.module.css";

export default function SearchBar({ value, onChange, onSearch, error }) {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.searchInput} placeholder="Search city..." value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch()} />
      <button className={styles.searchButton} onClick={onSearch}>
        Search
      </button>
      {error && <span className={styles.helperText}>{error}</span>}
    </div>
  );
}
