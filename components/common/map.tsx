"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import { fetchEventLocations } from "@/app/api/event";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Image from "next/image";
export default function Map() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEventLocations()
      .then((data) => setEvents(data))
      .catch((error) =>
        console.error("Error fetching event locations:", error)
      );
  }, []);

  return (
    <MapContainer
      preferCanvas={true}
      center={[48.86, 2.33]}
      zoom={11}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[
            event.record.fields.location_coordinates.lat,
            event.record.fields.location_coordinates.lon,
          ]}
        >
          <Popup>
            <h3>{event.record.fields.title_fr}</h3>
            <h4>{event.record.fields.location_address}</h4>
            <p>{event.record.fields.description_fr}</p>
            {event.record.fields.image && (
              <Image
                src={event.record.fields.image}
                alt={event.record.fields.title_fr || "No Title"}
                width={200}
                height={200}
              />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

Map.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      record: PropTypes.shape({
        fields: PropTypes.shape({
          location_coordinates: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
          }).isRequired,
          title_fr: PropTypes.string.isRequired,
          location_address: PropTypes.string.isRequired,
          description_fr: PropTypes.string.isRequired,
          image: PropTypes.string, // Ajout de la propriété image
        }).isRequired,
      }).isRequired,
    })
  ),
};
