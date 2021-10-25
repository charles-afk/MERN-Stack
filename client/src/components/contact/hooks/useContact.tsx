import { useState } from "react"
import { useHistory } from 'react-router-dom';
export const useContact = () => {
    let history = useHistory();
    const [values,setValues] = useState({
        name:'',
        email:'',
        text:''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    const handleTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) : void => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    const handleSubmit = (e : React.SyntheticEvent) : void => {
        e.preventDefault()
        const input = {
            "name":values.name,
            "email":values.email,
            "text":values.text
        }
        
        fetch('/message/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify(input),
        }).then(response => response.json())
            //.then(data => console.log(data))
            .catch((error) => console.error('Error:', error));

        history.push('/')
    }

    return {values,handleChange,handleTextChange,handleSubmit,setValues}
}
