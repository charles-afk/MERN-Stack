import React from 'react'
import { usePastReceipts } from '../components/profile/hooks/usePastReceipts'
import { PastReceipts } from '../components/profile/PastReceipts'
interface UserState {
    id?:number,
    username?:string
}
interface Props {
    user:UserState
}
export const Profile: React.FC<Props> = (props) => {
    const {user} = props
    const {previousInvoices} = usePastReceipts(user)
    return (
        <div> <br />
            <div className="container">
                <h1>Hello {user.username}! Welcome to your profile page!</h1> <br />

                <h1>Past Invoices</h1><br />
            </div>
            <div>
                <PastReceipts previousInvoices={previousInvoices}/><br />
            </div> 
         </div>  
    )
}
