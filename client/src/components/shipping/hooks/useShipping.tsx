import { useState, useEffect } from 'react'
interface CartItem {
    id?:string,
    name?:string,
    quantity:number,
    price?:string | number | any
}
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
interface UserState {
    id?:number,
    username?:string
}
interface Receipts {
    [index:string]: string | number | CartItem[] | undefined,
    storeAddress:string, 
    storeState:string, 
    storeCity:string,
    storeZipcode:string,
    provider:string, 
    name:string,
    shippingAddress?:string, 
    shippingCity?:string, 
    shippingState?:string,
    shippingZipcode?:string,
    card:string,
    expire:string,
    secure:string,
    items:CartItem[],
    itemsPrice:number,
    taxPrice:string,
    shippingPrice:number, 
    amountTotal:number,
    user_id?:number
}
export const useShipping = (cart: CartItem[], user: UserState) => {

    let warehouseAddress: string = "456 Horizon Ave"
    let warehouseState: string = "CA"
    let warehouseCity: string = "Builderville"

    const [shipmentInfo, setShipmentInfo] = useState<ShipInfo>({
        street: '',
        city: '',
        state: '',
        zipcode: ''
    })

    const [paymentInfo, setPaymentInfo] = useState<PayInfo>({
        card: '',
        expire: '',
        secure: '',
        name:''
    })

    const [errors, setErrors] = useState<Errors>({})
    const [isSubmitting,setIsSubmitting] = useState<boolean>()
    const [purchase, setPurchase] = useState<Receipts[] | undefined>() 
    const [step, setStep] = useState<number>(1)

    const handleShipmentChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value} = e.target
        setShipmentInfo({
            ...shipmentInfo,
            [name]: value
        })
    }

    const handlePaymentChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value} = e.target
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        })
    }

    function validateInfo(shipValues:ShipInfo, payInfo:PayInfo): object{
        let errors:Errors | null = {}

        if(!shipValues.street)
            errors.street = "Street Address Required"
        if(!shipValues.city)
            errors.city = "City Required"
        if(!shipValues.state)
            errors.state = "State Required"
        if(!shipValues.zipcode)
            errors.zipcode = "Zipcode Required"
        if(!payInfo.card)
            errors.card = "Card Number Required"
        if(!payInfo.expire)
            errors.expire = "Expiration Date Required"
        if(!payInfo.name)
            errors.name = "Cardholder's Name Required"
        if(!payInfo.secure)
            errors.secure = "Security Number required"   
        
        return errors
    }

    const handleSubmitStepOne = (e : React.SyntheticEvent) : void => {
        e.preventDefault()

        setErrors(validateInfo(shipmentInfo,paymentInfo))
        setIsSubmitting(true)
    }

    const handleSubmitGoBack = () : void => {
        setStep(1)
    }

    const handleSubmitStepTwo = () : void => {
        const itemsPrice = cart.reduce( (total, currentValue) => 
        total + currentValue.price * currentValue.quantity, 0)
        const taxPrice = itemsPrice * 0.09
        const taxPriceFixed = taxPrice.toFixed(2)
        const shippingPrice = 15
        const totalPrice = itemsPrice + taxPrice + shippingPrice

        setPurchase([{
            storeAddress:warehouseAddress, 
            storeState:warehouseState, 
            storeCity:warehouseCity,
            storeZipcode:"123455",
            provider:"credit", 
            name:paymentInfo.name,
            shippingAddress:shipmentInfo.street, 
            shippingCity:shipmentInfo.city, 
            shippingState:shipmentInfo.state,
            shippingZipcode:shipmentInfo.zipcode,
            card:paymentInfo.card,
            expire:paymentInfo.expire,
            secure:paymentInfo.secure,
            items:cart,
            itemsPrice:itemsPrice,
            taxPrice:taxPriceFixed,
            shippingPrice:shippingPrice, 
            amountTotal:totalPrice,
            user_id:user.id
        }])
        setStep(3)
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting === true){
            setStep(2)
        }
        setIsSubmitting(false)
    },[isSubmitting,errors])

    return {shipmentInfo,paymentInfo,step,handlePaymentChange,handleSubmitGoBack,purchase,
            handleShipmentChange,handleSubmitStepOne,setShipmentInfo,handleSubmitStepTwo,errors}
}