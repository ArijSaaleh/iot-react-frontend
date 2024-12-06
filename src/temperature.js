import React, { useEffect, useState } from "react";
import axios from "axios";

function Temperature() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    // Fetch the latest temperatures from the Laravel backend
    axios
      .get("http://localhost:8000/api/temperatures")
      .then((response) => {
        setTemperatures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Temperature Readings</h1>
      <ul>
        {temperatures.map((temp) => (
          <li key={temp.id}>
            {temp.temperature} °C at{" "}
            {new Date(temp.created_at).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Temperature;
