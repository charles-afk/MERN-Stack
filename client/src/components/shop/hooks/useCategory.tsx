import {useState,useEffect} from 'react'
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
export const useCategory = (setCategory: React.Dispatch<React.SetStateAction<Categories>>, 
                            category: Categories,) => {

    const [checked,setChecked] = useState<boolean>(false)
    const handleClick = () : void => setChecked(!checked)
    
    useEffect(()=>{
        if(checked === true){
            setCategory({
                ...category,
                nonstock:'Yes'
            })
        }
        if(checked === false){
            setCategory({
                ...category,
                nonstock:'No'
            })
        }
    // eslint-disable-next-line
    },[checked])
    return{handleClick,checked}
}
