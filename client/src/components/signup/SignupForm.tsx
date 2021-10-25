import React from 'react'
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
interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SyntheticEvent) => void,
    values: Values,
    errors: Errors
}
export const SignupForm: React.FC<Props> = (props) => {
    const {handleChange,handleSubmit,values,errors} = props
    const {fname,lname,email,uname,pwd,pwdRpt} = values
    return (
        <div className="container">
                <div className="columns">

                    <div className="column">
                        <div className="card">
                            <div className="card-content">
                                <div className="content signup-content">
                                Thank you for deciding to shop with us! Enter all your information as prompted
                                in order to successfully sign up. Once signed up, you can then procceed to complete 
                                any orders that you currently have in your shopping cart, or view previously completed
                                orders on your profile page. Have a nice day!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="level section" >
                            <div className="level-item">

                                <form onSubmit={handleSubmit}>

                                    <div className="field">
                                        <label className="label">First Name</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="text" 
                                                name="fname" 
                                                value={fname}
                                                onChange={handleChange} 
                                                placeholder="First Name..."
                                            />
                                            {errors.fname && <p>{errors.fname}</p>}

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope fa-xs"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check fa-xs"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Last Name</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="text" 
                                                name="lname" 
                                                value={lname}
                                                onChange={handleChange}  
                                                placeholder="Last Name..."
                                            />
                                            {errors.lname && <p>{errors.lname}</p>}

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope fa-sm"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="email" 
                                                name="email" 
                                                value={email} 
                                                onChange={handleChange} 
                                                placeholder="Email..."
                                            />
                                            {errors.email && <p>{errors.email}</p>}

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">User Name</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="text" 
                                                name="uname" 
                                                value={uname} 
                                                onChange={handleChange} 
                                                placeholder="User Name.."
                                            />
                                            {errors.uname && <p>{errors.uname}</p>}

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope fa-xs"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check fa-xs"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="password" 
                                                name="pwd" 
                                                value={pwd} 
                                                onChange={handleChange} 
                                                placeholder="Password..."
                                                autoComplete="on"
                                            />
                                            {errors.pwd && <p>{errors.pwd}</p>}

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope fa-xs"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check fa-xs"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Confirm Password</label>
                                        <div className="control has-icons-left has-icons-right">

                                            <input className="input" 
                                                type="password" 
                                                name="pwdRpt" 
                                                value={pwdRpt} 
                                                onChange={handleChange} 
                                                placeholder="Confirm Password..."
                                                autoComplete="on"
                                            />
                                           {errors.pwdRpt && <p>{errors.pwdRpt}</p>} 

                                            <span className="icon is-left">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                            <span className="icon is-right">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <button type='submit'> Sign Up </button>
                                    {errors.emailExists && <p>{errors.emailExists}</p>}
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
