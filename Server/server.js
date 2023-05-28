const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();

// Connect to MongoDB
// const uri = 'mongodb://localhost:27017/my-database';
// mongoose.connect(uri, { useNewUrlParser: true });

// Create a new model
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   password: String
// });

// // Create a new user
// const user = new User({
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   password: 'password'
// });

// // Save the user
// user.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('User created successfully!');
//   }
// });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
