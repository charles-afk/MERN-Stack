import React from 'react'
import { Link } from 'react-router-dom';
interface UserState {
    id?:number,
    username?:string
}

interface UserProps {
    user: UserState,
    logoutUser: () => void
}

export const Nav: React.FC<UserProps> = (props) => {

    const { user, logoutUser } = props

    const { username } = user

    const [isActive, setisActive] = React.useState<boolean>(false)

    return (
        <nav className="navbar container" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">

                <a className="navbar-item" href="/#">
                    <div className="site-title">
                        <h1>The Baffled Brook</h1>
                        <p className="site-subtitle">Find your next adventure</p>
                    </div>
                </a>

                <a onClick={()=>{setisActive(!isActive)}} role="button" 
                className={`navbar-burger burger ${isActive ? 'is-active':''}`} 
                aria-label="menu" aria-expanded="false" 
                data-target="navbarBasicExample" href="/#" >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>

            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active':''}`}>
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/shop">Shop</Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link" href="/"> More </a>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/about">About</Link>
                            <hr className="navbar-divider" />
                            <Link className="navbar-item" to="/contact">Contact</Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="navbar-end">
                {username === undefined ?
                    <div className="navbar-item">
                        <div className="buttons">
                            <strong><Link className="button is-primary" to="/signup">Sign up</Link></strong>
                            <Link className="button is-light" to="/login">Log in</Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="navbar-item">
                            <div className="login-badge"> 
                                <p>Welcome {username}!</p>
                            </div>
                            <div className="buttons">
                                <strong><Link className="button is-primary" to="/profile">Profile</Link></strong>
                                <a className="button is-light" onClick={logoutUser} href="/">Sign Out</a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}
