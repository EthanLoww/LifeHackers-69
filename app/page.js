"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useState } from "react";

import {
  Container,
  Title,
  Form,
  Input,
  Button,
} from "../components/StyledComponents";

const center = { lat: 1.287953, lng: 103.851784 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "your_api_key",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([{ id: 0, address: "" }]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: stops.map((stop) => ({
        location: stop.address,
        stopover: true,
      })),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const route = results.routes[0];
    let totalDistance = 0;
    let totalDuration = 0;
    for (let i = 0; i < route.legs.length; i++) {
      const leg = route.legs[i];
      if (leg) {
        totalDistance += leg.distance.value; // Accumulate distance
        totalDuration += leg.duration.value; // Accumulate duration
      }
    }
    const formattedDistance = (totalDistance / 1000).toFixed(2) + " km";
    const formattedDuration = Math.floor(totalDuration / 60) + " mins";
    setDistance(formattedDistance);
    setDuration(formattedDuration);
  }

  const addStop = () => {
    setStops([...stops, { id: stops[stops.length - 1].id + 1, address: "" }]);
  };

  const removeStop = (id) => () => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  const changeStop = (id) => (e) => {
    setStops(
      stops.map((stop) =>
        stop.id === id ? { id: id, address: e.target.value } : stop
      )
    );
  };

  return (
    <>
      <div>
        <Container>
          <Title>Route Planner</Title>
          <Form>
            <Input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {stops.map((stop) => (
                <div
                  key={stop.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Input
                    value={stop.address}
                    onChange={changeStop(stop.id)}
                    id={`stop-${stop.id}`}
                    type="text"
                    placeholder="Next Stop"
                    className="w-full"
                  />
                  <Button
                    onClick={removeStop(stop.id)}
                    variant="secondary"
                    type="button"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addStop} className="w-full" type="button">
              Add Stop
            </Button>
            <Input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button onClick={calculateRoute}>Calculate Route</Button>
          </Form>
          <Title>Distance: {distance}</Title>
          <Title>Duration: {duration}</Title>
        </Container>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default App;
