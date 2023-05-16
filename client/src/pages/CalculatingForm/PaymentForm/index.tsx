import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button'
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../../setup/stripe/getStripe';
import { PaymentForm } from './form';
import './style.scss'

export const Payment: React.FC = (): JSX.Element => {
    return (<div className=''>
        <Elements stripe={getStripe()}>
            <PaymentForm />
        </Elements>
    </div>)
}