import { useState } from "react";

export const useGeolocation = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      (err) => {
        setError("Location permission denied or unavailable");
        setLoading(false);
      }
    );
  };

  return { coords, error, loading, getLocation };
};
