import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const Sensor = () => {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Enable Pusher logging for debugging (optional)
    Pusher.logToConsole = true;

    // Initialize Laravel Echo with Pusher
    const echo = new Echo({
      broadcaster: "pusher",
      key: "881e222d79af728258b7", // Replace with your Pusher App Key
      cluster: "eu", // Replace with your Pusher App Cluster
      forceTLS: true, // Ensure SSL
    });

    // Subscribe to the 'iot-backend-laravel' channel
    const channel = echo.channel("iot-backend-laravel");
    channel.listen("SensorDataUpdated", function (data) {
      alert(JSON.stringify(data));
      setTemperature(data.temperature);
    });

    // Clean up when the component unmounts
    return () => {
      echo.disconnect(); // Properly disconnect from Echo and Pusher
    };
  }, []);

  return (
    <div>
      <h1>Sensor Data</h1>
      <p>Temperature: {temperature ? `${temperature}°C` : "Loading..."}</p>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
    </div>
  );
};

export default Sensor;
