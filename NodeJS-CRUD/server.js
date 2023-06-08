const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Connect to database
const url = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(url)
  .then(console.log('Connected to Database'))
  .catch((err) => console.log(err.message));

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
