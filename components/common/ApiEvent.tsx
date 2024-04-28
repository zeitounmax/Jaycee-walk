import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchEventLocations, EventRecord } from "@/app/api/event"; // Assurez-vous que le chemin d'accès est correct

interface ApiEventProps {
  fetchedData: EventRecord[];
}

function ApiEvent({ fetchedData }: ApiEventProps) {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEventsData() {
      try {
        const eventData = await fetchEventLocations();
        setEvents(eventData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setIsLoading(false);
      }
    }

    fetchEventsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {events.map((event) => (
        <div key={`${event.fields.lat}-${event.fields.lon}`}>
          <h3>{event.fields.label}</h3>
          <p>Latitude: {event.fields.lat}</p>
          <p>Longitude: {event.fields.lon}</p>
        </div>
      ))}
    </div>
  );
}

ApiEvent.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default ApiEvent;
