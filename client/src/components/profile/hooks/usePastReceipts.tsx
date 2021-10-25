import { useEffect, useState } from "react"
interface UserState {
    id?:number,
    username?:string
}
interface CartItem {
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number | any
}
interface PastRecpt {
    [index:string]: string | number | CartItem[] | undefined,
    storeAddress?:string,
    storeCity?:string,
    storeState?:string,
    storeZipcode?:string,
    provider?:string,
    name?:string,
    shippingAddress?:string, 
    shippingCity?:string, 
    shippingState?:string,
    shippingZipcode?:string,
    itemsPrice?:number,
    taxPrice?:string,
    shippingPrice?:number, 
    amountTotal?:number,
    items?:CartItem[]
}
export const usePastReceipts = (user:UserState) => {
    const [previousInvoices, setPreviousInvoices] = useState<PastRecpt[] | undefined>([])
    
    useEffect(()=>{
        fetch('/receipt',{   
            method: 'POST',
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify(user),
        }).then(response => response.json())
            .then(data => { if(data !== undefined) setPreviousInvoices(data) })
            .catch(error => console.error('Error:', error));
    // eslint-disable-next-line
    },[])
    return {previousInvoices}
}
