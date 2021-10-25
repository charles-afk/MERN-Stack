import React from 'react'
interface ShipInfo {
    street?: string,
    city?: string,
    state?: string,
    zipcode?: string
}
interface PayInfo {
    card: string,
    expire: string,
    secure: string,
    name: string
}
interface CartItem {
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number | any
}
interface Props {
    shipmentInfo: ShipInfo,
    paymentInfo: PayInfo,
    cart: CartItem[],
    handleSubmitGoBack: () => void,
    handleSubmitStepTwo: () => void
}
export const ConfirmShip: React.FC<Props> = (props) => {
    const {shipmentInfo,paymentInfo,cart,handleSubmitGoBack,handleSubmitStepTwo} = props
    
    const {street,city,state,zipcode} = shipmentInfo
    const {card,expire,secure,name} = paymentInfo
    
    const itemsPrice = cart.reduce( (total, currentValue) => 
        total + currentValue.price * currentValue.quantity, 0)
    const taxPrice = itemsPrice * 0.09
    const taxPriceFixed = taxPrice.toFixed(2)
    const shippingPrice = 15
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    return (
        <div>
            <h1>Confirm Shipment Information</h1><br />
            <div className="columns">
                <div className="column">
                    <h1>Shipping Info</h1> <br />
                    Street Address: <label>{street}</label><br />
                    City: <label>{city}</label><br />
                    State: <label>{state}</label><br />
                    Zipcode: <label>{zipcode}</label><br />   
                </div>
                <div className="column">
                    <h1>Payment Info</h1> <br />
                    Card Number: <label>{card}</label><br />
                    Expiration Date:<label>{expire}</label><br />
                    Security Number: <label>{secure}</label><br />
                    Name on Card: <label>{name}</label><br />
                </div>
                <div className="column">
                    <h1>Cart Info</h1> <br />
                    {cart.map( (items,index) =>{
                        return(
                            <div key={index}>
                                <span> {items.name} </span>
                                <span> [ {items.quantity}x ] </span>
                                <span> ${items.price} </span>
                            </div>
                        )
                    })}
                    <hr />
                    <span>Item Prices: ${itemsPrice}.00</span><br />
                    <span>Tax Prices: ${taxPriceFixed}</span><br />
                    <span>Shipping Price: ${shippingPrice}.00</span><br />
                    <span>Total Price: ${totalPrice}</span><br />
                </div>
            </div>

            <button onClick={handleSubmitGoBack}>Previous</button>

            <button onClick={handleSubmitStepTwo}>Confirm</button>

        </div>
    )
}
