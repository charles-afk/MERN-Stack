import React from 'react'
import { useShop } from '../components/shop/hooks/useShop'
import { Sidebar } from '../components/shop/Sidebar'
import { Product } from '../components/shop/Product'
import { Cart } from '../components/shop/Cart'
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

interface Props {
    user: UserState,
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
}
export const Shop: React.FC<Props> = (props) => {
    const {cart,setCart,user} = props
    const {comics,setComics,setCategory,category} = useShop()
    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <Sidebar setCategory={setCategory} category={category} 
                         setComics={setComics} comics={comics} />        
            </div>

            <div className="column">
                <div className="container">
                    <Product comics={comics} cart={cart} setCart={setCart}/>
                </div><br/>
            </div>

            <div className="column is-one-quarter">
                <Cart cart={cart} setCart={setCart} user={user} /> 
            </div>
        </div>
    )
}
