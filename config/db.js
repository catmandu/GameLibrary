const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUri');

const ConnectDB = async () => 
{
  try 
  {
    await mongoose.connect(db, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected');
  } 
  catch (err) 
  {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
