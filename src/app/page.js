"use client";

import { useEffect, useState } from "react";

import CurrentWeather from "../components/currentWeather/currentWeather";
import ErrorMessage from "../components/errorMessage/errorMessage";
import Forecast from "../components/forecast/forecast";
import Loader from "../components/loader/loader";
import SearchBar from "../components/searchBar/searchBar";
import UnitToggle from "../components/unitToggles/unitToggles";
import RecentSearches from "../components/recentSearches/recentSearches";

import useDebounce from "../hook/useDebounce";
import { useGeolocation } from "../hook/useGeolocation";
import { useWeather } from "../hook/useWeather";

export default function Home() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [autoError, setAutoError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const debouncedCity = useDebounce(city);

  const { data, forecast, loading, error, fetchWeather, fetchWeatherByLocation } = useWeather();

  const { coords, error: geoError, loading: geoLoading, getLocation } = useGeolocation();

  /* ───────── Load recent searches ───────── */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(stored);
  }, []);

  /* ───────── Fetch weather by city ───────── */
  useEffect(() => {
    if (debouncedCity.length >= 2) {
      fetchWeather(debouncedCity, unit);
    }
  }, [debouncedCity, unit]);

  /* ───────── Load unit from localStorage ───────── */
  useEffect(() => {
    const savedUnit = localStorage.getItem("unit");
    if (savedUnit === "metric" || savedUnit === "imperial") {
      setUnit(savedUnit);
    }
  }, []);

  /* ───────── Fetch weather by location ───────── */
  useEffect(() => {
    if (coords.lat && coords.lon) {
      fetchWeatherByLocation(coords.lat, coords.lon, unit);
    }
  }, [coords, unit]);

  /* ───────── Save recent search ───────── */
  useEffect(() => {
    if (data?.name) {
      setRecentSearches((prev) => {
        const updated = [data.name, ...prev.filter((city) => city !== data.name)].slice(0, 5);

        localStorage.setItem("recentSearches", JSON.stringify(updated));
        return updated;
      });
    }
  }, [data]);

  /* ───────── Auto-hide error after 3.5 sec ───────── */
  useEffect(() => {
    if (error || geoError) {
      setAutoError(error || geoError);

      const timer = setTimeout(() => {
        setAutoError(null);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [error, geoError]);

  const handleRecentSelect = (city) => {
    setCity(city);
    fetchWeather(city, unit);
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const showEmptyState = !data && (!forecast || forecast.length === 0) && !loading && !geoLoading && !autoError;

  return (
    <>
      {/* ───────── Hero Section ───────── */}
      <section className="hero">
        <div className="heroBadgeWrapper">
          <span className="heroBadge">
            <span className="badgePulse"></span>
            Live weather, anywhere
          </span>
        </div>

        <h1 className="heroTitle">
          Check the forecast
          <span className="heroTitleAccent"> in seconds.</span>
        </h1>

        <p className="heroSubtitle">Type a city or use your location to see current conditions and a 5-day outlook.</p>
      </section>

      {/* ───────── Search Section ───────── */}
      <div className="searchSection">
        <SearchBar value={city} onChange={setCity} onSearch={() => fetchWeather(city, unit)} />

        <RecentSearches searches={recentSearches} onSelect={handleRecentSelect} onClear={clearRecentSearches} />

        <div className="controlsRow">
          <UnitToggle unit={unit} setUnit={setUnit} />

          <button
            className="geoButton"
            onClick={() => {
              setCity("");
              getLocation();
            }}
            disabled={geoLoading}
          >
            {geoLoading ? "Locating..." : "Use My Location"}
          </button>
        </div>
      </div>

      {/* ───────── Empty State ───────── */}
      {showEmptyState && (
        <section className="emptyState">
          <h2 className="emptyTitle">Start with a city or your current location</h2>
          <p className="emptyText">
            Try searching for <strong>London</strong>, <strong>Tokyo</strong>, or <strong>New York</strong>.
          </p>
        </section>
      )}

      {/* ───────── Loader & Error ───────── */}
      {(loading || geoLoading) && <Loader />}
      {autoError && <ErrorMessage message={autoError} />}

      {/* ───────── Weather Content ───────── */}
      <div className="weatherContent">
        <CurrentWeather data={data} />
        <Forecast forecast={forecast} />
      </div>
    </>
  );
}
