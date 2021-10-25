import React from 'react'
interface Errors {
    email?:string,
    password?:string,
    pass?:string
}
interface InputValues {
    email:string,
    password:string
}
interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SyntheticEvent) => void,
    errors:Errors,
    userValues:InputValues
}
export const LoginForm: React.FC<Props> = (props) => {
    const {handleChange,handleSubmit,userValues,errors} = props
    const {email,password} = userValues
    return (
        <div className="container">
            <br />
            <div className="level section">
                <div className="level-item">

                <form onSubmit={handleSubmit}>
                    <div className="field">
                    <div className="control has-icons-left has-icons-right">

                        <input className="input" 
                            type="email" 
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}

                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                        </span>
                    </div>
                    </div>
                    <div className="field">
                    <div className="control has-icons-left">

                        <input className="input" 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        {errors.password && <p>{errors.password}</p>}

                        <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                        </span>
                    </div>
                        </div>
                            <div className="field">
                            <div className="control">
                                <button className="button is-success" type="submit" name="submit">
                                Login
                                </button>
                                {errors.pass && <p>{errors.pass}</p>}
                            </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}
