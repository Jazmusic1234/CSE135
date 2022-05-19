const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "jcc001",
 password: "CSE135hw1!",
 database: "chenjc_db",
});

conn.connect();

module.exports = conn;