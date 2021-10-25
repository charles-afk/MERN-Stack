import React from 'react'
interface Comics {
    [index:string]: string | number | undefined,
    product_id?:string,
    name?:string,
    description?:string,
    format?:string,
    instock?:string,
    language?:string,
    picture?:string,
    price?:string | number,
    publisher?:string,
    rating?:string,
    series?:string
}

interface CartItem {
    [index:string]: string | number | undefined,
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number,
}

type Dispatch<A> = (value: A) => void
type SetStateAction<S> = S | ((prevState: S) => S);

interface Props {
    comics: Comics[],
    cart: CartItem[],
    setCart: Dispatch< SetStateAction<CartItem[]> >,
}

export const Product: React.FC<Props> = (props) => {
    const { comics, cart, setCart } = props
    
    if (comics === undefined) return <h2>Loading...</h2>

    return (    
        <div>
            {comics.map( (posts, index) => {
                return(
                    <div key={index}>
                        <div className="card">
                            <div className="columns">

                                <div className="column">
                                    <div className="card-image">
                                        <figure className="image is-4by3">                                           
                                            <img src={posts.picture} alt="Comic"/>
                                        </figure>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="media">
                                        <div className="media-content">
                                            <div><p className="title is-3">{posts.name}</p></div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div><p>{posts.description}</p></div>
                                        <div><p className="product-details">Rating: {posts.rating}</p></div>
                                        <div><p className="product-details">Condition: {posts.condition}</p></div>
                                        <div><p className="product-details">Series: {posts.series}</p> </div>
                                        <div><p className="product-details">Language: {posts.language}</p></div>
                                        <div><p className="product-details">Format: {posts.format}</p></div>
                                        <div><p className="product-details">Publisher: {posts.publisher}</p></div>
                                        <div><p className="product-details">In Stock: {posts.instock}</p></div>
                                        <br/><div><h5 className="product-price">${posts.price}</h5></div>
                                    </div>
                                    <button onClick={() => {
                                        const exist = cart.find(x => x.id === posts.product_id)
                                        if(exist){
                                            setCart( cart.map(x => x.id === posts.product_id ? { 
                                                ...exist, 
                                                quantity: exist.quantity + 1 
                                            } : x ))
                                        } else {
                                            setCart( cart => 
                                            [
                                                ...cart, 
                                                {
                                                    id:posts.product_id,
                                                    name:posts.name,
                                                    quantity:1,
                                                    price:posts.price
                                                }
                                            ])

                                        }
                                    }} className="button product-button">Add to Cart</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) } 
        </div>
    )
}
