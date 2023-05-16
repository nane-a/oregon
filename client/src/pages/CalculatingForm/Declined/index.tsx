import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { ReactComponent as Decline } from '../../../assets/images/declined.svg'
import './style.scss'

export const Declined: React.FC = (): JSX.Element => {
    const navigate = useNavigate()

    const handleClickBack = (): void => {
        navigate('/calculating-form/payment')
    }

    return (<div className='accept-container declined'>
        <p>Unfortunately, your card was declined.</p>
        <Decline />
        <div className='button-container'>
            <Button variant='secondary' onClick={() => handleClickBack()} type='button'>Back</Button>
            <Button variant='main' disabled>Finish</Button>
        </div>
    </div>)
}