import styles from "./style.module.css";

export default function UnitToggle({ unit, setUnit }) {
  const toggle = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  return (
    <button className={styles.button} onClick={toggle}>
      {unit === "metric" ? "°C" : "°F"}
    </button>
  );
}
