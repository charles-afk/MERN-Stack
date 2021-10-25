import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
interface UserState {
    id?:number,
    username?:string
}
interface InputValues {
    email:string,
    password:string
}
interface Errors {
    email?:string,
    password?:string,
    pass?:string,
    emailExist?:string
}

export const useLogin = (setUser: React.Dispatch<React.SetStateAction<UserState>>,  
                         login: (id?:number|null, name?:string|null) => void) => {
    const [userValues, setUserValues] = useState<InputValues>({
        email: '',
        password: ''
    })

    const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
    const [errors, setErrors] = useState<Errors>({})
    const [wrongPassword, setWrongPassword] = useState<boolean>(false)
    const [emailExists, setEmailExists] = useState<boolean>(false)
    let history = useHistory();

    useEffect(()=>{
        setWrongPassword(false)
        return()=>{ }
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value} = e.target
         setUserValues({
             ...userValues,
             [name]: value
        })
    }

    const handleSubmit = (e : React.SyntheticEvent) : void => {
        e.preventDefault()

        const loginUser = {
            email: userValues.email,
            password: userValues.password
        }

        fetch('/users/login', {    
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json', }, 
                 body: JSON.stringify(loginUser),
            }).then(response => response.json())
            .then(data => {  
                if(data.message === "Sorry, wrong password.") {
                    setWrongPassword(true)
                    setLoginSuccess(false)
                } else if(data.message === "Sorry, that email address is not registered with us."){
                    setEmailExists(true)
                    setLoginSuccess(false)
                }   
                else {
                    setWrongPassword(false)
                    setLoginSuccess(true)
                    setUser({
                        id:data.user_id,
                        username:data.username
                    })
                    console.log()
                    login(data.user_id, data.username)
                    history.push('/')
                }setLoginSuccess(false)

            }).catch((error) => console.error('Error:', error) );
        
        setErrors(validateInfo(userValues, wrongPassword, emailExists))
        
    }

    function validateInfo(values:InputValues, pass:boolean, emailExist:boolean) {
        let errors:Errors = {}

        if (!values.email) {
            errors.email = "Email required"
        }

        if (!values.password) {
            errors.password = "Password required"
        }

        if (pass === true) {
            errors.pass = "Wrong Password"
        }

        if (emailExist === true) {
            errors.emailExist = "That email isn't registered"
        }

        return errors
    } 
    
    return {userValues,loginSuccess,errors,handleChange,handleSubmit,history}
}