import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button'
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../../setup/stripe/getStripe';
// import { PaymentForm } from './form';
import { useState } from 'react';
import './style.scss'
import { PaymentForm } from './form';



export const Payment: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const handleClickNext = (): void => {
        navigate('/calculating-form/accept')
    }

    return (<div className=''>
        <Elements stripe={getStripe()}>
            <PaymentForm />
        </Elements>
    </div>)
}