import React from 'react'
import { useSignup } from '../components/signup/hooks/useSignup'
import { SignupForm } from '../components/signup/SignupForm'
import { SignupSuccess } from '../components/signup/SignupSuccess'

export const Signup: React.FC = () => {
    const {handleChange, values, handleSubmit, errors, signupSuccess} = useSignup();
    switch(signupSuccess){
        case true:
            return (
                <div>
                    <SignupSuccess/>
                </div>
            )
        default:
            return(
                <div>
                    <SignupForm handleChange={handleChange} values={values}
                                handleSubmit={handleSubmit} errors={errors}/> 
                </div>
            )
    }
}
