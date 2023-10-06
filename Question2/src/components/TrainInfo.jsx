import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainTable from './TrainTable';

function TrainInfo() {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:3000/trains')
      .then((response) => {
        setTrainData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h1>Train Information</h1>
      {/* <h1>{trainData}</h1>
      <ul>
        {trainData.map((train, index) => (
          <li key={index}>
            <h2>{train.name}</h2>
            <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            <p>Seat Availability - Sleeper: {train.seatAvailability.sleeper}, AC: {train.seatAvailability.AC}</p>
            <p>Prices - Sleeper: {train.prices.sleeper}, AC: {train.prices.AC}</p>
          </li>
        ))}
      </ul> */}
      <TrainTable  trainData={trainData}/>
    </div>
  );
}

export default TrainInfo;
