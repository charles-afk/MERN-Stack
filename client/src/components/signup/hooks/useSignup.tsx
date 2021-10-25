import {useState, useEffect} from 'react'
interface Values {
    uname:string,
    email?:string,
    fname?:string,
    lname?:string,
    pwd?:string,
    pwdRpt?:string
}
interface Errors {
    uname?:string,
    email?:string,
    fname?:string,
    lname?:string,
    pwd?:string,
    pwdRpt?:string
    emailExists?:string
}
export const useSignup = () => {
    const [values, setValues] = useState<Values>({
        uname:'',
        email: '',
        fname: '',
        lname: '',
        pwd: '',
        pwdRpt: ''
    })
    const [errors, setErrors] = useState<Errors>({})
    const [emailExists, setEmailExists] = useState<boolean>(false)
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false)
    const [isSubmitting,setIsSubmitting] = useState<boolean>()
    const [user,setUser] = useState({})

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value}  = e.target 
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e : React.SyntheticEvent) : void => {
        e.preventDefault()
        setUser({
            "username": values.uname,
            "password": values.pwd,
            "first_name": values.fname,
            "last_name": values.lname,
            "email": values.email
        })

        if( Object.keys(user).length === 5 ) {

            fetch('/users/exists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', }, 
                body: JSON.stringify(user),
            }).then(response => response.json())
                .then(data => { 
                    console.log(data)
                    if(data.message === "Sorry, email exists.")
                        setEmailExists(true)
                    else 
                        setEmailExists(false)
                }).catch((error) => console.error('Error:', error) );
        }

        setErrors(validateInfo(values, emailExists));
        setIsSubmitting(true)
    }

    function validateInfo(values:Values, email:boolean): object{
        let errors:Errors | null = {}
        if(!values.fname) {
            errors.fname = "First name required"
        }
        if(!values.lname) {
            errors.lname = "Last name required"
        }
        if(!values.uname.trim()){
            errors.uname = "Username required"
        }
        if(!values.email) {
            errors.email = "Email required"
        }
        if (!values.pwd) {
            errors.pwd = 'Password is required';
        } 
        if (!values.pwdRpt) {
            errors.pwdRpt = 'Password is required';
        } else if (values.pwdRpt !== values.pwd) {
            errors.pwdRpt = 'Passwords do not match';
        }
        if(email === undefined) {
            return errors
        } else if(email === true) {
            errors.emailExists = 'Email Already Exists'
        }
        return errors
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting === true && Object.keys(user).length === 5){

            fetch('/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', }, 
                body: JSON.stringify(user),
            }).catch((error) => console.error('Error:', error) );

            setSignupSuccess(true)
        }
        setIsSubmitting(false)
    }, [isSubmitting,errors,user] )

    return {handleChange,values,handleSubmit,errors,signupSuccess}
}
