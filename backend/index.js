const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const clubMemberRoutes = require('./routes/clubMembersRoute');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

const atlasURI = 'mongodb+srv://sofiane57800ben:f5UlGq0BJbvu3biI@cluster0.z0rv5ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const localURI = 'mongodb://localhost:27017/ClubSportif';

mongoose.connect(atlasURI)
  .then((result) => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas, trying local database...');
    mongoose.connect(localURI)
      .then((result) => console.log('Connected to local MongoDB'))
      .catch((err) => console.error('Failed to connect to local MongoDB', err));
  });

app.use('/api', clubMemberRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});