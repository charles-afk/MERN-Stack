import React from 'react'

export const SignupSuccess: React.FC = () => {
    return (
        <div className="container">
            <div className="card sign-success">
                <div className="card-content">
                    <div className="content">
                        <p className="center">
                        Thank you for signing up! You can now complete a sale in the shop section of our site.<br/>
                        You also now have the option to view your profile page, which contains all of your information <br/>
                        from your previos purchases. You can either log in <a href="/login">here</a>, or navigate to a different section<br/>
                        from the navigation bar above!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
