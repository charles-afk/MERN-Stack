import { useState, useEffect } from 'react'
interface Categories {
    [index:string]: string | undefined,
    rating?:string,
    series?:string,
    condition?:string,
    language?:string,
    format?:string,
    publisher?:string,
    nonstock?:string
}
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

export const useShop = () => {
    const [comics,setComics] = useState<Comics[]>([{}])

    useEffect(() => {
        fetch('/products')
            .then(response => response.json())
            .then(data => setComics(data))
            .catch(error => console.error('Error:', error));
    }, [])
    const [category,setCategory] = useState<Categories>({
        rating:undefined,
        series:undefined,
        condition:undefined,
        language:undefined,
        format:undefined,
        publisher:undefined,
        nonstock:undefined
    })
    
    return {comics,setComics,category,setCategory}
}
