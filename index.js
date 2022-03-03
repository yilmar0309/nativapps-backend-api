require('dotenv').config();
const mysql      = require('mysql');
const axios      = require('axios');
const { v4 }     = require('uuid');
const connection = mysql.createConnection({
  host     : process.env.DEV_HOST,
  user     : process.env.DEV_DB_USER,
  password : '',
  database : process.env.DEV_DB_NAME
});


async function insertMovies() {
  try {
    const result = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=5eec5adc&s=love&y=2020')
    connection.connect();
    for (const item of result.data?.Search) {
      const data = {
        id: v4(), 
        createdAt: new Date(),
        updatedAt: new Date(),
        ...item,
      }
      connection.query('INSERT INTO movie SET ?', data, function (error, results, fields) {
        if (error) throw error;
      });
    }
    connection.end();
  } catch (error) {
    console.log('ERROR -> ', error)
  }
}

insertMovies()