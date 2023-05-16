import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { ReactComponent as Received } from '../../../assets/images/received.svg'
import './style.scss'

export const Accept: React.FC = (): JSX.Element => {
    const navigate = useNavigate()
    return (<div className='accept-container'>
        <p>Your payment has been successfully received.</p>
        <Received />
        <p>Please check your email.</p>
        <div className='button-container'>
            <Button variant='main' onClick={() => navigate('/')}>Finish</Button>
        </div>
    </div>)
}