import React from 'react'
import { useLogin } from '../components/login/hooks/useLogin'
import { LoginForm } from '../components/login/LoginForm'
interface UserState {
    id?:number,
    username?:string
}
interface Props { 
    setUser: React.Dispatch<React.SetStateAction<UserState>>,
    login: (id?:number|null,name?:string|null) => void 
}

export const Login: React.FC<Props> = (props) => {
    const {setUser, login} = props
    const {userValues,loginSuccess,errors,handleChange,handleSubmit} = useLogin(setUser, login)
    switch(loginSuccess) {
        case true:
            return(<></>)
        default:
            return(
                <div>
                    <LoginForm handleChange={handleChange} userValues={userValues}
                               handleSubmit={handleSubmit} errors={errors}/>
                </div>
            )
    }
}
