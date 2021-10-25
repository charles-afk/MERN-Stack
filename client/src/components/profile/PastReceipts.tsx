import React from 'react'
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
interface Props {
    previousInvoices: PastRecpt[] | undefined
}
export const PastReceipts: React.FC<Props> = (props) => {
    const {previousInvoices} = props
    if(previousInvoices === undefined)
        return( <h1>Loading...</h1> )
        
    return (
        <div className="container ">
            {previousInvoices.map( (posts, index) => {
                return(
                    <div key={index}>

                        <div>
                            <div><h6 className="title">The Baffled Brook</h6></div>
                            <div><p className="underline">Warehouse Address:</p> </div>
                            <div><p>The Baffled Brook Warehouse</p></div>
                            <div><p>{posts.storeAddress}</p></div>
                            <div><p>{posts.storeCity}, {posts.storeState}, {posts.storeZipcode}</p></div>
                        </div> <br/>

                        <div className="level">
                            <div className="block">
                                <div><p className="underline">Bill to:</p></div>
                                <div><p>Pay type: {posts.provider}</p></div>
                                <div><p>Card holder: {posts.name}</p></div>
                            </div>

                            <div className="block">
                                <div><p className="underline">Ship to:</p></div>
                                <div ><p>{posts.name}</p></div>
                                <div ><p>{posts.shippingAddress}</p></div>
                                <div ><p>{posts.shippingCity}, {posts.shippingState}, 
                                    {posts.shippingZipcode}</p>
                                </div>
                            </div>
                        </div>


                        {posts.items!.map((item, index2) => {
                            return(<div key={index2}> 
                                <p>{item.name} [ x{item.quantity} ] ${item.price}</p> 
                            </div>)
                        })} <hr />

                        <div><p>Items Price: ${posts.itemsPrice}</p></div>
                        <div><p>Tax Price: ${posts.taxPrice}</p></div>
                        <div><p>Shipping Price: ${posts.shippingPrice}</p></div>
                        <div><p>Total Price: ${posts.amountTotal}</p></div> <br />

                    </div>
                )
            })}
            <br/>
        </div>
    )
}
