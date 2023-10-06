const express = require('express');
const axios = require('axios');
const moment = require('moment');
const app = express();
const port = 3000; 
const cors = require('cors')
app.use(cors())
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NzIxMjQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiY2I0MmZhM2QtMDNjMi00NDU5LTkzNDktZTY5NDI5YWE1OGY3Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDE2NDAxMDAxNjEifQ.gRv13tuYYa6bxDabF2SZO0wvYB0lOIjBW4PbiJsyvKs"
async function fetchTrainData() {
  const now = moment();
  const thirtyMinutesLater = moment().add(30, 'minutes');
  const twelveHoursLater = moment().add(12, 'hours');

  const requestBody = {
        "companyName": "Train Central",
        "clientID": "cb42fa3d-03c2-4459-9349-e69429aa58f7",
        "ownerName": "Mohd Harish",
        "ownerEmail": "harishaa827@gmail.com",
        "rollNo": "2001640100161",
        "clientSecret": "AVCuvQutLDKFBGRx"
  };

  const token = await getAuthToken(requestBody);

  const response = await axios.get(
    'http://20.244.56.144/train/trains',
    {
        headers: { Authorization: `Bearer ${token}` }
    }
  );
  console.log(response.data);
  const filteredTrains = response.data.filter((train) => {
    const departureTime = moment(train.departureTime);
    return departureTime.isAfter(thirtyMinutesLater);
  });

  const sortedTrains = filteredTrains.sort((a, b) => {
    // Sort by ascending price
    if (a.price.sleeper !== b.price.sleeper) {
      return a.price.sleeper - b.price.sleeper;
    }

    if (a.price.AC !== b.price.AC) {
        return a.price.AC - b.price.AC;
    }

    // Sort by descending tickets
    if (b.seatsAvailable.sleeper !== a.seatsAvailable.sleeper) {
      return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
    }

    // Sort by descending departure time
    const departureA = moment(a.departureTime).add(a.delayMinutes || 0, 'minutes');
    const departureB = moment(b.departureTime).add(b.delayMinutes || 0, 'minutes');
    return departureB - departureA;
  });



  return filteredTrains.map((train) => ({
    name: train.trainName,
    trainNumber: train.trainNumber,
    departureTime: train.departureTime,
    seatAvailability: {
      sleeper: train.seatsAvailable.sleeper,
      AC: train.seatsAvailable.AC,
    },
    prices: {
      sleeper: train.price.sleeper,
      AC: train.price.AC,
    },
  }));
}

app.get('/trains', async (req, res) => {
  try {
    const trainData = await fetchTrainData();
    console.log(trainData.length)
    res.json(trainData);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/trains/train/:trainId', async(req, res) => {
  const requestBody = {
    "companyName": "Train Central",
    "clientID": "cb42fa3d-03c2-4459-9349-e69429aa58f7",
    "ownerName": "Mohd Harish",
    "ownerEmail": "harishaa827@gmail.com",
    "rollNo": "2001640100161",
    "clientSecret": "AVCuvQutLDKFBGRx"
};

const token = await getAuthToken(requestBody);

const id = req.params.trainId;
const response = await axios.get(
  `http://20.244.56.144/train/trains/${id}`,
  {
      headers: { Authorization: `Bearer ${token}` }
  }
);
console.log(response.data);
res.json(response.data);
});

// post request to get authorization token from the server before calling the get method to get the train data
async function getAuthToken(requestBody) {
    try {
      const response = await axios.post('http://20.244.56.144/train/auth', requestBody);
      console.log(response)
      if (response.status === 200) {
        return response.data.access_token; // Assuming the token is in the response data
      } else {
        throw new Error('Failed to get authorization token');
      }
    } catch (error) {
      throw error;
    }
  }


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
