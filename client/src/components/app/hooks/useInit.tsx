import { useState, useEffect } from 'react';
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

export const useInit = () => {
    const [user, setUser] = useState<UserState>({
        id:undefined,
        username:undefined
    })

    const logoutUser = (): void => {
        setUser({})
    }

    const login = (id?:number|null, name?:string|null): void => {
        if(id !== null && name !== null) {
            setUser({
                id:id,
                username:name
            })
        }
    }

    const [cart, setCart] = useState<CartItem[]>([])


    useEffect(()=>{
        setUser({
            id:undefined,
            username:undefined
        })
    },[])

    return {user,setUser,logoutUser,cart,setCart,login}
}