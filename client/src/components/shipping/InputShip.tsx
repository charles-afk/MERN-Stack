import React from 'react'
interface ShipInfo {
    street?: string,
    city?: string,
    state?: string,
    zipcode?: string
}
interface PayInfo {
    card: string,
    expire: string,
    secure: string,
    name: string
}
interface Errors {
    street?: string,
    city?: string,
    state?: string,
    zipcode?: string,
    card?: string,
    expire?: string,
    secure?: string,
    name?: string
}
interface Props{
    handleShipmentChange: (e : React.ChangeEvent<HTMLInputElement>) => void,
    handlePaymentChange: (e : React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmitStepOne: (e : React.SyntheticEvent) => void,
    shipmentInfo: ShipInfo,
    paymentInfo: PayInfo,
    setShipmentInfo: React.Dispatch<React.SetStateAction<ShipInfo>>
    error:Errors
}
export const InputShip: React.FC<Props> = (props) => {
    const {handleSubmitStepOne, handlePaymentChange, handleShipmentChange, 
        setShipmentInfo, shipmentInfo, paymentInfo, error } = props
    const {street,city,zipcode} = shipmentInfo
    const {card,expire,secure,name} = paymentInfo
    return (
        <div className="container">
            <h1 className="title">Input Shipment Information</h1>
            <div className="container">
            <form onSubmit={handleSubmitStepOne}>
                <div className="columns">
                    <div className="column">

                        <label>Enter Street Address: </label><br/>
                        <input 
                            type="text" 
                            name="street" 
                            value={street}
                            onChange={handleShipmentChange} 
                            placeholder="Address.."
                        /> <br />
                        {error.street && <p>{error.street}</p>}

                        <label>Enter City: </label><br/>
                        <input 
                            type="text"
                            name="city" 
                            value={city}
                            onChange={handleShipmentChange}  
                            placeholder="City.." 
                        /> <br />
                         {error.city && <p>{error.city}</p>}

                        <label>Enter Zipcode: </label><br/>
                        <input 
                            type="text" 
                            name="zipcode" 
                            value={zipcode} 
                            onChange={handleShipmentChange} 
                            placeholder="Zipcode.."
                        /> <br />
                        {error.zipcode && <p>{error.zipcode}</p>}
                        
                        {error.state && <p> <br/> {error.state}</p>}
                        <label>State: </label>
                        <select onChange={(e)=>{
                            const selectedState=e.target.value
                            setShipmentInfo({
                                ...shipmentInfo,
                                state:selectedState
                            })
                        }}>
                            <option value={undefined}>{undefined}</option>
                            <option value="AL">AL</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>

                    </div>
                    <div className="column">

                        <label>Card Info:</label><br />
                        <input 
                            type="text" 
                            name="card" 
                            value={card} 
                            onChange={handlePaymentChange} 
                            placeholder="Card Number.."
                        /> <br />
                        {error.card && <p>{error.card}</p>}

                        <label>Security Info:</label><br />
                        <input
                            type="text" 
                            name="secure" 
                            value={secure} 
                            onChange={handlePaymentChange} 
                            placeholder="Security Number.."
                        /><br />
                        {error.secure && <p>{error.secure}</p>}

                        <label>Expiration Date:</label><br />
                        <input
                            type="text" 
                            name="expire" 
                            value={expire} 
                            onChange={handlePaymentChange} 
                            placeholder="Expiration Date.."
                        /><br />
                        {error.expire && <p>{error.expire}</p>}

                        <label>Name on Card:</label><br />
                        <input
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={handlePaymentChange} 
                            placeholder="Name on Card.."
                        /><br />
                        {error.name && <p>{error.name}</p>}
                            
                    </div>  
                </div>
                <button type="submit"> Proceed </button>
            </form>
            </div>
        </div>
    )
}
