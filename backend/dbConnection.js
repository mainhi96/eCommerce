import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var mysql = require('mysql');
const connection=mysql.createConnection({
 host: '127.0.0.1',
 port: '3306',
  user:'root',
  password:'12345678',
  database:'men_collection'
});
connection.connect();
export default connection;
