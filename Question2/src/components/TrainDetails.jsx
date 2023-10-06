// src/components/TrainDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainDetails = ({ match }) => {
  const [trainInfo, setTrainInfo] = useState({});
  const trainId = match.params.trainid;

  useEffect(() => {
    axios.get(`http://localhost:3000/trains/train/${trainId}`)
      .then(response => {
        setTrainInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [trainId]);

  return (
    <div>
      <h2>Train Details</h2>
      <p><strong>Train Name:</strong> {trainInfo.trainName}</p>
      <p><strong>Train Number:</strong> {trainInfo.trainNumber}</p>
      <p><strong>Departure Time:</strong> {trainInfo.departureTime?.Hours}:{trainInfo.departureTime?.Minutes}</p>
      <p><strong>Seats Available:</strong></p>
      <ul>
        <li>Sleeper: {trainInfo.seatsAvailable?.sleeper}</li>
        <li>AC: {trainInfo.seatsAvailable?.AC}</li>
      </ul>
      <p><strong>Price:</strong></p>
      <ul>
        <li>Sleeper: ${trainInfo.price?.sleeper}</li>
        <li>AC: ${trainInfo.price?.AC}</li>
      </ul>
      <p><strong>Delayed By:</strong> {trainInfo.delayedBy} hours</p>
    </div>
  );
};

export default TrainDetails;
