import React from 'react'
import { useShipping } from '../components/shipping/hooks/useShipping'
import { InputShip } from '../components/shipping/InputShip'
import { ConfirmShip } from '../components/shipping/ConfirmShip'
import { Invoice } from '../components/shipping/Invoice'
interface CartItem {
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number
}
interface UserState {
    id?:number,
    username?:string
}
interface Props {
    cart:CartItem[],
    user:UserState
}
export const Shipment: React.FC<Props> = (props) => {
    const {cart,user} = props
    const {shipmentInfo,paymentInfo,step,handlePaymentChange,handleSubmitGoBack,purchase,
        handleShipmentChange,handleSubmitStepOne,setShipmentInfo,handleSubmitStepTwo,errors} = useShipping(cart,user)
    return (
        <div className="container">
            <br />
            <h1 className="title">Shipping Information</h1> <br/>
            <div>{step === 1 && 
            <InputShip handleSubmitStepOne={handleSubmitStepOne} 
                       handlePaymentChange={handlePaymentChange}
                       handleShipmentChange={handleShipmentChange}
                       setShipmentInfo={setShipmentInfo}
                       shipmentInfo={shipmentInfo}
                       paymentInfo={paymentInfo}
                       error={errors}
            />}</div>

            <div>{step === 2 && 
            <ConfirmShip handleSubmitStepTwo={handleSubmitStepTwo}
                         handleSubmitGoBack={handleSubmitGoBack}
                         shipmentInfo={shipmentInfo}
                         paymentInfo={paymentInfo}
                         cart={cart}
            />}</div>
            
            <div>{ step === 3 && <Invoice purchase={purchase}/> }</div>

        </div>
    )
}
