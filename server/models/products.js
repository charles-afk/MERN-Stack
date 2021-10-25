const mysql = require('./mysql')

const PREFIX = process.env.MYSQL_TABLE_PREFIX || `Product_T`;

async function getAll(){
    return await mysql.query(`SELECT * FROM ${PREFIX}`);
}

module.exports = { getAll }