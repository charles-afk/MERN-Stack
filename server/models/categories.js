const mysql = require('./mysql')

const PREFIX = process.env.MYSQL_TABLE_PREFIX || `Product_T`;

async function get(condition = null, format = null, language = null, 
    nonstock = null, publisher = null, rating = null, series = null) {

    let sql = `SELECT * FROM ${PREFIX} WHERE `
    let flag = false

    if(nonstock === "No") {
        sql += `instock LIKE \'Yes\' `
        flag = true
    } else if (nonstock === "Yes") {
        sql += `instock LIKE \'Yes\' OR instock LIKE \'No\' `
        flag = true
    }

    if(condition && flag === true)
        sql += `&& \'condition\' LIKE \'${condition}\' `
    else if(condition && flag === false) {
        sql += `\'condition\' LIKE \'${condition}\' `
        flag = true
    }
    if(format && flag === true)
        sql += `&& format LIKE \'${format}\' `
    else if(format && flag === false){
        sql += `format LIKE \'${format}\' `
        flag = true
    }
    if(language && flag === true)
        sql += `&& language LIKE \'${language}\' `
    else if(language && flag === false) {
        sql += `language LIKE \'${language}\' `
        flag = true
    }
    if(publisher && flag === true)
        sql += `&& publisher LIKE \'${publisher}\' `
    else if(publisher && flag === true) {
        sql += `publisher LIKE \'${publisher}\' `
        flag = true
    }
    if(rating && flag === true)
        sql += `&& rating = ${rating} `
    else if(rating && flag === false){
        sql += `rating = ${rating} `
        flag = true
    }
    if(series && flag === true)
        sql += `&& series LIKE \'${series}\' `
    else if(series && flag === false) {
        sql += `series LIKE \'${series}\' `
        flag = true
    }
    
    //console.log(sql)

    return await mysql.query(sql)
}

module.exports = { get }