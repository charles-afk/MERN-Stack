const mysql = require('./mysql')

const PREFIX = process.env.MYSQL_TABLE_PREFIX || `ContactMe_T`;

async function getAll(){
    return await mysql.query(`SELECT * FROM ${PREFIX}`);
}

async function messageMe(name, email, text){
    const sql = `INSERT INTO ${PREFIX} (store_id, name, email, description, created_at) VALUES ? ;`
    const params = [[1, name, email, text, new Date()]]
    return await mysql.query(sql, [params]);
}

module.exports = { messageMe, getAll }