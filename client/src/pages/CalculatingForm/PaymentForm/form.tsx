import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../../../api/axios"
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Button } from '../../../components/Button';
import { selectDistanceAddPrice } from '../../../redux/slices/distanceSlice';
import { ReactComponent as Card } from '../../../assets/images/card.svg'
import { ReactComponent as CVC } from '../../../assets/images/cvc.svg'
import { ReactComponent as Date } from '../../../assets/images/date.svg'
import { ReactComponent as Err } from '../../../assets/images/delete.svg'
import { ReactComponent as Accept } from '../../../assets/images/accept.svg'
import { fetchPaymentFormData } from "../../../redux/slices/formSlice";
import { AppDispatch } from "../../../redux/store";

const CARD_OPTIONS: any = {
    style: {
        padding: '16px',
        base: {
            letterSpacing: '0.42px',
            color: "black",
            fontSize: "16px",
            ":-webkit-autofill": { color: "black" },
            "::placeholder": { color: "black", fontWeight: 400, fontSize: '16px' }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "black"
        }
    }
}

export const PaymentForm: React.FC = (): JSX.Element => {
    const navigate = useNavigate()
    const stripe: any = useStripe()
    const elements: any = useElements()
    const dispatch = useDispatch<AppDispatch>()

    const price = useSelector(selectDistanceAddPrice)
    const [cardValidation, setCardValidation] = useState<any>()
    const [dateValidation, setDateValidation] = useState<any>()
    const [cvcValidation, setCvcValidation] = useState<any>()

    const handleClickBack = (): void => {
        navigate('/calculating-form/route')
    }

    useEffect(() => {
        if (price?.data === undefined) navigate('/calculating-form/route')
    }, [price])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if (!error) {
            dispatch(fetchPaymentFormData(price.data.price))
                .then((res: any) => res.payload.data.success && navigate('/calculating-form/accept'))
                .catch(e => navigate('/calculating-form/declined'))
        } else {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='payment-form'>
            <div className='price'>${price?.data.price}</div>
            <fieldset className={`FormGroup ${cardValidation?.error && 'error'}`}>
                <Card />
                <div className="FormRow">
                    <CardNumberElement options={{ ...CARD_OPTIONS, placeholder: 'Card Number' }} onChange={(e) => setCardValidation(e)} />
                </div>
                {cardValidation?.error && <Err />}
                {cardValidation?.complete && <Accept />}

            </fieldset>
            <div className='group'>
                <fieldset className={`FormGroup ${dateValidation?.error && 'error'}`}>
                    <Date />
                    <div className="FormRow">
                        <CardExpiryElement options={{ ...CARD_OPTIONS, placeholder: 'MM/YY' }} onChange={(e) => setDateValidation(e)} />
                    </div>
                    {dateValidation?.error && <Err />}
                    {dateValidation?.complete && <Accept />}

                </fieldset>
                <fieldset className={`FormGroup ${cvcValidation?.error && 'error'}`}>
                    <CVC />
                    <div className="FormRow">
                        <CardCvcElement options={{ ...CARD_OPTIONS, placeholder: 'CVC' }} onChange={(e) => setCvcValidation(e)} />
                    </div>
                    {cvcValidation?.error && <Err />}
                    {cvcValidation?.complete && <Accept />}
                </fieldset>
            </div>
            <div className='button-container'>
                <Button variant='secondary' onClick={() => handleClickBack()} type='button'>Back</Button>
                <Button variant='main' type='submit' disabled={!(cvcValidation?.complete && dateValidation?.complete && cardValidation?.complete)}>Pay</Button>
            </div>
        </form>
    )
}