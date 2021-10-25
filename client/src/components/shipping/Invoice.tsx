import React, {useEffect} from 'react'
import { Receipt } from './Receipt'
interface CartItem {
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number | any
}
interface Receipts {
    [index:string]: string | number | CartItem[] | undefined,
    storeAddress:string, 
    storeState:string, 
    storeCity:string,
    storeZipcode:string,
    provider:string, 
    name:string,
    shippingAddress?:string, 
    shippingCity?:string, 
    shippingState?:string,
    shippingZipcode?:string,
    items:CartItem[],
    itemsPrice:number,
    taxPrice:string,
    shippingPrice:number, 
    amountTotal:number,
    user_id?:number
}
interface Props {
    purchase: Receipts[] | undefined
}

export const Invoice: React.FC<Props> = (props) => {
    const {purchase} = props
    
    useEffect(()=>{
        fetch('/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', }, 
                body: JSON.stringify(purchase![0]),
            }).catch((error) => console.error('Error:', error) );
    // eslint-disable-next-line
    },[])

    return (
        <div>
            <Receipt purchase={purchase}/>
        </div>
    )   
}
