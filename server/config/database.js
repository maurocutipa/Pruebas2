const mysql = require('mysql');

let dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const getConnection = async () => {
  return new Promise((resolve, reject) => {
    let con = mysql.createConnection(dbConfig);

    con.connect((error) => {
      if (error) {
        reject(error); /*  */
        return;
      }
      //console.log("New connection stablished")
      resolve(con);
    });
  });
};

module.exports = { getConnection };
