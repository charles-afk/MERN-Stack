import { useHistory } from 'react-router-dom';
import { useState } from 'react'
type CalculationSafe = string | number | any

interface CartItem {
    [index:string]: string | number | undefined,
    id?:string,
    name?:string,
    quantity:number,
    price?:CalculationSafe
}

export const useCart = (cart: CartItem[]) => {
    const itemsPrice = cart.reduce( (total, currentValue) => 
        total + currentValue.price * currentValue.quantity, 0)

    const taxPrice = itemsPrice * 0.09
    const taxPriceFixed = taxPrice.toFixed(2)
    const shippingPrice = 15
    const totalPrice = itemsPrice + taxPrice + shippingPrice
    const [loginWarning,setLoginWarning] = useState(false)
    let history = useHistory();

    return { itemsPrice, taxPrice, taxPriceFixed, totalPrice, history, shippingPrice, loginWarning,setLoginWarning}
}
