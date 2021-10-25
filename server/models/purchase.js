const mysql = require('./mysql')

async function pay(amountTotal, card, expire, items, itemsPrice, name, 
    secure, shippingAddress, shippingCity, shippingPrice, shippingState, shippingZipcode,
    taxPrice, user_id) {

    let sql1 = `INSERT INTO OrderDetails_T (user_id, employee_id, created_at) VALUES ?;`
    let params1 = [[user_id, 1, new Date()]]
    await mysql.query(sql1,[params1])
    const rows = 
        await mysql.query(`SELECT details_id FROM OrderDetails_T WHERE amountTotal IS NULL && user_id = ?;`, [user_id])
    const id = rows[0].details_id
    for(let i = 0; i < items.length; i++){
        let sql2 = `INSERT INTO OrderItems_T (details_id, product_id, quantity, created_at) VALUES ? ;`
        let params2 = [[id, items[i].id, items[i].quantity, new Date()]]
        await mysql.query(sql2,[params2])
    }
    let sql3 = `INSERT INTO ShipmentInfo_T (details_id, address, city, state, zipcode, created_at) VALUES ? ;`
    let params3 = [[id, shippingAddress, shippingCity, shippingState, shippingZipcode, new Date()]]
    await mysql.query(sql3, [params3])
    let sql4 = `INSERT INTO PaymentDetails_T 
        (details_id, amount, provider, card, expiration, secure, name, status, created_at) VALUES ?`
    let params4 = [[id, amountTotal, "credit", card, expire, secure, name, "cleared", new Date()]]
    await mysql.query(sql4, [params4])
    let sql5 = `UPDATE OrderDetails_T SET ? WHERE details_id = ? ;`
    let params5 = {amountTotal, shippingPrice, taxPrice, itemsPrice}
    await mysql.query(sql5,[params5, id])
}

module.exports = { pay }