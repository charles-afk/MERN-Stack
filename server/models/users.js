const mysql = require('./mysql')
const bcrypt = require('bcrypt');

const PREFIX = process.env.MYSQL_TABLE_PREFIX || `User_T`;
const SALT_ROUNDS = process.env.SALT_ROUNDS || 8;

async function get(id){
    const rows = await mysql.query(`SELECT user_id, username FROM ${PREFIX} WHERE user_id = ?`, [id]);
    if(!rows.length) throw {status: 404, message: "Sorry, no such user exists."};
    return rows[0];
}

async function getEmail(email){
    const rows = await mysql.query(`SELECT email FROM ${PREFIX} WHERE email = ?`, [email]);
    if(rows.length) throw {status: 404, message: "Sorry, email exists."};
    return rows[0];
}

async function getAll(){
    return await mysql.query(`SELECT * FROM ${PREFIX}`);
}

async function exists(email){
    const rows = await mysql.query(`SELECT * FROM ${PREFIX} WHERE email = ?`, [email]);
    return rows.length;
}

async function add(username, password, first_name, last_name, email){
    const sql = `INSERT INTO ${PREFIX} (username, password, first_name, last_name, email, created_at) VALUES ? ;`;
    const params = [[username, password, first_name, last_name, email, new Date()]];
    return await mysql.query(sql, [params]);
}

async function register(username, password, first_name, last_name, email){
    if(await exists(email))
        throw { status: 409, message: 'You already signed up with this email. Please go to Log In.'}
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const res = await add(username, hash, first_name, last_name, email);
    const user = get(res.insertId)
    return res;
}

async function login(email, password){
    const rows = await mysql.query(`SELECT * FROM ${PREFIX} WHERE email = ?`, [email]);
    if(!rows.length) throw { status: 404, message: "Sorry, that email address is not registered with us." };
    //console.log({password, password: rows[0].password});
    const hash = await bcrypt.hash(password, rows[0].password)
    const res = await bcrypt.compare(password, rows[0].password)
    //console.log ({res, hash})
    if(! res ) throw { status: 403, message: "Sorry, wrong password." };
    return get(rows[0].user_id);
}

const search = async q => await mysql.query
    (`SELECT user_id, first_name, last_name 
        FROM user_t 
            WHERE first_name LIKE ? OR last_name LIKE ?;`, [`%${q}%`, `%${q}%`])

module.exports = { get, getAll, add, search, register, login, exists, getEmail }