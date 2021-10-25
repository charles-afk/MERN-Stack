const mysql = require('./mysql')

async function getAll(user){
    let invArr = []
    let sql1 = `SELECT details_id FROM OrderDetails_T WHERE user_id = ?`
    const idArr = await mysql.query(sql1, [user.id])
    for(let i = 0; i < idArr.length; i++) {
        let invObj = {}


        let sql2 = `SELECT s.address AS storeAddress, s.state AS storeState, s.city AS storeCity, 
                    s.zipcode AS storeZipcode, s.email AS storeEmail
                        FROM OrderDetails_T AS d INNER JOIN Employee_T USING (employee_id)
                        INNER JOIN Store_T AS s USING (store_id)
                            WHERE d.details_id = ?`
        let storeArr = await mysql.query(sql2, [idArr[i].details_id])
        invObj["storeAddress"] = storeArr[0].storeAddress
        invObj["storeState"] = storeArr[0].storeState
        invObj["storeCity"] = storeArr[0].storeCity
        invObj["storeZipcode"] = storeArr[0].storeZipcode
        invObj["storeEmail"] = storeArr[0].storeEmail


        let sql3 = `SELECT p.provider, p.name
                        FROM OrderDetails_T AS d INNER JOIN PaymentDetails_T AS p USING (details_id)
                            WHERE d.details_id = ?`
        let payArr = await mysql.query(sql3, [idArr[i].details_id])
        invObj["provider"] = payArr[0].provider
        invObj["name"] = payArr[0].name


        let sql4 = `SELECT s.address AS shippingAddress, s.city AS shippingCity, s.state AS shippingState, 
                    s.zipcode AS shippingZipcode
                        FROM OrderDetails_T AS d INNER JOIN ShipmentInfo_T AS s USING (details_id)
                            WHERE d.details_id = ?`
        let shipArr = await mysql.query(sql4, [idArr[i].details_id])
        invObj["shippingAddress"] = shipArr[0].shippingAddress
        invObj["shippingCity"] = shipArr[0].shippingCity
        invObj["shippingState"] = shipArr[0].shippingState
        invObj["shippingZipcode"] = shipArr[0].shippingZipcode


        let sql5 = `SELECT d.amountTotal, d.shippingPrice, d.taxPrice, d.itemsPrice, d.details_id
                        FROM OrderDetails_T AS d
                            WHERE d.details_id = ?`
        let detailsArr = await mysql.query(sql5, [idArr[i].details_id])
        invObj["itemsPrice"] = detailsArr[0].itemsPrice
        invObj["taxPrice"] = detailsArr[0].taxPrice
        invObj["shippingPrice"] = detailsArr[0].shippingPrice
        invObj["amountTotal"] = detailsArr[0].amountTotal
        invObj["id"] = detailsArr[0].details_id


        invObj["items"] = []
        let sql6 = `SELECT i.details_id, p.name, i.quantity, p.price
                        FROM OrderDetails_T AS d INNER JOIN OrderItems_T AS i USING (details_id)
                        INNER JOIN Product_T AS p USING (product_id)
                            WHERE d.details_id = ?`
        let itemDetails = await mysql.query(sql6,[idArr[i].details_id])
        for(let j = 0; j < itemDetails.length; j++) {
            itemObj = {
                "name": itemDetails[j].name,
                "quantity": itemDetails[j].quantity,
                "price": itemDetails[j].price,
            }
            invObj["items"].push(itemObj)
        }
        

        invArr.push(invObj)
    }
    
    return invArr
}

module.exports = { getAll }