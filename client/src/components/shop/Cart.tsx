import React from 'react'
import { useCart } from '../shop/hooks/useCart'

interface UserState {
    id?:number,
    username?:string
}

interface CartItem {
    [index:string]: string | number | undefined,
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number
}

type Dispatch<A> = (value: A) => void
type SetStateAction<S> = S | ((prevState: S) => S);

interface Props {
    cart: CartItem[],
    setCart: Dispatch<SetStateAction<CartItem[]>>,
    user: UserState
}
export const Cart: React.FC<Props> = (props) => {
    const { cart, setCart, user} = props
    const { username } = user
    const {itemsPrice,taxPrice,shippingPrice,totalPrice,history,loginWarning,setLoginWarning} = useCart(cart)
    return (
        <div>
            <p className="panel-heading">My Cart</p>
            <div>{cart.length === 0 && <div>Cart Is Empty</div>}</div>
            {cart.map(item => {
                return(
                    <div key={item.id}>
                        <span className="item-name">{item.name}</span>
                        <div className="item-quantity">
                            <button onClick={()=>{
                                const exist = cart.find((x) => x.id === item.id);
                                if(exist){
                                    setCart(cart.map( x => x.id === item.id ?  { 
                                        ...exist, 
                                        quantity: exist.quantity + 1 
                                    } : x ))
                                } else {
                                    setCart([...cart, {
                                        ...item,
                                        quantity:1
                                    }])
                                }
                            }}>+</button>
                            <button onClick={()=>{
                                const exist = cart.find(x => x.id === item.id)
                                if( exist!.quantity === 1 ) {
                                    setCart( cart.filter( (x) => 
                                        x.id !== item.id
                                    ))
                                } else {
                                    setCart( cart.map(x => x.id === item.id ? { 
                                        ...exist, 
                                        quantity: exist!.quantity - 1 
                                    } : x ))
                                }
                            }}>-</button>
                            <span> [ {item.quantity}x ] </span>
                            <span> ${item.price}</span>
                        </div>
                    <br/>
                    </div> 
                )
            })}

            {cart.length !== 0 && (
                <>
                    <hr />
                    <div>
                        <div>
                            <div><span className="item-name">Items Price: </span></div>
                            <div><span className="item-quantity">${itemsPrice.toFixed(2)}</span></div>
                        </div><br />
                        <div>
                            <div><span className="item-name">Tax Price: </span></div>
                            <div><span className="item-quantity">${taxPrice.toFixed(2)}</span></div>
                        </div><br />
                        <div>
                            <div><span className="item-name">Shipping Price: </span></div>
                            <div><span className="item-quantity">${shippingPrice.toFixed(2)}</span></div>
                        </div><br />
                        <div>
                            <div><span className="item-name bold">Total Price: </span></div>
                            <div><span className="item-quantity bold">${totalPrice.toFixed(2)}</span></div>
                        </div><br/>
                        <button onClick={()=>{
                            if(username !== undefined) 
                                history.push('/shipping')
                            else 
                                setLoginWarning(true)
                        }}> Confirm Purchase </button><br/>
                    </div>


                </>
            )}
            <div>{loginWarning === true && <div>Please login first.</div>}</div>
        </div>
    )
}
