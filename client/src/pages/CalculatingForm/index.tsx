import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Stepper } from '../../components/Stepper'
import { ReactComponent as Info } from '../../assets/images/info.svg'
import { ReactComponent as Truck } from '../../assets/images/truck.svg'
import { ReactComponent as Route } from '../../assets/images/route.svg'
import { ReactComponent as Accept } from '../../assets/images/accept.svg'
import { ReactComponent as Card } from '../../assets/images/card.svg'
import './style.scss'

export const CalculatingForm: React.FC = (): JSX.Element => {
    const location = useLocation()
    const [activeStep, setActiveStep] = useState(1)

    useEffect(() => {
        switch (location.pathname) {
            case '/calculating-form/truck':
                setActiveStep(2)
                break;

            case '/calculating-form/route':
                setActiveStep(3)
                break;

            case '/calculating-form/payment':
                setActiveStep(4)
                break;

            case '/calculating-form/accept':
                setActiveStep(5)
                break;
        }
    }, [location])

    const steps = [
        {
            content: 'Contact Info.',
            lable: '',
            icon: <Info />
        },
        {
            content: 'Truck/driver',
            lable: 'truck',
            icon: <Truck />
        },
        {
            content: 'Route',
            lable: 'route',
            icon: <Route />
        },
        {
            content: 'Payment',
            lable: 'payment',
            icon: <Card />
        },
        {
            content: 'Accept & submit',
            lable: 'accept',
            icon: <Accept />
        },
    ]

    return (<div className='calculating'>
        <div className='calculating__form-container'>
            <div className='calculating__form-container__header'>
                <h1>Calculate your Oregon permit form</h1>
                <p>(Temporary permits valid for 10 days)</p>
            </div>
            <div className='calculating__form-container__content'>
                <div className='stepper-container'>
                    {steps.map((e, i) => {
                        return (
                            <Stepper
                                variant={activeStep === i + 1 ? 'secondary-stepper' : 'main-stepper'}
                                disabled={activeStep <= i ? true : false}
                                key={i}
                            >{e.icon}<p>{e.content}</p></Stepper>
                        )
                    })}
                </div>
                <Outlet />
            </div>
        </div>
    </div>)
}